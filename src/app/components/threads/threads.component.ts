import { Component, OnInit } from '@angular/core';
import { ThreadService, AuthenticationService, AlertService } from 'src/app/services';
import { User, Thread } from 'src/app/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.css']
})
export class ThreadsComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  threads: Array<Thread>;

  constructor(
    private threadService: ThreadService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.currentUser = new User();

    if (this.authenticationService.currentUserValue) {
      this.currentUser = this.authenticationService.currentUserValue;
    }

    this.threadService.getAll(this.currentUser)
      .subscribe(
        response => {
          if (response.success) {
            this.threads = response.data;
          }
        },
        error => {
          this.alertService.error(error);
        });
  }

  delete(threadId: string) {
    this.threadService.delete(threadId, this.currentUser)
      .subscribe(
        response => {
          if (response.success) {
            this.threads = this.threads.filter(obj => obj.id !== threadId);
          }
        },
        error => {
          this.alertService.error(error);
        });
  }
}
