import { Component, OnInit, } from '@angular/core';
import { SearchService } from '../core/search.service';
import { AuthPageComponent } from '../auth-page/auth-page.component';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  hider = false;

  constructor(public search: SearchService,
              public auth: AuthPageComponent,
              public af: AuthService) {}

  ngOnInit() {

  }


  /** Bind autocomplete feature to the input */


}
