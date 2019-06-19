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
    db.afs.collection('announcements').doc('announcement').get()
    .forEach(doc => {
      this.announce = doc.data().content;
    });
  }

  async ngOnInit() {

  }

}
