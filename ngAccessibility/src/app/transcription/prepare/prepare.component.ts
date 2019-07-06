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

  constructor(public search: SearchService, private db: DatabaseService, private view: ViewEditComponent, private router: Router) {
    // To sort the course codes alphabetically. Doesn't work with our key...
    // this.search.index.setSettings({
    //   customRanking: ['asc(courseCode)']
    // });
  }



  ngOnInit() {
    this.db.checkAction();
  }

  // Open the view edit.
  async showDetails(id) {
    await this.view.openModal(id);
  }

  // Async functions that update the user action and trascript step.
  // I use try try catch finally statements to make sure that it logs errors
  // and that the database action happens first.
  async claimTranscript(id) {
    const userData = {
      actionID: id,
      currentAction: 'preparing'
    };
    try {
      await this.db.updateUser(userData);
      await this.db.changeTranscriptStep('In Prep', this.db.user.name, id);
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => {
        this.router.navigate(['pre', id] );
      }, 300);
    }
  }
}
