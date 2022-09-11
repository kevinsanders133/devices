import ISmartBulb from "./ISmartBulb";
import ISmartOutlet from "./ISmartOutlet";
import ISmartTemperatureSensor from "./ISmartTemperatureSensor";

export type SmartDeviceType = 'bulb' | 'outlet' | 'temperatureSensor';
export type SmartDeviceConnectionState = 'connected' | 'disconnected' | 'poorConnection';
export type SmartDeviceDetails = ISmartBulb | ISmartOutlet | ISmartTemperatureSensor;