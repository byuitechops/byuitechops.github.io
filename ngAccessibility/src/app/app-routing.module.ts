import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home/home.component';
import { RequestComponent } from './request/request.component';
import { SearchComponent } from './transcription/search/search.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'request',
        component: RequestComponent
    },
    {
        path: 'transcription/:step',
        component: SearchComponent
    },
    {
        path: 'transcription/:step',
        component: SearchComponent
    },
    {
        path: 'transcription/:step',
        component: SearchComponent
    },
    {
        path: 'transcription/:step',
        component: SearchComponent
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },
    {
        path: '**',
        component: HomeComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
