import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { StatsComponent } from './stats/stats.component';

@NgModule({
  declarations: [
    HomeComponent,
    StatsComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
