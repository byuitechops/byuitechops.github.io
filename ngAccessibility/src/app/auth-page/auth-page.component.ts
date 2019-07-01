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
    showSignUp() {
        const title       = document.getElementById("login-header");
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
        const title       = document.getElementById("login-header");
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
        
    }
    signUpUser() {

    }

}
