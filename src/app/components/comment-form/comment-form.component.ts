import { AuthenticationService, AlertService, CommentService } from 'src/app/services';
import { Comment } from '../../models/comment';
import { Component, OnInit, Input } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  @Input() id: string;
  @Input() label: string;
  currentUser: User;
  submitted = false;
  commentForm: FormGroup;
  comment: Comment;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private commentService: CommentService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {}

  get form() {
    return this.commentForm.controls;
  }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.comment = new Comment(this.currentUser);
    this.commentForm = this.formBuilder.group({
      'content': ['', Validators.required]
    });

    if (this.label === 'Update' || this.label === 'Edit') {
      this.commentService.get(this.id, this.currentUser)
        .pipe(first())
        .subscribe(
          response => {
            if (response.success) {
              this.alertService.success('Comment acquired successful', true);
              this.comment = response.data;
              this.commentForm.patchValue(this.comment);
            }
          },
          error => {
            this.alertService.error(error);
            this.router.navigate(['/']);
          });
    }
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.commentForm.invalid) {
      return;
    }

    this.comment.content = this.commentForm.controls['content'].value;

    if (this.label === 'Reply' || this.label === 'Comment') {
      this.commentService.create(this.id, this.comment, this.currentUser)
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
    } else if (this.label === 'Update' || this.label === 'Edit') {
      this.commentService.update(this.comment, this.currentUser)
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
}
