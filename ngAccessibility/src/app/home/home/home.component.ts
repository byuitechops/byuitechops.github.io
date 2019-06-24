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
  data = {
    title: '',
    course: '',
    priority: '',
    lms: '',
    media: '',
    doc: '',
    id: ''
  };

  constructor(public db: DatabaseService, private afAuth: AuthService) {
    db.afs.collection('announcements').doc('announcement').get()
    .forEach(doc => {
      this.announce = doc.data().content;
    });
    setTimeout(() => {
      if (db.user !== undefined) {
        if (db.user.actionID !== '') {
          const transcript = db.getTranscript(db.user.actionID);
          transcript.then(doc => {
            const info = doc.data();
            console.log(info);
            this.data.title = info.title;
            this.data.course = info.courseCode;
            this.data.priority = info.priority;
            this.data.lms = info.lmsURL;
            this.data.media = info.srcURL;
            this.data.doc = info.docEditURL;
            this.data.id = doc.id;
          });
        }
      }
    }, 680);
  }

  async ngOnInit() {
    setTimeout(() => {this.db.checkAction(); }, 1000);
  }

  return() {

  }

  forward() {
    const transcript = this.db.getTranscript(this.data.id);
    transcript.then(doc => {
      const info = doc.data().status;
      if (info === 'In Prep') {
        this.db.changeTranscriptStep('Ready for Transcription', this.db.user.name);
        this.db.updateUser({actionID: '', currentAction: ''});
        this.data = {
          title: '',
          course: '',
          priority: '',
          lms: '',
          media: '',
          doc: '',
          id: ''
        };
      } else if (info === 'In Transcription') {
        this.db.changeTranscriptStep('Ready for Review', this.db.user.name);
        this.db.updateUser({actionID: '', currentAction: ''});
        this.data = {
          title: '',
          course: '',
          priority: '',
          lms: '',
          media: '',
          doc: '',
          id: ''
        };
        console.log('Success: ' + doc.data());
      } else if (info === 'In Review') {
        this.db.changeTranscriptStep('', this.db.user.name);
        this.db.updateUser({actionID: '', currentAction: ''});
        this.data = {
          title: '',
          course: '',
          priority: '',
          lms: '',
          media: '',
          doc: '',
          id: ''
        };
      }
    });
  }
}
