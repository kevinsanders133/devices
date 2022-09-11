import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ISmartDevice from '../../Models/ISmartDevice';

interface IDialogPosition {
    x: number;
    y: number;
}

interface IDialogState {
    isShown: boolean;
    device: ISmartDevice | null;
    position: IDialogPosition;
}

const initialState: IDialogState = {
    isShown: false,
    device: null,
    position: { x: 0, y: 0 }
};

export const dialogSlice = createSlice({
    name: 'dialogSlice',
    initialState,
    reducers: {
        setDialogIsShown: (state, action: PayloadAction<boolean>) => {
            state.isShown = action.payload;
        },
        setDialogDevice: (state, action: PayloadAction<ISmartDevice | null>) => {
            state.device = action.payload;
        },
        setDialogPosition: (state, action: PayloadAction<IDialogPosition>) => {
            state.position = action.payload;
        }
    }
});

export const { setDialogIsShown, setDialogDevice, setDialogPosition } = dialogSlice.actions;

export default dialogSlice.reducer;