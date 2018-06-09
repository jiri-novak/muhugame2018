import { MessageType } from "./message.type";

export interface Message {
    type: MessageType,
    payload: any
}