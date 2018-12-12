import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommentFormComponent } from '../comment-form';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ThreadUpdateComponent } from '../thread-update';
import { AuthGuard } from 'src/app/guards';
import { ThreadCreateComponent } from '.';
import { ThreadDetailComponent } from '../thread-detail';
import { HomeComponent } from '../home';
import { CommentsComponent } from '../comments';
import { HeaderComponent } from '../header';
import { NgxEditorModule } from 'ngx-editor';
import { TimeagoModule } from 'ngx-timeago';

const routes: Routes = [
  { path: 'thread/update/:id', component: ThreadUpdateComponent, canActivate: [AuthGuard] },
  { path: 'thread/create', component: ThreadCreateComponent, canActivate: [AuthGuard] },
  { path: 'thread/:id', component: ThreadDetailComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@Component({selector: 'app-threads', template: ''})
class ThreadsStubComponent {}

describe('ThreadCreateComponent', () => {
  let component: ThreadCreateComponent;
  let fixture: ComponentFixture<ThreadCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        HeaderComponent,
        ThreadsStubComponent,
        ThreadCreateComponent,
        ThreadUpdateComponent,
        ThreadDetailComponent,
        CommentsComponent,
        CommentFormComponent
      ],
      imports: [
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        NgxEditorModule,
        TimeagoModule.forRoot()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).not.toBeNull();
    expect(component).toBeTruthy();
  });
});
