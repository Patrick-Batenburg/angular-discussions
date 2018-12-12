import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommentFormComponent } from '../comment-form';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationService, AlertService } from 'src/app/services';
import { JwtInterceptor, ErrorInterceptor } from 'src/app/helpers';
import { ThreadUpdateComponent } from '../thread-update';
import { AuthGuard } from 'src/app/guards';
import { ThreadCreateComponent } from '../thread-create';
import { ThreadDetailComponent } from '../thread-detail';
import { HomeComponent } from '.';
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

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

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
      providers: [
        AuthenticationService,
        AlertService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor,  multi: true }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).not.toBeNull();
    expect(component).toBeTruthy();
  });
});
