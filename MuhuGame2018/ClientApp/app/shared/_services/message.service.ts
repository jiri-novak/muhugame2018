import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { Message, MessageType } from "../_models";

@Injectable()
export class MessageService {
    private subject = new Subject<Message>();
 
    sendMessage<T>(type: MessageType, message?: T) {
        this.subject.next({ type: type, message: message });
    }
 
    clearMessage() {
        this.subject.next();
    }
 
    getMessage(): Observable<Message> {
        return this.subject.asObservable();
    }
}