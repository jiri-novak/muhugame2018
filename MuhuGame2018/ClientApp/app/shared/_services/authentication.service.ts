import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as jwt_decode from 'jwt-decode';

import { MessageType, UserInfo, UserLogin } from '../_models';
import { MessageService } from './message.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export const JWT_TOKEN: string = 'jwt_token';
export const CURRENT_USER: string = 'current_user';

@Injectable()
export class AuthenticationService {
    constructor(
        private http: Http,
        private router: Router,
        private messageService: MessageService
    ) { }

    public isTokenExpired(token?: string): boolean {
        //if (!token) token = this.getToken();
        if (!token) return true;

        const date = this.getTokenExpirationDate(token);
        if (date === undefined) return false;
        return !(date.valueOf() > new Date().valueOf());
    }

    public getUserInfo(): UserInfo {
        let item: string = localStorage.getItem(CURRENT_USER);
        if (!!item) {
            let userInfo: UserInfo = JSON.parse(item);
            return userInfo;
        }
        return null;
    }


    public getUserId(): number {
        let userInfo: UserInfo = this.getUserInfo();
        if (!!userInfo) {
            return userInfo.id;
        }
        return null;
    }

    public isAdmin(): boolean {
        let role = this.getRole();
        if (!role)
            return false;
        return role === "Admin";
    }

    public getToken(): string {
        let token: string = localStorage.getItem(JWT_TOKEN);
        if (!this.isTokenExpired(token)) {
            return token;
        }

        //this.logout();
        //this.router.navigate(['/login']);
        
        return null;
    }
    
    public login(email: string, password: string): Observable<UserInfo> {
        let userLogin: UserLogin = { email: email, password: password };
        return this.http.post('/users/authenticate', userLogin)
            .pipe(
                map((response: Response) => {
                    // login successful if there's a jwt token in the response
                    let user = response.json();

                    if (user && user.token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        this.setUser(user);
                        this.setToken(user.token);
                        this.messageService.sendMessage(MessageType.LoggedIn);
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
        if (!!token) {
            const decoded = jwt_decode(token);
            return decoded.role;
        }
        return null;
    }

    private setUser(user: UserInfo): void {
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