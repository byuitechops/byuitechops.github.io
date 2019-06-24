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
    doc: ''
  };

  constructor(public db: DatabaseService) {
    db.afs.collection('announcements').doc('announcement').get()
    .forEach(doc => {
      this.announce = doc.data().content;
    });
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
        });
      }
    }
  }

  async ngOnInit() {
    setTimeout(() => {this.db.checkAction(); }, 1000);
  }

}
