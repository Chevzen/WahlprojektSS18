import { Component } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Gebaude } from '../page/page';
import { Search } from '../search/search';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public toastCtrl: ToastController, public navCtrl: NavController, private alertCtrl: AlertController) {

  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion leitet weiter auf page.html                                                    *
  *   Es wird das item "C" an die Seite übermittelt um die Seite für das C-Gebäude            *
  *   zu erstellen.                                                                           *
  *                                                                                           *
  ********************************************************************************************/
  nextC() {
    this.navCtrl.setRoot( Gebaude, {item: "C"});
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion leitet weiter auf page.html                                                    *
  *   Es wird das item "D" an die Seite übermittelt um die Seite für das D-Gebäude            *
  *   zu erstellen.                                                                           *
  *                                                                                           *
  ********************************************************************************************/
  nextD() {
    this.navCtrl.setRoot( Gebaude, {item: "D"});
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion leitet weiter auf search.html                                                  *
  *                                                                                           *
  ********************************************************************************************/
  search() {
    this.navCtrl.setRoot( Search);
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion löscht die Benutzerdaten                                                       *
  *                                                                                           *
  ********************************************************************************************/
  deleteDaten() {
    let alert = this.alertCtrl.create({
      title: 'Benutzerdaten',
      message: 'Willst du wirklich deine Benutzerdaten löschen?',
      buttons: [
        {
          text: 'Nein',
          role: 'cancel',
          handler: () => {
            alert = null;
          }
        },
        {
          text: 'Ja',
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
        }
      ]
    });
    alert.present();
  }
}
