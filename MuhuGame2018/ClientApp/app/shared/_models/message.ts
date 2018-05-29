import { MessageType } from "./message.type";

export interface Message {
    type: MessageType,
    message: any
}