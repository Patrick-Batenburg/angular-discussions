import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ThreadUpdateComponent } from '.';
import { AuthGuard } from 'src/app/guards';
import { HomeComponent } from '../home';
import { HeaderComponent } from '../header';
import { NgxEditorModule } from 'ngx-editor';
import { TimeagoModule } from 'ngx-timeago';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: 'thread/update/:id', component: ThreadUpdateComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

describe('ThreadUpdateComponent', () => {
  let component: ThreadUpdateComponent;
  let fixture: ComponentFixture<ThreadUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        HeaderComponent,
        ThreadUpdateComponent
      ],
      imports: [
        CommonModule,
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
    fixture = TestBed.createComponent(ThreadUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).not.toBeNull();
    expect(component).toBeTruthy();
  });
});
