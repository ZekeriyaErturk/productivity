import { NotService } from './services/not.service';
import { TodoService } from './services/todo.service';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TimerComponent } from './components/timer/timer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { NotesComponent } from './components/notes/notes.component';
import { PrimengModule } from './primeng/primeng.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TimerComponent,
    LoginComponent,
    RegisterComponent,
    CalendarComponent,
    TodoListComponent,
    NotesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PrimengModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
  ],
  providers: [
    ConfirmationService,
    MessageService,
    AuthService,
    TodoService,
    NotService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
