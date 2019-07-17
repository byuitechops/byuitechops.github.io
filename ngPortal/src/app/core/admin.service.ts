import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  users = [];
  edit = 'none';
  makingChanges = false;
  constructor(private db: AngularFirestore) {
    const stuff = db.collection('users').get();
    stuff.forEach(raw => {
      raw.forEach(item => {
        try {
          const time = item.data().time.accumulatedTime;
          const nameDisplay = item.data().nameDisplay;
          const team = item.data().team;
          const title = item.data().title;
          const admin = item.data().admin;
          const storeManager = item.data().storeManager;
          const id = item.id;
          this.users.push({
            nameDisplay,
            team,
            title,
            admin,
            storeManager,
            time,
            id
          });
        } catch (error) {
          console.log(error.code);
        }
      });
    });
  }

  editing(id) {
    if (!this.makingChanges) {
      if (this.edit !== 'none') {
        return;
      } else {
        this.edit = id;
        this.makingChanges = true;
      }
    }
  }

  async update(id, time) {
    console.log(time);
    console.log(id);
    this.db.collection('users').doc(id).update({
            'time.accumulatedTime': time
        })
        .then(() => {
            console.log('Document Written with Success');
        })
        .catch((error) => {
            console.log(error);
        });
    this.edit = undefined;
    this.makingChanges = false;
  }
  async hide() {
    setTimeout(() => {
      this.edit = 'none';
      this.makingChanges = false;
    }, 100);
  }
}
