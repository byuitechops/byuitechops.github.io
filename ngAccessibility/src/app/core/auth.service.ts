import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatabaseService } from './database.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userName: any = 'Guest';
  user: any;
  authenticated = false;
  guest = false;
  transcribe = false;
  review = false;
  role: any;

  constructor(private af: AngularFireAuth, private db: DatabaseService, private router: Router) {
    //  This loads on every page in the Site, it check if the user is authenticated
    // and then finds that user in the database.
    this.af.auth.onAuthStateChanged(async user => {
      if (user) {
        this.authenticated = true;
        this.userName = user.displayName;
        this.user = user;
        if (!user.isAnonymous) {
          this.db.findUser(this.userName);
        }
        setTimeout(() => {
          this.isGuest();
        }, 200);
      } else {
        this.authenticated = false;
      }
    });
  }

  async isGuest() {
    if (this.user.isAnonymous) {
      this.guest = true;
      this.review = false;
      this.transcribe = false;
      if (this.router.url.includes('request') || this.router.url.includes('master')) {
        // do nothing
      } else {
        this.router.navigate(['request']);
      }
      return;
    }
    this.guest = false;
    this.role = await this.db.user.role;
    if (this.role === 'Copyedit') {
      this.review = true;
      this.transcribe = false;

    } else if (this.role === 'Quality Assurance') {
      this.review = false;
      this.transcribe = true;

    } else {
      this.review = false;
      this.transcribe = false;
    }
  }

  signup(email: string, password: string, name: string, position: string) {
    if (email.includes('@byui.edu')) {
      this.af.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        // This creates a new user in the Database Service
        this.db.createUser(name, email, position);
        return true;
      }).catch(err => {
        console.log('Something went wrong:', err.message);
        return false;
      });
    } else {
      alert('Please use your BYU - Idaho email or contact an Administrator');
    }
  }
  // A simple login function. currently not using a very Angular fashion, however
  // functional and fast.
  login(email: string, password: string) {
    let error = '';
    this.af.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Nice, it worked!');
        this.isGuest();
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);

      });
  }

  // Designers will request things in guest mode. This will be need for our icon that
  // dissplay next to the request to know that this was requested outside our team.
  guestMode() {
    this.af.auth.signInAnonymously().then(() => {
      console.log('Ghost Mode');
      this.isGuest();
    })
    .catch(() => {
      console.log('Not ghost');
    });
  }

  // Extremely simple auth login function. We also set authenticated to false so the
  // the login popup, pops up.
  logout() {
    this.af.auth.signOut().then(() => {this.authenticated = false; });
    this.isGuest();
  }
}
