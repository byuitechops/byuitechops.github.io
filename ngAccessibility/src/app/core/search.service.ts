import { Injectable } from '@angular/core';
import * as algoliasearch from 'algoliasearch';
import { AngularFirestore } from '@angular/fire/firestore';

const searchClient = algoliasearch(
  '6VK394JGGI',
  'dcec0491e3d9c5748090a98d77a31cc6'
);

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  config = {
    indexName: 'transcripts',
    searchClient,
  };
  showResults = true;

  constructor(public db: AngularFirestore) {

  }
}
