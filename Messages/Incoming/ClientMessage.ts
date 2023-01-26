import {Buffer} from "buffer";
import {Base64Encoding} from "../Base64";
import {WireEncoding} from "../WireEncoding";

export class ClientMessage {

    private _header: number;
    private readonly _body: Uint8Array;
    private _pointer: number = 0;

    constructor(header: number, body: Uint8Array) {
        this._header = header;
        this._body = body;
    }

    public PlainReadBytes(bytes: number): Uint8Array {
        if (bytes > this.remainingLength)  {
            bytes = this.remainingLength;
        }
        let buffer: Uint8Array = new Uint8Array(bytes);
        let index = 0;
        for (let i = this._pointer; index < bytes; i++)
        {
            buffer[index] = this._body[i];
            index++;
        }
        return buffer;
    }

    public PopBase64Boolean(): boolean {
        return ((this.remainingLength > 0) && (this._body[this._pointer++] == 0x41));
    }

    public PopFixedInt32(): number {
        let result = 0;
        result = Number(this.PopFixedString());
        return result;
    }

    public PopFixedString(): string {
        return this.PopFixedStringE("ASCII");
    }

    public PopFixedStringE(encoding: any): string {
        let str = "";
        switch (encoding) {
            case "ASCII":
                str = Buffer.from(this.ReadFixedValue()).toString('ascii');
                break;
            case "UTF-8":
                str = Buffer.from(this.ReadFixedValue()).toString('utf8');
                break;
        }
        return str.replace(String.fromCharCode(1), ' ');
    }

    public PopFixedUInt32(): number {
        return this.PopFixedInt32();
    }

    public PopInt32(): number {
        return Base64Encoding.DecodeInt32(this.ReadBytes(2));
    }

    public PopUInt32(): number {
        return this.PopInt32() >> 0;
    }

    public PopWiredBoolean(): boolean {
        return ((this.remainingLength > 0) && (this._body[this._pointer++] == 0x49));
    }

    public PopWiredInt32(): number {
        if (this.remainingLength < 1) {
            return 0;
        }
        const bzData: Uint8Array = this.PlainReadBytes(6);
        let totalBytes = 0;
        const num2 = WireEncoding.DecodeInt32(bzData);
        this._pointer += totalBytes;
        return num2;
    }

    public PopWiredUInt(): number {
        return this.PopWiredInt32() >> 0;
    }

    public ReadBytes(bytes: number): Uint8Array {
        if (bytes > this.remainingLength) {
            bytes = this.remainingLength;
        }
        let buffer: Uint8Array = new Uint8Array(bytes);
        for (let i = 0; i < bytes; i++) {
            buffer[i] = this._body[this._pointer++];
        }
        return buffer;
    }

    public ReadFixedValue(): Uint8Array {
        const bytes = Base64Encoding.DecodeInt32(this.ReadBytes(2));
        return this.ReadBytes(bytes);
    }

    public ResetPointer(): void {
        this._pointer = 0;
    }

    public get remainingLength(): number {
        return this._body.length - this._pointer;
    }

    public get header(): number {
        return this._header;
    }
}