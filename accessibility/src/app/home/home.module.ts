import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { StatsComponent } from './stats/stats.component';
import { NgAisModule } from 'angular-instantsearch';

@NgModule({
  declarations: [
    HomeComponent,
    StatsComponent,
  ],
  imports: [
    CommonModule,
    NgAisModule,
    FormsModule
  ]
})
export class HomeModule { }
