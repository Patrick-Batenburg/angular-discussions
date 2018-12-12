import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from '../login';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { RegisterComponent } from '.';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from 'src/app/models';
import { RouterModule, Routes } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  const user: User = {
    id: '',
    username: 'LoginTest',
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

  beforeEach(async (() => {
    TestBed.configureTestingModule({
        declarations: [
          RegisterComponent,
          LoginComponent
        ],
        imports: [
          ReactiveFormsModule,
          RouterModule.forRoot(routes),
          HttpClientModule
        ],
        schemas: [NO_ERRORS_SCHEMA],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).not.toBeNull();
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    let errors = {};
    const username = component.form.username;
    const password = component.form.password;
    errors = username.errors && password.errors || {};
    expect(errors['required']).toBeTruthy();

    expect(component.registerForm.valid).toBeFalsy();
  });

  it('form invalid when empty', () => {
    let errors = {};
    const firstName = component.registerForm.get('name.first');
    const lastName =  component.registerForm.get('name.last');
    const username = component.form.username;
    const password = component.form.password;
    const email = component.form.email;
    errors = firstName.errors && lastName.errors && username.errors && password.errors && email.errors || {};
    expect(errors['required']).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('form invalid when passwords do not match', () => {
    const errors = { };
    const firstName = component.registerForm.get('name.first');
    const middleName =  component.registerForm.get('name.middle');
    const lastName =  component.registerForm.get('name.last');
    const username = component.form.username;
    const password = component.form.password;
    const confirmPassword = component.form.confirmPassword;
    const email = component.form.email;
    username.setValue(user.username);
    firstName.setValue(user.name.first);
    middleName.setValue(user.name.middle);
    lastName.setValue(user.name.last);
    password.setValue(user.password);
    confirmPassword.setValue(user.password + 'abc');
    email.setValue(user.email);
    errors['required'] = firstName.errors || lastName.errors || username.errors || password.errors || email.errors || {};
    errors['equalTo'] = confirmPassword.errors || {};

    expect(errors['equalTo']).toBeTruthy('Password does not match the confirmation password');
    expect(errors['required']).toEqual({});
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('form valid when redirected to login', () => {
    const firstName = component.registerForm.get('name.first');
    const middleName =  component.registerForm.get('name.middle');
    const lastName =  component.registerForm.get('name.last');
    const username = component.form.username;
    const password = component.form.password;
    const confirmPassword = component.form.confirmPassword;
    const email = component.form.email;
    username.setValue(user.username);
    firstName.setValue(user.name.first);
    middleName.setValue(user.name.middle);
    lastName.setValue(user.name.last);
    password.setValue(user.password);
    confirmPassword.setValue(user.password);
    email.setValue(user.email);

    component.onSubmit();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.registerForm.valid).toBeTruthy();
      expect(component.loading).toBe(true);
    });

  });
});
