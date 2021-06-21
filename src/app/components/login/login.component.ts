import { MessageService } from 'primeng/api';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(
    public auth: AuthService,
    public messageServis: MessageService,
    public router: Router
  ) {}

  ngOnInit(): void {}

  Login() {
    this.auth
      .Login(this.email, this.password)
      .then((res) => {
        this.router.navigateByUrl('/');
      })
      .catch((err) => {
        this.messageServis.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Password yada Email Hatalı',
        });
      });
  }
}
