import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../../app.config';
import { User } from '../_models/index';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class UserService {
    constructor(private http: Http, private config: AppConfig, private authService: AuthenticationService) { }

    getAll() {
        return this.http
            .get(this.config.apiUrl + '/users', this.jwt())
            .pipe(
                map((response: Response) => response.json())
            );
    }

    getById(id: number) {
        return this.http
            .get(this.config.apiUrl + '/users/' + id, this.jwt())
            .pipe(
                map((response: Response) => response.json())
            );
    }

    create(user: User) {
        return this.http.post(this.config.apiUrl + '/users', user, this.jwt());
    }

    update(user: User) {
        return this.http.put(this.config.apiUrl + '/users/' + user.id, user, this.jwt());
    }

    delete(id: number) {
        return this.http.delete(this.config.apiUrl + '/users/' + id, this.jwt());
    }

    private jwt() {
        // create authorization header with jwt token
        let token = this.authService.getToken();
        if (token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + token });
            return new RequestOptions({ headers: headers });
        }
    }
}