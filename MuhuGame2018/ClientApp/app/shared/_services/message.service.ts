import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Observable } from "rxjs/Observable";
import { Message, MessageType } from "../_models";

@Injectable()
export class MessageService {
    private subject = new Subject<Message>();
 
    sendMessage(type: MessageType, message?: any) {
        this.subject.next({ type: type, message: message });
    }
 
    clearMessage() {
        this.subject.next();
    }
 
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}