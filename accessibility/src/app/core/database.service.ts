import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  user: any;
  userID: string;
  count = 0;

  constructor(public afs: AngularFirestore, private router: Router) {
  }


  // Services pertaining to collection users

  async findUser(dName) {
    try {
      this.afs.collection('users', ref => ref.where('name', '==', dName).limit(1)).get().subscribe(data => {
        this.user = data.docs[0].data();
        this.userID = data.docs[0].id;
        if (this.user !== undefined) {
          this.checkAction();
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  createUser(dName, contact, position) {
    this.afs.collection('users').doc(this.afs.createId()).set({
      actionID: '',
      currentAction: '',
      email: contact,
      lead: false,
      name: dName,
      role: position
    }).catch(err => {
      console.log(err.message);
    });
    return;
  }

  updateUser(data) {
    this.afs.collection('users').doc(this.userID).update({
      actionID: data.actionID,
      currentAction: data.currentAction
    }).then(() => {
      setTimeout(() => {
        this.findUser(this.user.name);
      }, 500);
    }).catch(err => {
      console.log(err.message);
    });

  }

  async checkAction() {
    try {
      if (this.user) {
        if (this.user.currentAction === '' && (this.router.url.includes('/pre') && !this.router.url.includes('pare'))) {
          this.router.navigate(['/prepare']);
        } else if (this.user.currentAction === '') {

        } else if (this.user.currentAction === 'preparing' && !(this.router.url.includes('/pre') !== this.router.url.includes('pare'))) {
          this.router.navigate(['/pre', this.user.actionID]);
        } else if ((this.user.currentAction === 'transcribing' || this.user.currentAction === 'reviewing')
                    && this.router.url.includes('/home')) {
          this.router.navigate(['/home']);
        }
      } else {
        setTimeout(() => {this.checkAction(); }, 100);
      }
    } catch (e) {
      console.log(e);
    }
  }

  // Services pertaining to accessibility collection

  async getTranscript(id) {
    const transcript = this.afs.collection('accessibility').doc(id).ref.get();
    return transcript;
  }

  createTranscript(data) {
    const id = this.afs.createId();
    this.afs.collection('accessibility').doc(id).set({
      ...data
    }).then(() => {}).catch(err => {
      console.log('Huston, we have a problem: ' + err.message);
    });
    return id;
  }

  updateTranscript(data, id) {
    this.afs.collection('accessibility').doc(id).update({
      ...data
    }).then(() => {}).catch(err => {
      console.log('Huston, we have a problem: ' + err.message);
    });
    return;
  }

  addCourseCode(id, newCode) {
    let add = true;
    const codes = [];
    codes.push(newCode);
    try {
      this.afs.collection('accessibility').doc(id).get().subscribe(res => {
        (res.data().courses).forEach(course => {
          if (course === newCode) {
            add = false;
          } else {
            codes.push(course);
          }
        });
      });
      setTimeout(() => {
        if (add) {
          this.afs.collection('accessibility').doc(id).update({
            courseCode: newCode
          }).catch(err => {
            console.log(err.message);
          });
        }
      }, 100);
    } catch (err) {
      console.log(err);
    }
  }

  addLocation(id, newLocation) {
    this.addCourseCode(id, newLocation.courseCode);
    const codes = [];
    codes.push(newLocation);
    const transcript = this.getTranscript(id);
    try {
      transcript.then(res => {
        res.data().location.forEach(location => {
          if (location.lmsURL !== newLocation.lmsURL) {
            codes.push(location);
          }
        });
      });
      setTimeout(() => {
        console.log(codes);
        this.afs.collection('accessibility').doc(id).update({
            location: codes
        });
      }, 200);
    } catch (e) {
      console.log(e);
    }
  }

  changeTranscriptStep(status, name, id) {
    try {
      if (status === 'In Prep') {
        this.afs.collection('accessibility').doc(id).update({
          preparer: name,
          status
        });
      } else if (status === 'In Transcription') {
        console.log('DONE');
        this.afs.collection('accessibility').doc(id).update({
          transcriber: name,
          status
        });
      } else if (status === 'In Review' || status === 'Review Completed') {
        this.afs.collection('accessibility').doc(id).update({
          reviewer: name,
          status
        });
      } else {
        this.afs.collection('accessibility').doc(id).update({
          status
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
  delete(id) {
    this.afs.collection('accessibility').doc(id).delete().catch(err => {
      console.log(err.message);
    });
  }

  // Firebase Storage
  getQuote(id) {
    id = '02';
    const url = firebase.storage().ref().child(`quote${id}.jpg`).getDownloadURL();
    return url;
  }
}

