import React, { memo, useEffect } from 'react';
import ISmartDevice from '../Models/ISmartDevice';
import { SmartDeviceDetails } from '../Models/types';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setDeviceById, setDeviceList } from '../store/slices/deviceListSlice';
import { setDialogDevice } from '../store/slices/dialogSlice';
import Item from './Item';

const DEVICES_URL = `${process.env.REACT_APP_HTTP_HOST}${process.env.REACT_APP_DEVICES_API}`;
const WS_URL = `${process.env.REACT_APP_WS_HOST}${process.env.REACT_APP_WS_API}`;

const List: React.FC = memo(() => {
    const dispatch = useAppDispatch();
    const dialog = useAppSelector(state => state.dialog);
    const deviceList = useAppSelector(state => state.deviceList.value);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchUsers = async () => {
            const res = await fetch(DEVICES_URL, { signal });
            const data: ISmartDevice[] = await res.json();
            dispatch(setDeviceList(data));
        }
        fetchUsers();

        const socket = new WebSocket(WS_URL);
        socket.onopen = () => {
            console.log('WebSocket client connected');
        }
        socket.onmessage = (e) => {
            const device: SmartDeviceDetails = JSON.parse(e.data);
            dispatch(setDeviceById({id: device.id, device}));
        }
        return () => {
            controller.abort();
            socket.close();
        };
    }, []);

    useEffect(() => {
        if (dialog.isShown) {
            const indexOfChangesElement = deviceList.findIndex(e => e.id === dialog.device?.id);
            dispatch(setDialogDevice(deviceList[indexOfChangesElement]));
        }
    }, [deviceList]);

    return (
        <ul className="main__devices-list">
            { deviceList.map(device => <Item key={device.id} info={device} />) }
        </ul>
    );
})

export default List;