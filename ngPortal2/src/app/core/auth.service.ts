import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ThemeService } from '../core/theme.service';


@Injectable({
  providedIn: 'root'
})


export class AuthService {

  auth = false;
  email = '';
  password = '';
  dName = '';
  user = '';
  id = '';
  signingIn = true;
  selectedTheme = '';
  navbarImage = '';


  constructor(
    private afs: AngularFireAuth,
    private db: AngularFirestore,
    public theme: ThemeService
  ) {
    this.afs.auth.onAuthStateChanged(user => {
      if(user) {
        this.auth = true;
        this.findUser();
      } else {
        console.log('Failed Login Attempt.');
        this.auth = false;
      }
    })
  }


  findUser() {

  }

}
