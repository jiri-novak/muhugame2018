import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { AppConfig } from '../../app.config';
import { MessageType, User } from '../_models';
import { MessageService } from './message.service';

@Injectable()
export class AuthenticationService {
    constructor(
        private http: Http, 
        private config: AppConfig,
        private messageService: MessageService
    ) { }

    login(username: string, password: string) : Observable<User> {
        return this.http.post(this.config.apiUrl + '/users/authenticate', { username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.messageService.sendMessage(MessageType.LoggedIn, user);
                }

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.messageService.sendMessage(MessageType.LoggedOut);
    }
}