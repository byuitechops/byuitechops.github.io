import { Injectable } from '@angular/core';
import * as algoliasearch from 'algoliasearch';
import { InvokeMethodExpr } from '@angular/compiler';
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
    this.dupCheck('Join a Meeting', 'Video', 'vFhAEoCF7jg');
  }

  // NOTES FOR SHAWN
  // This is the dup checker function, it takes a title , type, and src url to find out what matches it.
  // All the results are stored in an array name..... results. I thought that was a good name.
  // All you will need is the objectID of each to pull from the firestore, however, if you only want to
  // build the HTML for now, that works too. This is only needed in the request page


  async dupCheck(t, type, src) {
    const results = new Array();
    src = await this.cleanSRC(src);
    const index = searchClient.initIndex('transcripts');
    index.search({query: t}).then(x => {
      for (let y = 0; y < x.hits.length; y++) {
       if (x.hits[y].type === type) {
         if ((x.hits[y].srcURL).includes(src)) {
          results.push(x.hits[y]);
         }
       }
      }
    });
    console.log(results);
  }

  cleanSRC(link) {
    if (link.includes('youtube')) {
      link = link.slice(link.indexOf('watch?v=') + 8, (link.indexOf('watch?v=') + 9) + 11);
    } else if (link.includes('youtu.be')) {
      link = link.slice(link.indexOf('.be/') + 4, (link.indexOf('.be/') + 4) + 11);
    } else if (link.includes('video.byui.edu') && link.includes('/0_')) {
      link = link.slice(link.indexOf('/0_') + 1, (link.indexOf('/0_') + 1) + 10);
    } else if (link.includes('video.byui.edu') && link.includes('/1_')) {
      link = link.slice(link.indexOf('/1_') + 1, (link.indexOf('/1_') + 1) + 10);
    } else if (link.includes('vimeo')) {
      link = link.slice(link.indexOf('vimeo.com/') + 10, (link.indexOf('vimeo.com/') + 10) + 9);
    } else if (link.includes('fod.infobase.com')) {
      link = link.slice(link.indexOf('loid=') + 5, (link.indexOf('loid=') + 5) + 5);
    }
    return link;
  }
}
