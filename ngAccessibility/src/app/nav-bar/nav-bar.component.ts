import { Component, OnInit } from '@angular/core';
import { SearchService } from '../core/search.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public search: SearchService) { }

  ngOnInit() {
  }

}
