import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css'],
})
export class AuthPageComponent implements OnInit {

  email: string;
  password: string;

  constructor(public afAuth: AuthService) {
    console.log(afAuth.user);
  }

  ngOnInit() {
  }

}