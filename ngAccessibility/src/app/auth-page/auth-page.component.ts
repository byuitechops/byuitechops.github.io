import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css'],
})
export class AuthPageComponent implements OnInit {
  selectUndefinedOptionValue: any;
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  role: string;
  error: string;

  passBox = document.getElementById('signin-password');
  constructor(public afAuth: AuthService) {

  }

  ngOnInit() {
    setTimeout(async () => {
      if (!this.afAuth.authenticated) {
        this.openModal();
      }
    }, 1000);
  }

  hitEnter(event) {
    if (event.keyCode === 13) {
      this.signIn();
    }
  }
  async signIn() {
    const login = await this.afAuth.login(this.email, this.password);
    this.checkAuth().then(() => {
      this.closeModal();
    }).catch((err) => {
      console.log(err);
      this.error = err;
      setTimeout(() => {
        this.error = '';
      }, 2500);
    });
  }

  checkAuth() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.afAuth.authenticated) {
          resolve();
        } else {
          reject('Check if your password is correct.');
        }
      }, 500);
    });
  }

  resetPass() {
    if (this.email === undefined || this.email === '') {
      this.afAuth.reset(this.email);
    } else {
      this.error = 'Please put in your email to reset password';
      setTimeout(() => {
        this.error = '';
      }, 2000);
    }
  }

  guest() {
    this.closeModal();
    this.afAuth.guestMode();
  }

  userStatus() {
    if (this.afAuth.authenticated) {
      this.afAuth.logout();
      console.log('Goodbye');
      this.openModal();
    } else {
      this.openModal();
    }
  }
  openModal() {
    const modal = document.getElementById('signin-modal');
    const navbar = document.getElementById('main-nav');
    const content = document.getElementsByTagName('main');

    modal.classList.remove('hide');
    navbar.classList.add('blur');
    for (let i = 0; i < content.length; i++) {
      content[i].classList.add('blur');
    }

  }
  closeModal() {
    const modal = document.getElementById('signin-modal');
    const navbar = document.getElementById('main-nav');
    const content = document.getElementsByTagName('main');

    modal.classList.add('hide');
    navbar.classList.remove('blur');
    for (let i = 0; i < content.length; i++) {
      content[i].classList.remove('blur');
    }

  }
  showSignUp() {
    const title = document.getElementById("login-header");
    const showContent = document.getElementsByClassName("show-on-signup");
    const hideContent = document.getElementsByClassName("hide-on-signup");

    title.innerHTML = "Sign Up";
    for (let i = 0; i < showContent.length; i++) {
      showContent[i].classList.remove("hide");
    }
    for (let i = 0; i < hideContent.length; i++) {
      hideContent[i].classList.add("hide");
    }
  }
  hideSignUp() {
    const title = document.getElementById("login-header");
    const hideContent = document.getElementsByClassName("show-on-signup");
    const showContent = document.getElementsByClassName("hide-on-signup");

    title.innerHTML = "Log In";
    for (let i = 0; i < hideContent.length; i++) {
      hideContent[i].classList.add("hide");
    }
    for (let i = 0; i < showContent.length; i++) {
      showContent[i].classList.remove("hide");
    }
  }
  verifyInfo() {
    if ((this.name !== '' && this.name !== undefined) &&
      (this.role !== 'Role' && this.role !== undefined) &&
      (this.email !== '' && this.email !== undefined) &&
      (this.password !== '' && this.password !== undefined) &&
      (this.confirmPassword !== '' && this.confirmPassword !== undefined)) {
      if (this.email.includes('@byui.edu')) {
        if (this.password === this.confirmPassword) {
          console.log('No Errors!');
          this.error = '';
          return true;
        } else {
          this.error = 'Make sure that your passwords match';
        }
      } else {
        this.error = 'The email entered is not valid';
      }
    } else {
      this.error = 'All fields must be filled to Sign Up';
    }
    return false;
  }
  //
  signUpUser() {
    if (this.verifyInfo()) {
      this.afAuth.signup(this.email, this.password, this.name, this.role);
      this.closeModal();
      return true;
    } else {
    }
  }

}
