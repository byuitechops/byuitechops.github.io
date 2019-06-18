import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequestComponent } from './request/request.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home/home.component';
import { SearchComponent } from './transcription/search/search.component';
import { AuthPageComponent } from './auth-page/auth-page.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';

import { MatButtonModule,  MatCardModule, MatFormFieldModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { AuthService } from './core/auth.service';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    RequestComponent,
    NavBarComponent,
    HomeComponent,
    SearchComponent,
    AuthPageComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
  ],
  providers: [
    AuthService,
    AngularFireAuth,
    AngularFirestore
  ],
  bootstrap: [
    AppComponent,
  ]
})

export class AppModule { }
