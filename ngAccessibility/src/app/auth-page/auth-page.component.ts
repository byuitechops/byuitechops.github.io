import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css'],
})
export class AuthPageComponent implements OnInit {

    isOpen = false;
    email: string;
    password: string;

    constructor(public afAuth: AuthService) {
        console.log(afAuth.user);
    }

    ngOnInit() {
    }

    signIn() {
      this.openCloseModal();
      this.afAuth.login(this.email, this.password);
    }
    guest() {
      this.openCloseModal();
      this.afAuth.guestMode();
    }

    userStatus() {
      if (this.afAuth.authenticated){
        this.afAuth.logout();
        console.log('Goodbye');
      } else {
        this.openCloseModal();
      }
    }
    openCloseModal() {
        const modal = document.getElementById('signin-modal');
        const navbar = document.getElementById('main-nav');
        const content = document.getElementsByTagName('main');

        if (this.isOpen) {
          console.log("Opening");
          modal.classList.remove('hide');
          navbar.classList.add('blur');
          for (let i = 0; content[i]; i++) {
              content[i].classList.add('blur');
              console.log('added class blur from ' + content[i]);
          }
        } else if (!this.isOpen) {
          modal.classList.add('hide');
          navbar.classList.remove('blur');
          for (let i = 0; i < content.length; i++) {
              content[i].classList.remove('blur');
              console.log('removed class blur from ' + content[i]);
          }
        }
        this.isOpen = !this.isOpen;

    }

}
