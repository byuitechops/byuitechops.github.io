import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  annouce;
  constructor(public db: AngularFirestore) {
    this.annouce = db.collection('announcements').doc('announcement').get();
  }
}
