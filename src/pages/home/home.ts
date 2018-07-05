import { Component } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Gebaude } from '../page/page';
import { Search } from '../search/search';
import { Darstellung } from '../../model/Darstellung';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private freeRooms:string[];
  private darstellung:Darstellung;
  private favoriten:string[];
  private temp:string[] = [];
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
  ionViewDidLoad() {
    this.favoriten = localStorage.getItem("markiert").split(",");
    
    var c = 0;
    var e = 0;
    var h = 0;
     
     for(h= 0; h < 2; h++) {
        this.darstellung = new Darstellung(h);
        this.darstellung.parseToCampus();
        this.freeRooms = this.darstellung.freeRooms;
        //console.log("h: " + h);
        for(var i = 0; i < this.favoriten.length; i++) {
          c = 0;
          for(var x = 0; x < this.freeRooms.length; x++) {
            
              
              if(c == 2) {
                break;
              }
              //Wenn String ein Zeitslot ist
              if(this.freeRooms[x].charAt(0) == 9 || this.freeRooms[x].charAt(0) == 0 || this.freeRooms[x].charAt(0) == 2 ||
                  this.freeRooms[x].charAt(0) == 1 || this.freeRooms[x].charAt(0) == 4 || this.freeRooms[x].charAt(0) == 3 ||
                  this.freeRooms[x].charAt(0) == 5 || this.freeRooms[x].charAt(0) == 6 || this.freeRooms[x].charAt(0) == 7 ||
                  this.freeRooms[x].charAt(0) == 8) {
                c++;
                //console.log("Slot endeckt c: " + c);
                
              }
              else //Wenn Favoriten im ersten Slot der freien Räume sind
                {
                  //console.log("Raum: " + this.freeRooms[x]);
                  if(this.freeRooms[x] == this.favoriten[i]) {
                    //console.log("Dieser Raum ist in den Favoriten");
                    //Ist der Favorit schon in Temp
                    for(var t = 0; t < this.temp.length; t++) {
                      if(this.temp[t] == this.favoriten[i]) {
                        e = 1;
                      }
                    }
                    if(e == 0) {
                      this.temp.push(this.favoriten[i]);
                    }
                    e = 0;
                  }
                }
          }
      }
      }
        

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
