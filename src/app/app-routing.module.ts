import { NotesComponent } from './components/notes/notes.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { TimerComponent } from './components/timer/timer.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', component: TimerComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectToLogin },
  },
  {
    path: 'notes',
    component: NotesComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectToLogin },
  },
  {
    path: '**',
    component: TimerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
