import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app/';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  items = [];
  edit = false;
  total = 0.00;
  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
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

  addToCart(id, price, count) {
    if (count > 0) {
      this.total += Number(price);
      this.items.forEach(item => {
        if (item.id === id) {
          item.count = count - 1;
        }
      });
    }
  }
}
