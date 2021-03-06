import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../core/search.service';
import { ViewEditComponent } from '../../view-edit/view-edit.component';
import { DatabaseService } from 'src/app/core/database.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-copyedit',
    templateUrl: './copyedit.component.html',
    styleUrls: ['./copyedit.component.css']
})
export class CopyeditComponent implements OnInit {

  constructor(public search: SearchService, private db: DatabaseService, private view: ViewEditComponent, private router: Router) {}



  ngOnInit() {
    const promise = new Promise((resolve, reject) => {
      this.db.checkAction();
    });
  }

  async showDetails(id) {
    await this.view.openModal(id);
  }

  claimTranscript(id) {
    const userData = {
      actionID: id,
      currentAction: 'reviewing'
    };
    this.db.updateUser(userData);
    this.db.changeTranscriptStep('In Review', this.db.user.name, id);
    this.router.navigate(['/'] );
  }
}
