import { Component, OnInit } from '@angular/core';
import { StoreService } from '../core/store.service';
import { AuthService } from '../core/auth.service';

@Component({
    selector: 'app-store',
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

    viewingInvoice = false;
    receipts:any;

    constructor(public store: StoreService, public auth: AuthService) { }

    ngOnInit() {

    }

    viewInvoice() {
        this.viewingInvoice = true;
        this.receipts = this.store.getReceipts();
    }

}