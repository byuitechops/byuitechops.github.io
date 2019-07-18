import { Component, OnInit } from '@angular/core';
import { AuthService } from './../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  try = 0;
  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.checkAuth();
  }

  checkAuth() {
    if (this.auth.auth) {
      this.try = 0;
      this.router.navigateByUrl('/home');
    } else if (this.try < 3) {
      this.try++;
      setTimeout(() => {
        console.log('Retry in 200ms');
        this.checkAuth();
      }, 200);
    } else if (this.try >= 3) {
      this.try = 0;
    }
  }
}
