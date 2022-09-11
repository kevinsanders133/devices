import React, { useRef } from 'react';
import interact from 'interactjs';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import ISmartTemperatureSensor from '../Models/ISmartTemperatureSensor';
import ISmartOutlet from '../Models/ISmartOutlet';
import ISmartBulb from '../Models/ISmartBulb';
import ITurnOnOff from '../Models/ITurnOnOff';
import { setDialogIsShown, setDialogDevice, setDialogPosition } from '../store/slices/dialogSlice';

const Dialog: React.FC = () => {
    const dispatch = useAppDispatch();
    const device = useAppSelector(state => state.dialog.device);
    const positionState = useAppSelector(state => state.dialog.position);
    const position = { x: positionState.x, y: positionState.y };
    const dialog = useRef<HTMLDivElement>(null);

    interact('.dialog')
    .draggable({
        listeners: {
            move (event) {
                position.x += event.dx;
                position.y += event.dy;
                
                checkAllowedPosition();

                event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
            }
        }
    })
    .on('up', function () {
        dispatch(setDialogPosition({x: position.x, y: position.y}));
    })
    .resizable({
        edges: { top: true, left: true, bottom: true, right: true },
        listeners: {
            move: function (event) {
                position.x = (parseFloat(String(position.x)) || 0) + event.deltaRect.left;
                position.y = (parseFloat(String(position.y)) || 0) + event.deltaRect.top;

                checkAllowedPosition();

                Object.assign(event.target.style, {
                    width: `${event.rect.width}px`,
                    height: `${event.rect.height}px`,
                    transform: `translate(${position.x}px, ${position.y}px)`
                });

                Object.assign(event.target.dataset, { x: position.x, y: position.y });
            }
        }
    })

    const checkAllowedPosition = () => {
        const scrollWidth = window.innerWidth - document.body.clientWidth;
        if (position.x < 0) {
            position.x = 0;
        }
        if (position.y < 0) {
            position.y = 0;
        }
        if (
            dialog?.current &&
            window.innerWidth - (position.x + dialog.current.offsetWidth) < 40 + scrollWidth
        ) {
            position.x += window.innerWidth - (position.x + dialog.current.offsetWidth) - 40 - scrollWidth;
        }
        if (dialog?.current &&  window.innerHeight - (position.y + dialog.current.offsetHeight) < 40) {
            position.y += window.innerHeight - (position.y + dialog.current.offsetHeight) - 40;
        }
    }

    const closeDialog = () => {
        dispatch(setDialogPosition({x: position.x, y: position.y}));
        dispatch(setDialogDevice(null));
        dispatch(setDialogIsShown(false));
    }

    return (
        <div
            className="dialog"
            data-testid="dialog"
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`
            }}
            ref={dialog}
        >
            <div className="dialog__info">
                <h2 className="dialog__title">
                    { device?.name }
                </h2>
                <div className="dialog__type">
                    Type: { device?.type }
                </div>
                <div className="dialog__id">
                    Id: { device?.id }
                </div>
                <h3 className="dialog__params-title">Parameters</h3>
                <div className="dialog__connectionState">
                    Connection state: { device?.connectionState }
                </div>
                {
                    (device?.type === 'bulb' || device?.type === 'outlet')
                    &&
                    <div className="dialog__isTurnedOn">
                        Is turned on: { (device as unknown as ITurnOnOff).isTurnedOn }
                    </div>
                }
                {
                    device?.type === 'bulb'
                    &&
                    <>
                        <div className="dialog__brightness">
                            Brightness: { (device as ISmartBulb).brightness }
                        </div>
                        <div className="dialog__color">
                            Color: { (device as ISmartBulb).color }
                        </div>
                    </>
                }
                {
                    device?.type === 'outlet'
                    &&
                    <div className="dialog__powerConsumption">
                        Power Consumption: { (device as ISmartOutlet).powerConsumption }
                    </div>
                }
                {
                    device?.type === 'temperatureSensor'
                    &&
                    <div className="dialog__temperature">
                        Temperature: { (device as ISmartTemperatureSensor).temperature }
                    </div>
                }
            </div>
            <div className="dialog__close" data-testid="close-button" onClick={closeDialog}></div>
        </div>
    );
}

export default Dialog;