import ISmartDevice from "./ISmartDevice";

export default interface SmartTemperatureSensor extends ISmartDevice {
    temperature: number;
}