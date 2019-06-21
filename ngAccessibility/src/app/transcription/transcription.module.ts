import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { SearchService } from '../core/search.service';
import { NgAisModule } from 'angular-instantsearch';
import { PrepareComponent } from './prepare/prepare.component';
import { TranscribeComponent } from './transcribe/transcribe.component';
import { CopyeditComponent } from './copyedit/copyedit.component';
import { CopycheckComponent } from './copycheck/copycheck.component';
import { AuthService } from '../core/auth.service';
import { DatabaseService } from '../core/database.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ViewEditComponent } from '../view-edit/view-edit.component';
import { AuthPageComponent } from '../auth-page/auth-page.component';

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
  ],
  providers: [
    AuthService,
    DatabaseService,
    AngularFireAuth,
    AngularFirestore,
    AuthPageComponent,
    ViewEditComponent
  ],
})
export class TranscriptionModule { public algolia: SearchService; }
