import {Component, ViewChild} from '@angular/core';
import {Content} from 'ionic-angular';


@Component({
  templateUrl: 'start.component.html',
 
})
export class MyApp {
  @ViewChild(Content) content: Content;

  scrollToTop() {
    this.content.scrollToTop();
  }

  
}

