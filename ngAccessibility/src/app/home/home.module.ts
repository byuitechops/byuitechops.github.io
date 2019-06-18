import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LogsComponent } from './logs/logs.component';

@NgModule({
  declarations: [HomeComponent, LogsComponent],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
