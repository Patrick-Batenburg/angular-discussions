import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService, AuthenticationService } from '../../services';
import { CustomValidators } from 'ngx-custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  confirmPassword = new FormControl('', CustomValidators.equalTo(this.password));
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: this.formBuilder.group({
        first: ['', Validators.required],
        middle: [''],
        last: ['', Validators.required],
      }),
      email: ['', [Validators.required, CustomValidators.email]],
      username: ['', Validators.required],
      password: this.password,
      confirmPassword: this.confirmPassword
    });
  }

  // convenience getter for easy access to form fields
  get form() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        response => {
          if (response.success) {
            this.alertService.success('Registration successful', true);
            this.router.navigate(['/login']);
          }
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
          this.submitted = false;

          if (error === 'User already exists') {
            this.registerForm.controls['username'].setErrors({
              'notUnique': error
            });
          }
        });
  }
}
