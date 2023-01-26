import {ASCIIColors} from "./ASCIIColors";

export class Log {
    constructor() {
    }

    public static info(message: string): void {
        console.log(ASCIIColors.FgGreen + "[INFO] " + ASCIIColors.RESET + message);
    }

    public static error(message: string): void {
        console.error(ASCIIColors.FgRed + "[ERROR] " + ASCIIColors.RESET + message);
    }

    public static warn(message: string): void {
        console.warn(ASCIIColors.FgYellow + "[WARN] " + ASCIIColors.RESET + message);
    }
}