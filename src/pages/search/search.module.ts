import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Search } from './search';

@NgModule({
  declarations: [
    Search,
  ],
  imports: [
    IonicPageModule.forChild(Search),
  ],
})
export class SearchPageModule {}
