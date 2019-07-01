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
  index = searchClient.initIndex('transcripts');
  duplicates = {};
  areThere = false;
  constructor(public db: AngularFirestore) {
   }

  // This is the dup checker function, it takes a title , type, and src url to find out what matches it.
  // All the results are stored in an array name..... results. I thought that was a good name.
  // All you will need is the objectID of each to pull from the firestore.


  async dupCheck(data) {
    const t = data.title;
    const type = data.type;
    let src = data.srcURL;
    const results = new Array();
    src = await this.cleanSRC(src);
    console.log(src);
    this.index.search({query: t}).then(async x => {
    // tslint:disable-next-line: prefer-for-of
      for (let y = 0; y < x.hits.length; y++) {
       if (x.hits[y].type === type) {
         if ((x.hits[y].srcURL).includes(src)) {
          results.push(x.hits[y]);
          this.areThere = true;
         }
       }
      }
    });
    console.log(results);
    this.duplicates = results;
    return results;
  }

  cleanSRC(link) {
    if (link.includes('youtube') && link.includes('watch?v=')) {
      link = link.slice(link.indexOf('watch?v=') + 8, (link.indexOf('watch?v=') + 9) + 11);
    } else if (link.includes('youtube') && link.includes('/embed/')) {
      link = link.slice(link.indexOf('/embed/') + 7, (link.indexOf('/embed/') + 7) + 11);
    } else if (link.includes('youtu.be')) {
      link = link.slice(link.indexOf('.be/') + 4, (link.indexOf('.be/') + 4) + 11);
    } else if (link.includes('video.byui.edu') && link.includes('/0_')) {
      link = link.slice(link.indexOf('/0_') + 1, (link.indexOf('/0_') + 1) + 10);
    } else if (link.includes('cdnapisec.kaltura.com')) {
      link = link.slice(-10);
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
