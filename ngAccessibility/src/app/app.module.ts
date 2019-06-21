import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequestComponent } from './request/request.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AuthPageComponent } from './auth-page/auth-page.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { NgAisModule } from 'angular-instantsearch';

import { FormsModule } from '@angular/forms';
import { AuthService } from './core/auth.service';
import { DatabaseService } from './core/database.service';

import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './home/home.module';
import { TranscriptionModule } from './transcription/transcription.module';
import { ViewEditComponent } from './view-edit/view-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    RequestComponent,
    NavBarComponent,
    AuthPageComponent,
    ViewEditComponent
  ],
  imports: [
    NgAisModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    NgAisModule,
    HomeModule,
    TranscriptionModule
  ],
  providers: [
    AuthService,
    DatabaseService,
    AngularFireAuth,
    AngularFirestore,
    AuthPageComponent,
    ViewEditComponent
  ],
  bootstrap: [
    AppComponent
  ],

})

export class AppModule { }
