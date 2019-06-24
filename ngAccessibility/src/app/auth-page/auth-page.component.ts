import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css'],
})
export class AuthPageComponent implements OnInit {

    signingUp: false;
    email: string;
    password: string;
    name: string;

    constructor(public afAuth: AuthService) {

    }

    ngOnInit() {
      setTimeout(async () => {
        if (!this.afAuth.authenticated) {
          this.openModal();
        }
      }, 800);
    }

    signIn() {
      this.closeModal();
      this.afAuth.login(this.email, this.password);
    }
    guest() {
      this.closeModal();
      this.afAuth.guestMode();
    }

    userStatus() {
      if (this.afAuth.authenticated) {
        this.afAuth.logout();
        console.log('Goodbye');
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
    signUp() {
        const name = document.getElementById('name-box');
        const loginBtn = document.getElementById('signin-btn');
        console.log(name);
        if (!this.signingUp) {
            name.classList.remove('hide');
            loginBtn.classList.add('hide');
        } else {

        }
    }

}
