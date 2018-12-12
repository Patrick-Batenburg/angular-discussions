import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login.component';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
        declarations: [
          LoginComponent,
        ],
        imports: [
          ReactiveFormsModule,
          RouterModule.forRoot([]),
          HttpClientModule
        ],
        schemas: [NO_ERRORS_SCHEMA]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
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

    expect(component.form.valid).toBeFalsy();
  });
});
