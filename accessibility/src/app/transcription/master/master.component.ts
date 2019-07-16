import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/core/search.service';
import { DatabaseService } from 'src/app/core/database.service';
import { Router } from '@angular/router';
import { ViewEditComponent } from 'src/app/view-edit/view-edit.component';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  count = 0;
  constructor(public search: SearchService, private db: DatabaseService, private view: ViewEditComponent, private router: Router) {

  }



  ngOnInit() {
    this.db.checkAction();
  }

  // Open the view edit.
  async showDetails(id) {
    await this.view.openModal(id);
  }
}
