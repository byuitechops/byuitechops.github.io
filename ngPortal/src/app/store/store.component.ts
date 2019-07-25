import { Component, OnInit } from '@angular/core';
import { StoreService } from '../core/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

    constructor(public store: StoreService) { }

    ngOnInit() {

    }

}
