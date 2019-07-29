import { Component, OnInit } from '@angular/core';
import { StoreService } from '../core/store.service';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

    constructor(public store: StoreService) { }

    ngOnInit() {

    }

    snackManageBtns() {
        if (this.auth.user.admin || this.auth.user.storeManager) {

        }
    }

}