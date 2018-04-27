import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Cgebaude } from '../c/c'
import { Dgebaude } from '../d/d'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  nextC() {
	  this.navCtrl.push( Cgebaude);
  }

  nextD() {
	  this.navCtrl.push( Dgebaude);
  }



}
