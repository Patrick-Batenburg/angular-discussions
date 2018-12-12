import { CommentService, UserService, ThreadService, AuthenticationService } from 'src/app/services';
import { CommentsComponent } from './components/comments';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgxEditorModule } from 'ngx-editor';

import { AppComponent } from './app.component';
import { AlertComponent } from './components/alert';
import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { HomeComponent } from './components/home';
import { LoginComponent } from './components/login';
import { RegisterComponent } from './components/register';
import { HeaderComponent } from './components/header';
import { ThreadsComponent } from './components/threads';
import { ThreadCreateComponent } from './components/thread-create';
import { ThreadUpdateComponent } from './components/thread-update';
import { ThreadDetailComponent } from './components/thread-detail';
import { TimeagoModule } from 'ngx-timeago';
import { CommentFormComponent } from './components/comment-form';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    ThreadsComponent,
    ThreadCreateComponent,
    ThreadUpdateComponent,
    ThreadDetailComponent,
    CommentsComponent,
    CommentFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxEditorModule,
    TimeagoModule.forRoot()
  ],
  providers: [
    UserService,
    AuthenticationService,
    ThreadService,
    CommentService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
