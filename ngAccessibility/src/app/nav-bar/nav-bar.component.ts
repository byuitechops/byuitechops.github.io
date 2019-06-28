import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SearchService } from '../core/search.service';
import { AuthPageComponent } from '../auth-page/auth-page.component';
import { ViewEditComponent } from '../view-edit/view-edit.component';
import { TargetLocator } from 'selenium-webdriver';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  showResults = false;

  constructor(public search: SearchService,
              public auth: AuthPageComponent,
              private view: ViewEditComponent) {
  
               }

  ngOnInit() {
  }

  async showDetails(id, e) {
    e.preventDefault()
    await this.view.openModal(id);
    console.log('Hello there');
  }
  searchChanged(query) {
    if (query.length >= 3) {
      this.showResults = true;
    } else {
      this.showResults = false;
    }
  }

  /** Bind autocomplete feature to the input */


}
