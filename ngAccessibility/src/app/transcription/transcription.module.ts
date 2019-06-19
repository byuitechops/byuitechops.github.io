import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { SearchService } from '../core/search.service';
import { NgAisModule } from 'angular-instantsearch';

@NgModule({
  declarations: [
  SearchComponent,
  ],
  imports: [
    CommonModule,
    NgAisModule.forRoot(),
  ]
})
export class TranscriptionModule { public algolia: SearchService; }
