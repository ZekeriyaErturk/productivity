import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  login: boolean;

  constructor(public auth: AngularFireAuth) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('login', JSON.stringify(this.userData));
        this.login = true;
      } else {
        localStorage.setItem('login', null);
        this.login = false;
      }
    });
  }

  Register(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  Login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  Logout() {
    return this.auth.signOut();
  }

  AuthState() {
    return of(this.login);
  }

  GetUser() {
    return this.auth.authState;
  }
}
