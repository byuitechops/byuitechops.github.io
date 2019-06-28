import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../core/search.service';
import { ViewEditComponent } from '../../view-edit/view-edit.component';
import { DatabaseService } from 'src/app/core/database.service';

@Component({
    selector: 'app-transcribe',
    templateUrl: './transcribe.component.html',
    styleUrls: ['./transcribe.component.css']
})
export class TranscribeComponent implements OnInit {

  constructor(public search: SearchService, private db: DatabaseService, private view: ViewEditComponent) {}



  ngOnInit() {
    setTimeout(() => {this.db.checkAction(); }, 1000);
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
    await this.db.updateUser(userData);
    await this.db.changeTranscriptStep('In Transcription', this.db.user.name);
  }
}
