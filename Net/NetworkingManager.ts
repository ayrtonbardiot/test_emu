import * as net from "node:net";
import { Buffer } from "buffer";
import {Base64Encoding} from "../Messages/Base64";
import {ClientMessage} from "../Messages/Incoming/ClientMessage";
import {Log} from "../Utils/Log";
import {Emulator} from "../Emulator";
import {v4} from "uuid";
import {GameClient} from "../GameClient/GameClient";

class Socket extends net.Socket {
    id?: string;
}

export class NetworkingManager {

    private static _instance: NetworkingManager;
    private _server: net.Server;
    private _port: number;

    constructor(port: number) {
        this._port = port;
        this._server = net.createServer().listen({port: this._port});
        this._server.on("connection", (socket: Socket) => {
            socket.id = v4();
            const gameClient = new GameClient(socket, null);
            Emulator.gameClientManager.addUser(gameClient);
            socket.on("data", ((data: Buffer) => this.onMessage(socket, data)));
        });
        NetworkingManager._instance = this;
        Log.info("NetworkingManager - listening on port : " + this._port);
    }

    private onMessage(socket: net.Socket, data: Buffer): void {
        if (data.toString().startsWith("<policy-file-request/>")) {
            const policy = '<?xml version="1.0"?><cross-domain-policy><allow-access-from domain="*" to-ports="*" /></cross-domain-policy>' + String.fromCharCode(0);
            socket.write(policy);
        }

        if(data[0] === 64) {
            let pos = 0;

            while (pos < data.length) {
                const msgLength = Base64Encoding.DecodeInt32(new Uint8Array([data[pos++], data[pos++], data[pos++]]));
                const msgId = Base64Encoding.DecodeInt32(new Uint8Array([data[pos++], data[pos++]]));

                const content: Uint8Array = new Uint8Array(msgLength - 2);
                let i = 0;
                while (i < content.length && pos < data.length) {
                    content[i] = data[pos++];
                    i++;
                }

                Emulator.packetManager.handlePacket(socket, new ClientMessage(msgId, content));
            }
        }
    }
}