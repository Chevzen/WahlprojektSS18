import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Cgebaude } from '../c/c'
import { Dgebaude } from '../d/d'
import { Search } from '../search/search'



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  nextC() {
    this.navCtrl.setRoot( Cgebaude);

  }

  nextD() {
	  this.navCtrl.setRoot( Dgebaude);
  }

  search() {
    this.navCtrl.setRoot( Search);
  }

  deleteDaten() {
    localStorage.removeItem("benutzer");
    localStorage.removeItem("passwort");
  }
}
