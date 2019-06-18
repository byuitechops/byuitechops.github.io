import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  annouce;
  constructor(public db: AngularFirestore) {
    this.annouce = db.doc('announcements/announcement').get();
  }

  async newTranscript(data) {
    const dup = await this.dupCheck();
    this.db.collection('accessibility').doc().set(data);
  }
  dupCheck() {

  }
}
