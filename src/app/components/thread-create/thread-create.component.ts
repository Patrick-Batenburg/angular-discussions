import { AuthenticationService } from './../../services/authentication.service';
import { Thread } from './../../models/thread';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models';
import { ThreadService, AlertService } from '../../services';

@Component({
  selector: 'app-thread-create',
  templateUrl: './thread-create.component.html',
  styleUrls: ['./thread-create.component.css'],
})
export class ThreadCreateComponent implements OnInit {
  currentUser: User;
  submitted = false;
  threadForm: FormGroup;
  thread: Thread;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private threadService: ThreadService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { }

  get form() {
    return this.threadForm.controls;
  }

  ngOnInit() {
    this.currentUser = new User();

    if (this.authenticationService.currentUserValue) {
      this.currentUser = this.authenticationService.currentUserValue;
    }

    this.thread = new Thread(this.currentUser);

    this.threadForm = this.formBuilder.group({
      'title': ['', Validators.required],
      'content': ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.threadForm.invalid) {
      return;
    }

    this.thread.title = this.threadForm.controls['title'].value;
    this.thread.content = this.threadForm.controls['content'].value;

    this.threadService.create(this.thread, this.currentUser)
      .pipe(first())
      .subscribe(
        response => {
          if (response.success) {
            this.alertService.success('Thread created successful', true);
            this.router.navigate(['/']);
          }
        },
        error => {
          this.alertService.error(error);
          this.submitted = false;
        });
  }
}
