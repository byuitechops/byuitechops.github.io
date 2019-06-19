import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as algoliasearch from 'algoliasearch';
import { SearchService } from 'src/app/core/search.service';


const searchClient = algoliasearch(
  '6VK394JGGI',
  'dcec0491e3d9c5748090a98d77a31cc6'
);

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  config = {
    indexName: 'transcripts',
    searchClient,
  };
  showResults = true;

  constructor(public db: AngularFirestore, public search: SearchService) {

  }



  ngOnInit() {
  }

}
