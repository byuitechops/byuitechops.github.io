import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { ThemeService } from './core/theme.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { StoreComponent } from './store/store.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { StyleGuideComponent } from './style-guide/style-guide.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    StoreComponent,
    HomeComponent,
    ProfileComponent,
    ScheduleComponent,
    StyleGuideComponent,
    AdminComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    AngularFirestore,
    AngularFireStorage,
    AngularFireAuth,
    ThemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
