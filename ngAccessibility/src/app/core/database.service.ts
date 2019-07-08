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
    setTimeout(() => {
      this.findUser(this.user.name);
    }, 500);
  }

  async checkAction() {
    try {
      if (this.user) {
        if (this.user.currentAction === '' && (this.router.url.includes('/pre') && !this.router.url.includes('pare'))) {
          this.router.navigate(['/prepare']);
        } else if (this.user.currentAction === '') {

        } else if (this.user.currentAction === 'preparing' && !this.router.url.includes('/pre')) {
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
    this.afs.collection('accessibility').doc(this.afs.createId()).set({
      ...data
    })
    .then(() => {}).catch(err => {
      console.log('Huston, we have a problem: ' + err);
    });
    return;
  }

  updateTranscript(data, id) {
    this.afs.collection('accessibility').doc(id).update({
      ...data
    })
    .then(() => {}).catch(err => {
      console.log('Huston, we have a problem: ' + err);
    });
    return;
  }

  addCourseCode(id, newCode) {
    let add = true;
    const codes = [];
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

  addLocation(id, newLocation) {
    let add = true;
    const codes = [];
    codes.push(newLocation);
    this.afs.collection('accessibility').doc(id).get().subscribe(res => {
      (res.data().location).forEach(location => {
        if (location.lmsURL === newLocation.lmsURL) {
          add = false;
        } else {
          codes.push(location);
        }
      });
    });
    if (add) {
      this.afs.collection('accessibility').doc(id).update({
        location: codes
      });
    }
  }

  changeTranscriptStep(status, name, id) {
    console.log(status);
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
    console.log('Working');
  }
}

