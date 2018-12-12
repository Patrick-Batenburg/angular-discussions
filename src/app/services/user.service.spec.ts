import { User } from './../models/user';
import { UserService } from '.';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, getTestBed, async, inject } from '@angular/core/testing';
import { first } from 'rxjs/operators';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// Straight Jasmine testing without Angular's testing support
describe('UserService', () => {
  let injector: TestBed;
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ]
    });
    injector = getTestBed();
    service = injector.get(UserService);
  });

  it(`should issue a request`, async(inject([HttpClient], (http: HttpClient) => {
    const user: User = {
      id: '',
      username: 'UserService',
      name: {
        first: 'Patrick',
        middle: 'van',
        last: 'Batenbrug',
        full: 'Patrick van Batenbrug'
      },
      password: '123456',
      email: 'mail@gmail.com',
      token: '',
      dateCreated: new Date()
    };


    service.register(user)
      .pipe(first())
      .subscribe(
        response => {
          console.log(response);

          if (response.success) {
          }
        },
        error => {
          console.log(error);

          if (error === 'User already exists') {

          }
        });
  })));
});
