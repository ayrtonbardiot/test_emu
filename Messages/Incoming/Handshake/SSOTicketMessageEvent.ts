import {MessageEvent} from "../MessageEvent";
import {Socket} from "net";
import {ClientMessage} from "../ClientMessage";
import {ServerMessage} from "../../Outgoing/ServerMessage";
import {Emulator} from "../../../Emulator";
import {Users} from "../../../Database/Models/Users";
import {UserRightsMessageComposer} from "../../Outgoing/Handshake/UserRightsMessageComposer";
import {Log} from "../../../Utils/Log";
import {AuthenticationOKMessageComposer} from "../../Outgoing/Handshake/AuthenticationOKMessageComposer";
import {MOTDNotificationComposer} from "../../Outgoing/MOTDNotificationComposer";
import {GameClient} from "../../../GameClient";
import {Habbo} from "../../../Habbo";

export class SSOTicketMessageEvent extends MessageEvent {
    handle(): void {
        const sso = this._clientMessage.PopFixedStringE("ASCII");
        if (sso.length > 16) {
            Emulator.databaseManager.orm.findOne(Users, {
                auth_ticket: sso
            }).then((data) => {
                if(data) {
                    const msg = new UserRightsMessageComposer(this._socket);
                    Log.info("Login with SSO: " + sso);
                    msg.compose();
                    const habbo = new Habbo(data);
                    if(habbo) {
                        Emulator.gameClientManager.setHabbo(this._gameClient, habbo)
                        const msg2 = new AuthenticationOKMessageComposer(this._socket);
                        msg2.compose();
                        Log.info("User: " + data.username + " has logged in with IP: " + this._socket.remoteAddress);
                        const msg3 = new MOTDNotificationComposer(this._socket, ["Welcome to GameClient!", "This is a test message!", " - frnota"]);
                        msg3.compose();
                    }
                }
            }).catch((err) => {
                Log.error(err);
            });
        }
    }
}