import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  announcement: string;

  constructor(public db: AngularFirestore) {
    this.getAnnouce();
    console.log(this.announcement);
  }
  async getAnnouce() {
    await this.db.collection('announcements').doc('announcement').get()
      .forEach(doc => {
        this.announcement = doc.data().content;
      });
    console.log(this.announcement);
    return;
  }
}
