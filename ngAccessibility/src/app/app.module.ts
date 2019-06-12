import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { fillProperties } from '@angular/core/src/util/property';
import { RouterModule } from '@angular/router';
import { RequestComponent } from './request/request.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { TranscribeComponent } from './transcribe/transcribe.component';
import { PrepareComponent } from './prepare/prepare.component';
import { CopyeditComponent } from './copyedit/copyedit.component';
import { CopycheckComponent } from './copycheck/copycheck.component';
import { MasterComponent } from './master/master.component';
import { LoginComponent } from './login/login.component';
import { NotLoggedComponent } from './not-logged/not-logged.component';
import { EditBoxComponent } from './edit-box/edit-box.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    RequestComponent,
    TranscribeComponent,
    PrepareComponent,
    CopyeditComponent,
    CopycheckComponent,
    MasterComponent,
    LoginComponent,
    NotLoggedComponent,
    EditBoxComponent
  ],
  imports: [
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
        path: 'prepare',
        component: PrepareComponent
      },
      {
        path: 'transcribe',
        component: TranscribeComponent
      },
      {
        path: 'copyedit',
        component: CopyeditComponent
      },
      {
        path: 'copycheck',
        component: CopycheckComponent
      },
      {
        path: 'master',
        component: MasterComponent
      },
      {
        path: '**',
        component: HomeComponent
      },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent, RequestComponent]
})
export class AppModule { }
