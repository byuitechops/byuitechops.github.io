import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../core/search.service';
import { ViewEditComponent } from '../../view-edit/view-edit.component';
import { DatabaseService } from 'src/app/core/database.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-transcribe',
    templateUrl: './transcribe.component.html',
    styleUrls: ['./transcribe.component.css']
})
export class TranscribeComponent implements OnInit {

  constructor(public search: SearchService, private db: DatabaseService, private view: ViewEditComponent, private router: Router) {}



  ngOnInit() {
    const promise = new Promise((resolve, reject) => {
      this.db.checkAction();
    });
  }

  async showDetails(id) {
    await this.view.openModal(id);
  }

  async claimTranscript(id: string) {
    console.log(id);
    const userData = {
      actionID: id,
      currentAction: 'transcribing'
    };
    this.db.updateUser(userData);
    setTimeout(() => {
      this.db.changeTranscriptStep('In Transcription', this.db.user.name, id);
      this.router.navigate(['/'] );
    }, 500);
  }
}
