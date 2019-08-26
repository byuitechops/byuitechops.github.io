import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app/';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { AuthService } from '../core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

    user: any;
    edit: boolean = false;
    total: number = 0;
    items = [];
    cart = [];
    count = this.cart.length;

    constructor(
        private db: AngularFirestore, 
        private storage: AngularFireStorage, 
        public auth: AuthService,
    ) {
        const stuff = db.collection('store').doc('inventory').collection('items').get();
        stuff.forEach(raw => {
            raw.forEach(async item => {
                const data = await item.data();
                const id = await item.id;
                const ref = storage.ref(`images/${data.image}`);
                const url = ref.getDownloadURL();
                this.items.push({
                    ...data,
                    url,
                    id
                });
            });
        });
    }

    addToCart(item) {
        this.cart.push(item);
        this.sumTotal();
        this.lowerItemCount(item);
        console.log(this.cart.length);
    }

    sumTotal() {
        this.total = 0;
        this.cart.forEach(item => {
            this.total += item.price;
        });
    }
    
    lowerItemCount(item) {
        item.count--;
    }

    raiseItemCount(item) {
        item.count++;
    }

    removeItem(item) {
        console.log(this.cart.indexOf(item));
        this.cart.splice(this.cart.indexOf(item), 1);
        this.raiseItemCount(item);
        this.sumTotal();
    }

    clearCart() {
        while(this.cart.length > 0) {
            this.removeItem(this.cart[0]);
        }
    }

    checkout() {
        
    }
}
