/*
@author: Aaron (Phoenix 3.11)
*/
export class Base64Encoding {
    public NEGATIVE: Uint8Array = new Uint8Array([64]);
    public POSITIVE: Uint8Array = new Uint8Array([65]);

    public static EncodeInt32(i: number, numBytes: number): Uint8Array {
        const bzRes: Uint8Array = new Uint8Array(numBytes);
        for (let j = 1; j <= numBytes; j++) {
            const k = (numBytes - j) * 6;
            bzRes[j - 1] = (64 + (i >> k & 63));
        }
        return bzRes;
    }

    public static DecodeInt32(bzData: Uint8Array): number {
        let i = 0;
        let j = 0;
        for (let k = bzData.length - 1; k >= 0; k--) {
            let x = (bzData[k] - 64);
            if (j > 0)
            {
                x *= Math.pow(64.0, j);
            }
            i += x;
            j++;
        }
        return i;
    }
}