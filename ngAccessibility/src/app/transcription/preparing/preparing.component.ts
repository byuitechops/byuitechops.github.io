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
  length: string;
  verbit: string;
  verbitID: string;

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
  }

  submit() {
    const data = {
      docEditURL:  this.docEdit,
      docPublishedURL:  this.docPub,
      verbit: this.verbit,
      verbitID: this.verbitID
    };
    this.router.navigate(['prepare'] );
    this.db.changeTranscriptStep('Ready for Transcription', this.db.user.name);

    this.db.updateTranscript(data, this.docID);
  }
}
