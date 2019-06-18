import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { auth } from 'firebase/app';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css'],
  providers: [AngularFireAuth, AngularFirestore]
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
