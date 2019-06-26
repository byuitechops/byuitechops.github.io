import { Injectable } from '@angular/core';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root'
})
export class DuplicateService {

  duplicates: any;

  constructor(private search: SearchService) {

  }
}
