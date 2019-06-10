import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { EditDocComponent } from './edit-doc/edit-doc.component';
import { FilterComponent } from './filter/filter.component';
import { HomeComponent } from './home/home.component';
import { RequestComponent } from './request/request.component';
import { PrepareComponent } from './prepare/prepare.component';
import { TranscribeComponent } from './transcribe/transcribe.component';
import { CopyeditComponent } from './copyedit/copyedit.component';
import { CopyeditCheckComponent } from './copyedit-check/copyedit-check.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    EditDocComponent,
    FilterComponent,
    HomeComponent,
    RequestComponent,
    PrepareComponent,
    TranscribeComponent,
    CopyeditComponent,
    CopyeditCheckComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
