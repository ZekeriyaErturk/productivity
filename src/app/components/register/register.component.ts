import { User } from './../../models/User';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from './../../services/auth.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  passwordCheck: string;
  username: string;
  constructor(
    public auth: AuthService,
    public messageService: MessageService,
    public router: Router,
    public fireStore: AngularFirestore
  ) {}

  ngOnInit(): void {}

  Register() {
    this.auth
      .Register(this.email, this.password)
      .then((res) => {
        res.user.updateProfile({
          displayName: this.username,
        });
        this.router.navigateByUrl('/');
        this.SetUserData(res.user);
      })
      .catch((err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Password yada Email Hatalı',
        });
      });
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.fireStore.doc(
      'users/' + user.uid
    );
    const userData: User = {
      userKey: user.uid,
      email: user.email,
      displayName: this.username,
    };
    return userRef.set(userData, { merge: true });
  }
}
