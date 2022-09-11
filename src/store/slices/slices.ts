import deviceListReducer from './deviceListSlice';
import dialogReducer from './dialogSlice';

export const slices = {
    dialog: dialogReducer,
    deviceList: deviceListReducer
}