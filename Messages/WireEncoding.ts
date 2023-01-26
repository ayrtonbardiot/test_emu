/*
@author: Aaron (Phoenix 3.11)
 */
export class WireEncoding {
    // public const byte NEGATIVE = 72;
    // public const byte POSITIVE = 73;
    // public const int MAX_INTEGER_BYTE_AMOUNT = 6;

    public NEGATIVE: Uint8Array = new Uint8Array([72]);
    public POSITIVE: Uint8Array = new Uint8Array([73]);
    public MAX_INTEGER_BYTE_AMOUNT: number = 6;

    public static EncodeInt32(i: number): Array<number> {
        const wf: Array<number> = new Array<number>();
        wf.push(6);
        let pos: number = 0;
        let numBytes: number = 1;
        let startPos = pos;
        let num4: number = (i >= 0) ? 0 : 4;
        i = Math.abs(i);
        wf[pos++] = (64 + (i & 3));
        for (i >>= 2; i != 0; i >>= 6) {
            numBytes++;
            wf[pos++] = (64 + (i & 63));
        }
        wf[startPos] = (wf[startPos] | numBytes << 3 | num4);
        let bzData: Array<number> = new Array<number>();
        bzData.push(numBytes);
        for (let x = 0; x < numBytes; x++) {
            bzData[x] = wf[x];
        }
        return bzData;
    }

    public static DecodeInt32(bzData: Uint8Array): number {
        let flag: boolean = (bzData[0] & 4) == 4;
        let totalBytes: any = (bzData[0] >> 3 & 7);
        let v: number = (bzData[0] & 3);
        let pos: number = 1;
        let shiftAmount = 2;
        for (let i = 1; i < totalBytes; i++) {
            v |= (bzData[pos] & 63) << shiftAmount;
            shiftAmount = 8 * i;
            pos++;
        }
        if (flag) {
            v *= -1;
        }
        return v;
    }
}