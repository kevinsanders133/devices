import ITurnOnOff from "./ITurnOnOff";
import SmartDevice from "./ISmartDevice";

export default interface SmartOutlet extends SmartDevice, ITurnOnOff {
    isTurnedOn: boolean,
    powerConsumption: number
}