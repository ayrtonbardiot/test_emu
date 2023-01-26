import {WireEncoding} from "../WireEncoding";
import {Buffer} from "buffer";
import {Base64Encoding} from "../Base64";

export class ServerMessage {

    private readonly _header: number;
    private _body: Array<number>;

    constructor(header: number) {
        this._header = header;
        this._body = new Array<number>();
    }

    public AppendBoolean(bool: boolean): void {
        if (bool) {
            this._body.push(0x49);
        } else {
            this._body.push(0x48);
        }
    }

    public AppendByte(b: number): void {
        this._body.push(b);
    }

    public AppendBytes(bytes: Array<number>): void {
        for (let i = 0; i < bytes.length; i++) {
            this._body.push(bytes[i]);
        }
    }

    public AppendInt32(i: number): void {
        this.AppendBytes(WireEncoding.EncodeInt32(i));
    }

    public AppendRawInt32(i: number): void {
        this.AppendString(i.toString());
    }

    public AppendRawUInt(i: number): void {
        this.AppendRawInt32(i);
    }

    public AppendString(s: string): void {
            const textencoder = new TextEncoder();
            this.AppendBytes(Array.from(textencoder.encode(s)));
            console.log(Array.from(textencoder.encode(s)))
    }

    public AppendStringWithBreak(s: string) {
        const breakchar: number = 2;
        this.AppendString(s);

        this.AppendByte(breakchar);
    }

    public AppendUInt(i: number) {
        this.AppendInt32(i);
    }

    public Clear() {
        this._body = [];
    }

    public GetBytes(): Array<number> {
        let buffer = new Array(this._body.length + 3);
        let buffer2 = Base64Encoding.EncodeInt32(this._header, 2);
        buffer[0] = buffer2[0];
        buffer[1] = buffer2[1];
        for (let i = 0; i < this._body.length; i++) {
            buffer[i + 2] = this._body[i];
        }
        buffer[buffer.length - 1] = 1;
        return buffer;
    }
}