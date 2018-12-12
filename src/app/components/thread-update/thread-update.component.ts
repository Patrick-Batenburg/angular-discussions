import { AuthenticationService } from '../../services/authentication.service';
import { Thread } from '../../models/thread';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models';
import { ThreadService, AlertService } from '../../services';

@Component({
  selector: 'app-thread-update',
  templateUrl: './thread-update.component.html',
  styleUrls: ['./thread-update.component.css'],
})
export class ThreadUpdateComponent implements OnInit {
  currentUser: User;
  submitted = false;
  threadForm: FormGroup;
  thread: Thread;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
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

    this.activatedRoute.params.subscribe(param => {
      this.thread.id = param.id;
    });

    this.threadForm = this.formBuilder.group({
      'content': ['', Validators.required]
    });

    this.threadService.get(this.thread.id, this.currentUser)
      .pipe(first())
      .subscribe(
        response => {
          if (response.success) {
            this.alertService.success('Thread acquired successful', true);
            this.thread = response.data;
            this.threadForm.patchValue(this.thread);
          }
        },
        error => {
          this.alertService.error(error);
          this.router.navigate(['/']);
        });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.threadForm.invalid) {
      return;
    }

    this.thread.content = this.threadForm.controls['content'].value;

    this.threadService.update(this.thread, this.currentUser)
      .pipe(first())
      .subscribe(
        response => {
          if (response.success) {
            this.alertService.success('Thread updated successful', true);
            this.router.navigate(['/']);
          }
        },
        error => {
          this.alertService.error(error);
          this.submitted = false;
        });
  }
}
