import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { StoreComponent } from './store/store.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { StyleGuideComponent } from './style-guide/style-guide.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'home',
      depth: 1
    }
  },
  {
    path: 'schedule',
    component: ScheduleComponent,
    data: {
      title: 'schedule',
      depth: 2
    }
  },
  {
    path: 'store',
    component: StoreComponent,
    data: {
      title: 'store',
      depth: 3
    }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: {
      title: 'profile',
      depth: 4
    }
  },
  {
    path: 'admin',
    component: AdminComponent,
    data: {
      title: 'copyedit',
      depth: 5
    }
  },
  {
    path: 'style',
    component: StyleGuideComponent,
    data: {
      title: 'style',
      depth: 5
    }
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
