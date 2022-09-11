import { SmartDeviceType, SmartDeviceConnectionState } from "./types";

export default interface ISmartDevice {
    type: SmartDeviceType;
    id: string;
    name: string;
    connectionState: SmartDeviceConnectionState;
}