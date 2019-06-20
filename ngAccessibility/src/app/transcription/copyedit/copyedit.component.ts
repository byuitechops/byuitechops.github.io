import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SearchService } from '../../core/search.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-copyedit',
  templateUrl: './copyedit.component.html',
  styleUrls: ['./copyedit.component.css']
})
export class CopyeditComponent implements OnInit {

  type: string;
  constructor(public db: AngularFirestore,
              public search: SearchService,
              private route: ActivatedRoute) {

    route.params.subscribe(rParam => {
      this.filterSearch();
    });
  }



  ngOnInit() {
  }

  filterSearch() {
    const x = this.route.snapshot.paramMap.get('step');
    switch (x) {
      case 'p':
        this.type = `\'Ready for Prep\'`;
        break;
      case 't':
        this.type = `\'Ready for Transcription\'`;
        break;
      case 'ce':
        this.type = `\'Ready for Review\'`;
        break;
      case 'cc':
        this.type = `\'Review Completed\'`;
        break;
    }
    console.log(this.type);
  }
}
