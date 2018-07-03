import { Component } from '@angular/core';
import { AlertController, Platform, ToastController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Gebaude } from '../page/page';
import { Search } from '../search/search';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public platform: Platform, public toastCtrl: ToastController, public navCtrl: NavController, private alertCtrl: AlertController) {

  }

  ionViewDidLoad(){
    localStorage.setItem("page","Home");
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion leitet weiter auf page.html                                                    *
  *   Es wird das item "C" an die Seite übermittelt um die Seite für das C-Gebäude            *
  *   zu erstellen.                                                                           *
  *                                                                                           *
  ********************************************************************************************/
  nextC() {
    this.navCtrl.push( Gebaude, {item: "C"});
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion leitet weiter auf page.html                                                    *
  *   Es wird das item "D" an die Seite übermittelt um die Seite für das D-Gebäude            *
  *   zu erstellen.                                                                           *
  *                                                                                           *
  ********************************************************************************************/
  nextD() {
    this.navCtrl.push( Gebaude, {item: "D"});
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion leitet weiter auf search.html                                                  *
  *                                                                                           *
  ********************************************************************************************/
  search() {
    this.navCtrl.push( Search);
    localStorage.setItem("from","Home");
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion löscht die Benutzerdaten                                                       *
  *                                                                                           *
  ********************************************************************************************/
  deleteDaten() {
    var raum:string[] = ["D01","D02","D11","D12","D13","D14","D15","D17","D18",
  	"C001","C007","C035","C037","C113","C213","C237","C305","C313","C361","C375","C377","C405","C407","C413"];
    let alert = this.alertCtrl.create({
      title: 'Daten löschen',
      message: 'Welche Daten möchtest du löschen?',
      buttons: [
        {
          text: 'Nichts',
          role: 'cancel',
          handler: () => {
            alert = null;
          }
        },
        {
          text: 'Benutzername und Passwort',
          handler: () => {
            localStorage.removeItem("benutzer");
            localStorage.removeItem("passwort");
            let toast = this.toastCtrl.create({
                message:  "Benutzerdaten gelöscht!",
                duration: 2000,
                position: 'middle',
                cssClass: "my-toast"
            });
            toast.present();
          }
        },
        {
          text: 'Markierte Räume',
          handler: () => {
            localStorage.removeItem("markiert");
            let toast = this.toastCtrl.create({
                message:  "Markierte Räume gelöscht!",
                duration: 2000,
                position: 'middle',
                cssClass: "my-toast"
            });
            toast.present();
          }
        },
        {
          text: 'Alles',
          handler: () => {
            localStorage.removeItem("benutzer");
            localStorage.removeItem("passwort");
            localStorage.removeItem("markiert");
            for(var i:number = 0; i < raum.length; i++){
              localStorage.removeItem(raum[i]);
            }
            let toast = this.toastCtrl.create({
                message:  "Alle Daten wurden gelöscht!",
                duration: 2000,
                position: 'middle',
                cssClass: "my-toast"
            });
            toast.present();
            this.platform.exitApp();
          }
        }
      ]
    });
    alert.present();
  }
}
