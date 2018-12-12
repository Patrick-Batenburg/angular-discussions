import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommentFormComponent } from '../comment-form';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards';
import { ThreadDetailComponent } from '.';
import { HomeComponent } from '../home';
import { CommentsComponent } from '../comments';
import { HeaderComponent } from '../header';
import { NgxEditorModule } from 'ngx-editor';
import { TimeagoModule } from 'ngx-timeago';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: 'thread/:id', component: ThreadDetailComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

describe('ThreadDetailComponent', () => {
  let component: ThreadDetailComponent;
  let fixture: ComponentFixture<ThreadDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        HeaderComponent,
        ThreadDetailComponent,
        CommentsComponent,
        CommentFormComponent
      ],
      imports: [
        CommonModule,
        FormsModule,
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
    fixture = TestBed.createComponent(ThreadDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).not.toBeNull();
    expect(component).toBeTruthy();
  });
});
