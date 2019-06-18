import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';


import { NgAisModule } from 'angular-instantsearch';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore/firestore';


import { environment } from 'src/environments/environment';
import { MasterComponent } from './master/master.component';
import { LoginComponent } from './login/login.component';
import { NotLoggedComponent } from './not-logged/not-logged.component';
import { EditBoxComponent } from './edit-box/edit-box.component';
import { RequestComponent } from './request/request.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    RequestComponent,
    MasterComponent,
    LoginComponent,
    NotLoggedComponent,
    EditBoxComponent,
    SearchComponent,
  ],
  imports: [
    NgAisModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgSelectModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'request',
        component: RequestComponent
      },
      {
        path: 'master',
        component: MasterComponent
      },
      {
        path: '**',
        component: HomeComponent
      },
    ]),
  ],
  providers: [ AngularFirestore ],
  bootstrap: [AppComponent],
  entryComponents: [
    NotLoggedComponent,
    LoginComponent,
    EditBoxComponent,
  ]
})
export class AppModule { }
