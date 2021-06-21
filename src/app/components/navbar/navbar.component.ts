import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  items: MenuItem[];
  user;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.GetUser().subscribe((user) => {
      this.user = user;
    });
  }

  Logout() {
    this.authService.Logout();
    this.router.navigateByUrl('/');
  }
}
