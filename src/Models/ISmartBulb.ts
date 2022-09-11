import ITurnOnOff from "./ITurnOnOff";
import ISmartDevice from "./ISmartDevice";

export default interface ISmartBulb extends ISmartDevice, ITurnOnOff {
    isTurnedOn: boolean;
    brightness: number;
    color: string;
}