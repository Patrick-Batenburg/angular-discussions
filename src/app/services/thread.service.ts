import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Thread, User } from '../models';

@Injectable({ providedIn: 'root' })
export class ThreadService {
    constructor(private http: HttpClient) { }

    getAll(user: User) {
      return this.http.get<any>(`https://discussions-api.herokuapp.com/v1/threads/`,
      {
        headers: { Authorization: `JWT ${user.token}` }
      });
    }

    get(id: string, user: User) {
      return this.http.get<any>(`https://discussions-api.herokuapp.com/v1/threads/${id}`,
      {
        headers: { Authorization: `JWT ${user.token}` }
      });
    }

    create(thread: Thread, user: User) {
      return this.http.post<any>(`https://discussions-api.herokuapp.com/v1/threads/`, {
        title: thread.title,
        content: thread.content,
        author: {
          id: thread.author.id
        }
      }, {
        headers: {
          Authorization: `JWT ${user.token}`
        }
      });
    }

    update(thread: Thread, user: User) {
      return this.http.put<any>(`https://discussions-api.herokuapp.com/v1/threads/${thread.id}`, {
        content: thread.content,
        author: {
          id: thread.author.id
        }
      }, {
        headers: {
          Authorization: `JWT ${user.token}`
        }
      });
    }

    delete(id: string, user: User) {
      return this.http.delete<any>(`https://discussions-api.herokuapp.com/v1/threads/${id}/${user.id}`,
      {
        headers: { Authorization: `JWT ${user.token}` }
      });
    }
}
