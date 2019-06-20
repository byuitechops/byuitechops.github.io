import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatabaseService } from './database.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userName: any = 'Guest';
  user: any;
  authenticated = false;

  constructor(private af: AngularFireAuth, private db: DatabaseService) {

    this.af.auth.onAuthStateChanged(async user => {
      if (user) {
        this.userName = user.displayName;
        this.authenticated = true;
        this.db.findUser(this.userName);
        this.user = await this.db.user;
        console.log(this.user);
      } else {
        this.authenticated = false;
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
      .signOut().then(() => {
        this.authenticated = false;
      });
  }
}
