import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { StoreComponent } from './store/store.component';
import { StyleGuideComponent } from './style-guide/style-guide.component';

import { ThemeService } from './core/theme.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AdminComponent,
    AppComponent,
    AuthComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    ProfileComponent,
    ScheduleComponent,
    StoreComponent,
    StyleGuideComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    AngularFirestore,
    AngularFireStorage,
    AngularFireAuth,
    ThemeService, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
