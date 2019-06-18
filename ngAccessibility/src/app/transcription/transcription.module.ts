import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrepareComponent } from './prepare/prepare.component';
import { TranscribeComponent } from './transcribe/transcribe.component';
import { CopyeditComponent } from './copyedit/copyedit.component';
import { CopycheckComponent } from './copycheck/copycheck.component';

@NgModule({
  declarations: [PrepareComponent, TranscribeComponent, CopyeditComponent, CopycheckComponent],
  imports: [
    CommonModule
  ]
})
export class TranscriptionModule { }
