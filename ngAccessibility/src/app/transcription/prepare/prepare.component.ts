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
    course: string;
    title: string;
    priority: string;
    lms: string;
    docPub: string;
    docEdit: string;
    length: string;
    verbit: string;
    verbitID: string;

    constructor(public search: SearchService, private db: DatabaseService, private view: ViewEditComponent) {

}



  ngOnInit() {
    setTimeout(() => {this.db.checkAction(); }, 1000);
  }

  async showDetails(id) {
    const file = this.db.getTranscript(id);
    const data = await file.then(async doc => {
                    console.log(doc.data());
                    return doc.data();
                  });
    this.view.openModal();
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
