import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/core/database.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-preparing',
  templateUrl: './preparing.component.html',
  styleUrls: ['./preparing.component.css']
})
export class PreparingComponent implements OnInit {

  type: string;
  course: string;
  title: string;
  priority: string;
  lms: string;
  docPub: string;
  docEdit: string;
  verbit: string;
  verbitID: string;

  hours: number = 0;
  mins: number = 0;
  sec: number = 0;
  docID: string;

  constructor(private db: DatabaseService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      console.log(params);
      this.docID = params.id;
      const transcript = this.db.getTranscript(params.id);
      transcript.then(doc => {
        this.title = doc.data().title;
        this.course = doc.data().courseCode;
        this.type = doc.data().type;
        this.lms = doc.data().lmsURL;
        this.priority = doc.data().priority;
      });
    });
    this.db.checkAction();
  }

  submit() {
    let x = String(this.calc());
    let data;
    if (this.verbit) {
      data = {
        docEditURL:  this.docEdit,
        docPublishedURL:  this.docPub,
        verbit: this.verbit,
        verbitID: this.verbitID,
        length: x
      };
    } else {
      data = {
        docEditURL:  this.docEdit,
        docPublishedURL:  this.docPub,
        length: x
      };
    }
    this.activeRoute.params.subscribe(param => {
      this.db.changeTranscriptStep('Ready for Transcription', this.db.user.name, param.id);
    });
    const userData = {
      actionID: '',
      currentAction: ''
    };

    const promise = new Promise((resolve, reject) => {
      this.db.updateUser(userData);
      this.db.updateTranscript(data, this.docID);
    }).then(() => {
      this.router.navigate(['/'] );
    }).catch(err => {
      console.log(err.message);
    });
  }

  calc() {
    return Number(this.sec) + (Number(this.mins) * 60) + (Number(this.hours) * 60 * 60);
  }
}
