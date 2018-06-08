import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Search } from '../search/search'

export class Raum{
  name:string = "";
  belegung:string[][] = [[],[]];
  veranstaltung:string[] = [];
  professor:string[] = [];
}

/**
 * Generated class for the CPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-c',
  templateUrl: 'c.html',
})
export class Cgebaude {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CPage');
    var C001 = new Raum();
    C001.name = "C001";
    C001.belegung[0][0] = "Mo";
    C001.belegung[0][1] = "08:00";
    C001.veranstaltung[0] = "PMT";
    C001.professor[0] = "Panitz";

    console.log("C001-Name: "+C001.name);
    console.log("C001-Belegung: "+C001.belegung[0][0]+" "+C001.belegung[0][1]);
    console.log("C001-Veranstaltung: "+C001.veranstaltung[0]);
    console.log("C001-Professor: "+C001.professor[0]);
  }

  BackToCampus(){
    this.navCtrl.setRoot(HomePage);
  }

  search() {
    this.navCtrl.setRoot( Search);
  }

}
