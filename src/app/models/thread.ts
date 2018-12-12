import { User, Comment } from '.';

export class Thread {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    username: string;
  };
  date: {
    created: Date;
    modified: Date;
  };
  comments: Array<Comment>;

  constructor(user?: User) {
    this.date = {
      modified: new Date(),
      created: new Date()
    };

    this.author = {
      id: '',
      username: ''
    };

    if (user) {
      this.author = {
        id: user.id,
        username: user.username
      };
    }
  }
}
