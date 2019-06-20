import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home/home.component';
import { RequestComponent } from './request/request.component';
import { PrepareComponent } from './transcription/prepare/prepare.component';
import { TranscribeComponent } from './transcription/transcribe/transcribe.component';
import { CopyeditComponent } from './transcription/copyedit/copyedit.component';
import { CopycheckComponent } from './transcription/copycheck/copycheck.component';

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
        path: 'prepare',
        component: PrepareComponent
    },
    {
        path: 'transcibe',
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
