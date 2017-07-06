import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScriptPage } from './script';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    ScriptPage,
    PdfViewerComponent
  ],
  imports: [
    IonicPageModule.forChild(ScriptPage),
  ],
  exports: [
    ScriptPage
  ]
})
export class ScriptPageModule {}
