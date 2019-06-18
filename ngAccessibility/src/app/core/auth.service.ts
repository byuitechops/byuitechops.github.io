import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseAuth } from '@angular/fire';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userName: any = 'Guest';
  user: any;
  authenticated = false;

  constructor(private af: AngularFireAuth,
              private db: AngularFirestore,
              private router: Router) {

    this.af.auth.onAuthStateChanged(user => {
      if (user) {
        this.userName = user.displayName;
        this.user = user;
        this.authenticated = true;
        db.collection('users', ref => {
          // querry statement
          return ref.where('name', '==', this.userName);
        });
      }
    });
  }

  signup(email: string, password: string) {
    if (email.includes('@byui.edu')) {
      this.af.auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
    } else {
      alert('Please use your BYU - Idaho email or contact an Administrator');
    }
  }

  login(email: string, password: string) {
    this.af.auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  guestMode() {
    this.af.auth.signInAnonymously().then(() => {
      console.log('Ghost Mode');
    })
    .catch(() => {
      console.log('Not ghost');
    });
  }

  logout() {
    this.af.auth
      .signOut();
  }
}
