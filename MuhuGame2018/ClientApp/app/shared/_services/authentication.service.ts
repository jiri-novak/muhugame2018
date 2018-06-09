import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as jwt_decode from 'jwt-decode';

import { AppConfig } from '../../app.config';
import { MessageType, User } from '../_models';
import { MessageService } from './message.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { decode } from 'punycode';

export const JWT_TOKEN: string = 'jwt_token';
export const CURRENT_USER: string = 'current_user';

@Injectable()
export class AuthenticationService {
    constructor(
        private http: Http,
        private config: AppConfig,
        private messageService: MessageService
    ) { }

    public isTokenExpired(token?: string): boolean {
        if (!token) token = this.getToken();
        if (!token) return true;

        const date = this.getTokenExpirationDate(token);
        if (date === undefined) return false;
        return !(date.valueOf() > new Date().valueOf());
    }

    public getUser(): User {
        let item: string = localStorage.getItem(CURRENT_USER);
        if (!!item)
            return JSON.parse(item);
        return null;
    }

    public getToken(): string {
        return localStorage.getItem(JWT_TOKEN);
    }

    public isAdmin(): boolean {
        return this.getRole() === "admin";
    }
    
    public login(email: string, password: string): Observable<User> {
        return this.http.post(this.config.apiUrl + '/users/authenticate', { email: email, password: password })
            .pipe(
                map((response: Response) => {
                    // login successful if there's a jwt token in the response
                    let user = response.json();

                    if (user && user.token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        this.setUser(user);
                        this.setToken(user.token);
                        this.messageService.sendMessage(MessageType.LoggedIn, user);
                    }

                    return user;
                }));
    }

    public logout() {
        // remove user from local storage to log user out
        console.log('logging out');
        localStorage.removeItem(CURRENT_USER);
        this.messageService.sendMessage(MessageType.LoggedOut);
    }

    private getRole() {
        let token = this.getToken();
        const decoded = jwt_decode(token);
        return decoded.role;
    }

    private setUser(user: User): void {
        localStorage.setItem(CURRENT_USER, JSON.stringify(user));
    }

    private setToken(token: string): void {
        localStorage.setItem(JWT_TOKEN, token);
    }

    private getTokenExpirationDate(token: string): Date {
        const decoded = jwt_decode(token);

        if (decoded.exp === undefined) return null;

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }
}