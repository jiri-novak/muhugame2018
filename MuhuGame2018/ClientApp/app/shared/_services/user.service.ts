import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, ResponseContentType } from '@angular/http';

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

    export(): Observable<Response> {
        return this.http.post('/users/export', null, this.jwt(ResponseContentType.Blob));
    }

    private jwt(contentType?: ResponseContentType): RequestOptions {
        // create authorization header with jwt token
        let headers: Headers;
        let token = this.authService.getToken();
        if (token) {
            headers = new Headers({ 'Authorization': 'Bearer ' + token });
        }
        let options: RequestOptions = new RequestOptions({ headers: headers, responseType: contentType });
        return options;
    }
}