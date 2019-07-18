import { Component, OnInit } from '@angular/core';
import { AdminService } from '../core/admin.service';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  count = 0;
  constructor(public u: AdminService, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.checkAuth();
  }

  checkAuth() {
    if (this.auth.auth) {
      try {
        if (!this.auth.user.lead) {
          this.router.navigate(['/home']);
        }
      } catch (err) {
        setTimeout(() => {
          this.checkAuth();
        }, 200);
      }
    } else {
      setTimeout(() => {
        this.checkAuth();
      }, 200);
    }
  }
  counter() {
    if (this.count % 2 === 0) {
      this.count++;
      return true;
    } else {
      this.count++;
      return false;
    }
  }
}
