import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {


  constructor(public afs: AngularFirestore) {
    this.getTranscript('01JxJ1BxZooxilIQwgP7');
  }

  getTranscript(id) {
    this.afs.collection('accessibility').doc(id).ref.get()
    .then(doc => {
      console.log(doc.data());
    });
  }

  createTranscript(data) {
    this.afs.collection('accessibility').doc().set({
      ...data
    })
    .then(doc => {
      console.log(doc);
    })
    .catch(err => {
      console.log('Huston, we have a problem: ' + err);
    });
  }

  updateTranscript(data, id) {
    this.afs.collection('accessibility').doc(id).update({
      ...data
    })
    .then(doc => {
      console.log(doc);
    })
    .catch(err => {
      console.log('Huston, we have a problem: ' + err);
    });
  }
}
