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

export class SSOTicketMessageEvent extends MessageEvent {
    handle(): void {
        const sso = this._clientMessage.PopFixedStringE("ASCII");
        if (sso.length > 16) {
            Emulator.databaseManager.orm.find(Users, {
                auth_ticket: sso
            }).then((user) => {
                const msg = new UserRightsMessageComposer(this._socket);
                Log.info("Login with SSO: " + sso);
                msg.compose();
                const msg2 = new AuthenticationOKMessageComposer(this._socket);
                msg2.compose();
                const msg3 = new MOTDNotificationComposer(this._socket, ["Welcome to Habbo!", "This is a test message!", " - frnota"]);
                msg3.compose();
            });
        }
    }
}