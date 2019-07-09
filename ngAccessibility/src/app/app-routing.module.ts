import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home/home.component';
import { RequestComponent } from './request/request.component';
import { PrepareComponent } from './transcription/prepare/prepare.component';
import { TranscribeComponent } from './transcription/transcribe/transcribe.component';
import { CopyeditComponent } from './transcription/copyedit/copyedit.component';
import { CopycheckComponent } from './transcription/copycheck/copycheck.component';
import { PreparingComponent } from './transcription/preparing/preparing.component';
import { MasterComponent } from './transcription/master/master.component';

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
      path: 'pre/:id',
      component: PreparingComponent
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
      path: 'master',
      component: MasterComponent
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
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


/****************************************************************************
 * This is all the routing for the entire website. We tried to keep it very
 * simple. We export this into the app.module.ts file and use it as the routing
 ****************************************************************************/
