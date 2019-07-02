import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../core/search.service';
import { ViewEditComponent } from '../../view-edit/view-edit.component';
import { DatabaseService } from 'src/app/core/database.service';
import { Router } from '@angular/router';

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

  constructor(public search: SearchService, private db: DatabaseService, private view: ViewEditComponent, private router: Router) {

}



  ngOnInit() {
    this.db.checkAction();
  }

  async showDetails(id) {
    await this.view.openModal(id);
  }

  claimTranscript(id) {
    const userData = {
      actionID: id,
      currentAction: 'preparing'
    };
    this.db.updateUser(userData);
    this.db.changeTranscriptStep('In Prep', this.db.user.name, id);
    this.router.navigate(['pre', id] );
  }
}
