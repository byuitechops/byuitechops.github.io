import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../core/search.service';
import { ViewEditComponent } from '../../view-edit/view-edit.component';
import { DatabaseService } from 'src/app/core/database.service';

@Component({
    selector: 'app-prepare',
    templateUrl: './prepare.component.html',
    styleUrls: ['./prepare.component.css']
})
export class PrepareComponent implements OnInit {

    type: string;
    constructor(public search: SearchService, private db: DatabaseService, private view: ViewEditComponent) {
    this.showDetails('Xcob9Md829TdPO0y6DUP');
}



  ngOnInit() {
    setTimeout(() => {this.db.checkAction(); }, 1000);
  }

  showDetails(id) {
    const data = this.db.getTranscript(id);
    data.then(doc => {
      console.log(doc.data());
      this.view.openModal(doc.data());
    });
  }

  claimTranscript(id) {
    const userData = {
      actionID: id,
      currentAction: 'preparing'
    };
    this.db.updateUser(userData);
    this.db.changeTranscriptStep('In Prep', this.db.user.name);
  }
}
