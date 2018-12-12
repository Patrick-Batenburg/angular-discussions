import { Component, OnInit, Input } from '@angular/core';
import { CommentService, AuthenticationService, AlertService } from 'src/app/services';
import { User } from 'src/app/models';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() comments;
  currentUser: User;

  constructor(
    private commentService: CommentService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  delete(commentId: string) {
    this.commentService.delete(commentId, this.currentUser)
      .subscribe(
        response => {
          if (response.success) {
            this.comments[0].content = '[Deleted]';
            this.comments[0].author.username = '[Deleted]';
          }
        },
        error => {
          this.alertService.error(error);
        });
  }
}
