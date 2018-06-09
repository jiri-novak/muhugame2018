import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../_models/index';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
    constructor(private http: Http, private authService: AuthenticationService) { }

    getAll(): Observable<User[]> {
        return this.http
            .get('/users', this.jwt())
            .pipe(
                map((response: Response) => response.json())
            );
    }

    getById(id: number): Observable<User> {
        return this.http
            .get('/users/' + id, this.jwt())
            .pipe(
                map((response: Response) => response.json())
            );
    }

    create(user: User): Observable<Response> {
        return this.http.post('/users', user, this.jwt());
    }

    update(user: User): Observable<Response> {
        return this.http.put('/users/' + user.id, user, this.jwt());
    }

    delete(id: number): Observable<Response> {
        return this.http.delete('/users/' + id, this.jwt());
    }

    private jwt(): RequestOptions {
        // create authorization header with jwt token
        let token = this.authService.getToken();
        if (token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + token });
            return new RequestOptions({ headers: headers });
        }
    }
}