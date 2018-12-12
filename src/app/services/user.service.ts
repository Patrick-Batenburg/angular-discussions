import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getById(id: number) {
        return this.http.get(`/users/` + id);
    }

    register(user: User) {
      return this.http.post<any>(`https://discussions-api.herokuapp.com/v1/users/`, user, {
        headers: {
          'Authorization': 'supersecretbulletproofkey'
      }});
    }

    // update(user: User) {
    //     return this.http.put(`/users/` + user.id, user);
    // }

    // delete(id: number) {
    //     return this.http.delete(`/users/` + id);
    // }
}
