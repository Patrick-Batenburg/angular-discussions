export class User {
  id: string;
  username: string;
  name: {
    first: string,
    middle: string,
    last: string,
    full: string
  };
  password: string;
  email: string;
  token: string;
  dateCreated: Date;

  constructor() {
    this.dateCreated = new Date();
    this.token = '';
  }
}
