import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Gebaude } from './page';

@NgModule({
  declarations: [
    Gebaude,
  ],
  imports: [
    IonicPageModule.forChild(Gebaude),
  ],
})
export class GebaudeModule {}
