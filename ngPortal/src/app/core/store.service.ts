import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app/';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { AuthService } from '../core/auth.service';
import { listenToElementOutputs } from '@angular/core/src/view/element';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

    user: any;
    edit: boolean = false;
    total: number = 0;
    items = [];
    cart = [];
    count: number;
    payType: '';

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

    /********************************
     * ADD TO CART
     * Puts a snack into the cart area, adds up the total,
     * and reduces the snack count in shopping area.
     */
    addToCart(item) {
        this.cart.push(item);
        this.sumTotal();
        this.lowerItemCount(item);
        console.log(this.cart.length);
    }

    /********************************
     * SUM TOTAL
     * Adds up cost for shopping cart contents and displays
     * it, as well as the number of snacks in cart.
     */
    sumTotal() {
        this.total = 0;
        this.cart.forEach(item => {
            this.total += item.price;
        });
        this.count = this.cart.length;
    }
    
    /********************************
     * LOWER ITEM COUNT
     * Decreases snack count in shopping area
     */
    lowerItemCount(item) {
        item.count--;
    }

    /********************************
     * RAISE ITEM  COUNT
     * Increases snack count in shopping area
     */
    raiseItemCount(item) {
        item.count++;
    }

    /********************************
     * REMOVE ITEM
     * Removes snack from shopping cart and updates 
     * total cost and count.
     */
    removeItem(item) {
        console.log(this.cart.indexOf(item));
        this.cart.splice(this.cart.indexOf(item), 1);
        this.raiseItemCount(item);
        this.sumTotal();
    }

    /********************************
     * CLEAR CART
     * Empties cart's contents and restores shopping area's
     * original snack counts. 
     */
    clearCart() {
        while(this.cart.length > 0) {
            this.removeItem(this.cart[0]);
        }
    }

    /********************************
     * CHECKOUT
     * Calls the appropriate functions to update the store,
     * send a receipt to the database, and clear cart variable.
     */
    checkout() {
        this.updateSnackCount();
        this.createReceipt();
        console.log(this.count);
        setTimeout(() => {
            this.clearCart();
        }, 200);
        console.log(this.count);
    }

    /********************************
     * 
     */
    createReceipt() {
        let receipts = this.db.collection('store').doc('transactions').collection('receipts');
        let list = [];

        this.cart.forEach(item => {
            list.push({
                [item.name]: 1
            })
        });
        let newReceipt = receipts.add({
            items: list,
            payTotal: this.total,
            payType: this.payType,
            user: this.auth.dName
        }).then(ref => {
            console.log('Added document to Receipts with ID: ', ref.id);
            console.log(newReceipt);
        }).catch(error => {
            console.log(error);
        });
    }

    /********************************
     * 
     */
    updateSnackCount() {

    }
}
