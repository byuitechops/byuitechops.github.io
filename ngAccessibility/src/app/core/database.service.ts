import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  user: any;
  userID: string;

  constructor(public afs: AngularFirestore, private router: Router) {}


  // Services pertaining to collection users

  async findUser(dName) {
    await this.afs.collection('users', ref => ref.where('name', '==', dName).limit(1)).get().subscribe(data => {
      this.user = data.docs[0].data();
      this.userID = data.docs[0].id;
      if (this.user !== undefined) {
        console.log(this.user);
        this.checkAction();
      }
    });
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
    this.afs.collection('users').doc(this.userID).update({
      actionID: data.actionID,
      currentAction: data.currentAction
    });
    console.log('Working');
  }

  async checkAction() {
    if (this.user.currentAction === 'preparing' && this.router.url !== '/prepare') {
      this.router.navigate(['/prepare']);
      alert('You may only work on one transcript at a time');
    } else if (this.user.currentAction === 'transcribing' || this.user.currentAction === 'reviewing') {
      this.router.navigate(['/home']);
    }
  }

  // Services pertaining to accessibility collection

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

  addCourseCode(id, newCode) {
    let add = true;
    let codes = [];
    codes.push(newCode);
    this.afs.collection('accessibility').doc(id).get().subscribe(res => {
      (res.data().courseCode).forEach(course => {
        if (course === newCode) {
          add = false;
        } else {
          codes.push(course);
        }
      });
    });
    if (add) {
      this.afs.collection('accessibility').doc(id).update({
        courseCode: newCode
      });
    }
  }

  changeTranscriptStep(status, name) {
    this.afs.collection('accessibility').doc(this.user.actionID).update({
      status
    });
    if (status === 'In Prep') {
      this.afs.collection('accessibility').doc(this.user.actionID).update({
        preparer: name
      });
    } else if (status === 'In Transcription') {
      this.afs.collection('accessibility').doc(this.user.actionID).update({
        transcriber: name
      });
    } else if (status === 'In Review' || status === 'Review Completed') {
      this.afs.collection('accessibility').doc(this.user.actionID).update({
        reviewer: name
      });
    }
    console.log('Working');
  }
}

