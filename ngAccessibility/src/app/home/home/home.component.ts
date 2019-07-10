import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/core/database.service';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  announce = 'Loading....';
  editAnnouce = false;
  data = {
    title: '',
    course: '',
    priority: '',
    lms: '',
    media: '',
    doc: '',
    id: '',
    verbitID: '',
    comment: '',
  };
  verbit = false;
  constructor(public db: DatabaseService, private afAuth: AuthService) {
    db.afs.collection('announcements').doc('announcement').get()
    .forEach(doc => {
      this.announce = doc.data().content;
      setTimeout(() => {
        this.updateInProgress();
      }, 900);
    });
  }
  edit() {
    if (!this.afAuth.user.isAnonymous) {
      if (this.db.user.lead) {
        this.editAnnouce = !this.editAnnouce;
      }
    }
  }
  sumbitEdit() {
    if (this.announce !== undefined || this.announce !== '') {
      this.db.afs.collection('announcements').doc('announcement').update({
        content: this.announce
      });
      this.editAnnouce = !this.editAnnouce;
    } else {
      alert('Be sure to put in an annoucement');
    }
  }

  async ngOnInit() {
    this.db.checkAction();
  }

  async return() {
    await this.db.changeTranscriptStep('Ready for Prep', this.db.user.name, this.db.user.actionID);
    this.db.updateUser({actionID: '', currentAction: ''});
    this.data = {
      title: '',
      course: '',
      priority: '',
      lms: '',
      media: '',
      doc: '',
      id: '',
      verbitID: '',
      comment: ''
    };
  }
  updateInProgress() {
    if (this.db.user !== undefined) {
      if (this.db.user.actionID !== '') {
        const transcript = this.db.getTranscript(this.db.user.actionID);
        transcript.then(doc => {
          setTimeout(() => {
            const info = doc.data();
            console.log(info);
            this.data.title = info.title;
            this.data.course = info.courseCode;
            this.data.priority = info.priority;
            this.data.lms = info.lmsURL;
            this.data.media = info.srcURL;
            this.data.doc = info.docEditURL;
            this.data.id = doc.id;
            if (info.verbit) {
              this.verbit = true;
              this.data.verbitID = info.verbitID;
            }
            this.data.comment = info.requestNotes;
            this.data.comment += info.notes;
          }, 300);
        });
      }
    }
  }
  forward() {
    console.log(this.data.id);
    const transcript = this.db.getTranscript(this.data.id);
    transcript.then(doc => {
      const info = doc.data().status;
      console.log(info);
      if (info === 'In Transcription') {
        this.db.changeTranscriptStep('Ready for Review', this.db.user.name, this.data.id);
        this.db.updateUser({actionID: '', currentAction: ''});
        this.data = {
          title: '',
          course: '',
          priority: '',
          lms: '',
          media: '',
          doc: '',
          id: '',
          verbitID: '',
          comment: ''
        };
        console.log('Success: ' + doc.data());
      } else if (info === 'In Review') {
        this.db.changeTranscriptStep('', this.db.user.name, this.data.id);
        this.db.updateUser({actionID: '', currentAction: ''});
        this.data = {
          title: '',
          course: '',
          priority: '',
          lms: '',
          media: '',
          doc: '',
          id: '',
          verbitID: '',
          comment: ''
        };
      }
    });
  }

  openReturn() {
    const modal = document.getElementById('return-prep-modal');
    const navbar = document.getElementById('main-nav');
    const content = document.getElementsByTagName('main');

    modal.classList.remove('hide');
    navbar.classList.add('blur');
    for (let i = 0; i < content.length; i++) {
      content[i].classList.add('blur');
    }

  }
}
