import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { SearchService } from '../core/search.service';
import { NgAisModule } from 'angular-instantsearch';
import { PrepareComponent } from './prepare/prepare.component';
import { TranscribeComponent } from './transcribe/transcribe.component';
import { CopyeditComponent } from './copyedit/copyedit.component';
import { CopycheckComponent } from './copycheck/copycheck.component';

@NgModule({
  declarations: [
  SearchComponent,
  PrepareComponent,
  TranscribeComponent,
  CopyeditComponent,
  CopycheckComponent,
  ],
  imports: [
    CommonModule,
    NgAisModule.forRoot(),
  ]
})
export class TranscriptionModule { public algolia: SearchService; }
