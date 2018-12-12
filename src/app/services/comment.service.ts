import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Comment, User } from '../models';

@Injectable({ providedIn: 'root' })
export class CommentService {
    constructor(private http: HttpClient) { }

    getAll(user: User) {
      return this.http.get<any>(`https://discussions-api.herokuapp.com/v1/comments/`,
      {
        headers: { Authorization: `JWT ${user.token}` }
      });
    }

    get(id: string, user: User) {
      return this.http.get<any>(`https://discussions-api.herokuapp.com/v1/comments/${id}`,
      {
        headers: { Authorization: `JWT ${user.token}` }
      });
    }

    create(id: string, comment: Comment, user: User) {
      return this.http.post<any>(`https://discussions-api.herokuapp.com/v1/comments/${id}`, {
        content: comment.content,
        author: {
          id: comment.author.id
        }
      }, {
        headers: {
          Authorization: `JWT ${user.token}`
        }
      });
    }

    update(comment: Comment, user: User) {
      return this.http.put<any>(`https://discussions-api.herokuapp.com/v1/comments/${comment.id}`, {
        content: comment.content,
        author: {
          id: comment.author.id
        }
      }, {
        headers: {
          Authorization: `JWT ${user.token}`
        }
      });
    }

    delete(id: string, user: User) {
      return this.http.delete<any>(`https://discussions-api.herokuapp.com/v1/comments/${id}/${user.id}`,
      {
        headers: { Authorization: `JWT ${user.token}` }
      });
    }
}
