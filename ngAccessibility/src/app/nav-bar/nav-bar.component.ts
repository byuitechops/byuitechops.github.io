import { Component, OnInit } from '@angular/core';
import { SearchService } from '../core/search.service';
import { AuthPageComponent } from '../auth-page/auth-page.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  showResults = false;

  constructor(public search: SearchService, 
              public auth: AuthPageComponent) { }

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
