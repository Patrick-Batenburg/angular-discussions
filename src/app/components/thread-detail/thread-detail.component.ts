import { ThreadService, AuthenticationService, AlertService, CommentService } from 'src/app/services';
import { Comment } from './../../models/comment';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, Thread } from 'src/app/models';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-thread-detail',
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.css']
})
export class ThreadDetailComponent implements OnInit {
  currentUser: User;
  submitted = false;
  commentForm: FormGroup;
  thread: Thread;
  comment: Comment;
  live = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private threadService: ThreadService,
    private commentService: CommentService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {}

  get form() {
    return this.commentForm.controls;
  }

  ngOnInit() {
    this.currentUser = new User();

    if (this.authenticationService.currentUserValue) {
      this.currentUser = this.authenticationService.currentUserValue;
    }

    this.thread = new Thread();
    this.comment = new Comment(this.currentUser);

    this.activatedRoute.params.subscribe(param => {
      this.thread.id = param.id;
    });

    this.commentForm = this.formBuilder.group({
      'content': ['', Validators.required]
    });

    this.threadService.get(this.thread.id, this.currentUser)
      .pipe(first())
      .subscribe(
        response => {
          if (response.success) {
            this.alertService.success('Thread acquired successful', true);
            this.thread = response.data;
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
    if (this.commentForm.invalid) {
      return;
    }

    this.comment.content = this.commentForm.controls['content'].value;

    this.commentService.create(this.thread.id, this.comment, this.currentUser)
      .pipe(first())
      .subscribe(
        response => {
          if (response.success) {
            this.alertService.success('Comment created successful', true);
            location.reload(true);
          }
        },
        error => {
          this.alertService.error(error);
          this.submitted = false;
        });
  }
}
