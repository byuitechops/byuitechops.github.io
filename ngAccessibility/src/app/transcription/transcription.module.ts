import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { SearchService } from '../core/search.service';

@NgModule({
  declarations: [
  SearchComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class TranscriptionModule { public algolia: SearchService; }
