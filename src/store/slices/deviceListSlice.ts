import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ISmartDevice from '../../Models/ISmartDevice';

interface IDeviceListState {
    value: ISmartDevice[];
}

const initialState: IDeviceListState = {
    value: []
};

export const deviceListSlice = createSlice({
    name: 'deviceListSlice',
    initialState,
    reducers: {
        setDeviceList: (state, action: PayloadAction<ISmartDevice[]>) => {
            state.value = action.payload;
        },
        setDeviceById: (state, action: PayloadAction<{id: string, device: ISmartDevice}>) => {
            const index = state.value.findIndex(e => e.id === action.payload.id);
            if (index !== -1) {
                state.value[index] = action.payload.device;
            }
        }
    }
});

export const { setDeviceList, setDeviceById } = deviceListSlice.actions;

export default deviceListSlice.reducer;