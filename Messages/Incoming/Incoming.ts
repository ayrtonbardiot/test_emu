import {PopularRoomsSearchMessageEvent} from "./Navigator/PopularRoomsSearchMessageEvent";

export class Incoming {

    // Auth
    static InitCryptoMessageEvent: number = 206;
    static SSOTicketMessageEvent: number = 415;

    static InfoRetrieveMessageEvent: number = 7;
    static GetCreditsInfoMessageEvent: number = 8;

    // Navigator
    static GetOfficialRoomsMessageEvent: number = 380;
    static PopularRoomsSearchMessageEvent: number = 430;
    static MyRoomsSearchMessageEvent: number = 434;
    static CanCreateRoomMessageEvent: number = 387;

    // Room
    static CreateFlatMessageEvent: number = 29;
    static OpenFlatConnectionMessageEvent: number = 391;
}