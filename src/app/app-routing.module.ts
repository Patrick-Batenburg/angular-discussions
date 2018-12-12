import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home';
import { LoginComponent } from './components/login';
import { RegisterComponent } from './components/register';
import { ThreadsComponent } from './components/threads';
import { ThreadCreateComponent } from './components/thread-create';
import { ThreadUpdateComponent } from './components/thread-update';
import { ThreadDetailComponent } from './components/thread-detail';

import { AuthGuard } from './guards';

const routes: Routes = [
  { path: 'thread/update/:id', component: ThreadUpdateComponent, canActivate: [AuthGuard] },
  { path: 'thread/create', component: ThreadCreateComponent, canActivate: [AuthGuard] },
  { path: 'thread/:id', component: ThreadDetailComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
  public static routes = routes;
}
