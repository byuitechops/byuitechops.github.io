import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/core/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  announce = 'Loading....';

  constructor(public db: DatabaseService) {

  }

  async ngOnInit() {
    this.announce = await this.db.announcement;
    console.log(this.db.announcement);
  }

}
