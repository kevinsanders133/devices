import React, { memo } from 'react';
import ISmartDevice from '../Models/ISmartDevice';
import { useAppDispatch } from '../store/hooks';
import { setDialogIsShown, setDialogDevice } from '../store/slices/dialogSlice';

interface ItemProps {
    info: ISmartDevice;
}

const Item: React.FC<ItemProps> = memo(({ info }) => {
    const dispatch = useAppDispatch();

    const showDialog = () => {
        dispatch(setDialogDevice(info));
        dispatch(setDialogIsShown(true));
    }

    return (
        <li className="main__devices-item" onClick={showDialog}>
            <div className="main__devices-item-type">
                Type: { info.type }
            </div>
            <div className="main__devices-item-id">
                Id: { info.id }
            </div>
            <div className="main__devices-item-name">
                Name: { info.name }
            </div>
            <div className="main__devices-item-connectionState">
                Connection state: { info.connectionState }
            </div>
        </li>
    )
})

export default Item;