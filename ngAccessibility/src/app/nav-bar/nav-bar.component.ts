import { Component, OnInit } from '@angular/core';
import { SearchService } from '../core/search.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  showResults = false;

  constructor(public search: SearchService) { }

  ngOnInit() {
  }

  searchChanged(query) {
    if (query.length >= 3) {
      this.showResults = true;
    } else {
      this.showResults = false;
    }
  }
}
