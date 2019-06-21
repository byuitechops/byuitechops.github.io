import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  user: any;

  constructor(public afs: AngularFirestore, private router: Router) {}

  getTranscript(id) {
    const transcript = this.afs.collection('accessibility').doc(id).ref.get();
    return transcript;
  }

  createTranscript(data) {
    this.afs.collection('accessibility').doc(this.afs.createId()).set({
      ...data
    })
    .then(doc => {
      console.log(doc);
    })
    .catch(err => {
      console.log('Huston, we have a problem: ' + err);
    });
    return;
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
    return;
  }




  findUser(dName) {
    this.afs.collection('users', ref => {
      return ref.where('name', '==', dName);
    }).get()
    .forEach(users => {
      users.forEach(doc => {
        this.user = doc.data();
      });
    });
    console.log(this.user);
  }

  createUser(dName, contact, position) {
    this.afs.collection('users').doc(this.afs.createId()).set({
      actionID: '',
      currentAction: '',
      email: contact,
      lead: false,
      name: dName,
      role: position
    });
    return;
  }

  updateUser(data) {
    this.afs.collection('users').doc(this.user.id).update({
      ...data
    });
  }

  checkAction() {
    if (this.user.currentAction !== '') {

    } else {
      this.router.navigate(['/']);
    }
  }
}

