import { Component } from '@angular/core';
import { AlertController, NavParams, Platform, ToastController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Gebaude } from '../page/page';
import { Search } from '../search/search';
import { Darstellung } from '../../model/Darstellung';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  /********************************************************************************************
  *                                                                                           *
  *   freeRooms -> Array mit allen freien Räumen                                              *
  *   darstellung -> Objekt der Klasse Darstellung                                            *
  *   favoriten -> Array mit allen markierten Räumen                                          *
  *   temp -> Array mit allen freien markierten Räumen                                        *
  *                                                                                           *
  ********************************************************************************************/
  private freeRooms:string[];
  private darstellung:Darstellung;
  private favoriten:string[];
  private temp:string[] = [];

  constructor(public platform: Platform, public toastCtrl: ToastController, public navCtrl: NavController,
    private alertCtrl: AlertController, public navParams: NavParams) {

    }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion wird nach dem Laden der View ausgeführt.                                       *
  *                                                                                           *
  ********************************************************************************************/
  ionViewDidLoad(){
    localStorage.setItem("page","Home");
    if(localStorage.getItem("markiert") != null){
      this.favoriten = localStorage.getItem("markiert").split(",");

      var h = 0;

      for(h = 0; h < 2; h++) {
        this.darstellung = new Darstellung(h);
        this.darstellung.parseToCampus();
        this.freeRooms = this.darstellung.freeRooms;

        this.freieMarkierte();
      }
    }

    if(this.navParams.get("item") == "daten"){
      this.deleteDaten();
    }
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion ermittelt die aktuell freien, markierten Räume.                                *
  *   Diese werden in den Array temp geschrieben.                                             *
  *                                                                                           *
  ********************************************************************************************/
  freieMarkierte(){
    var c = 0;
    var e = 0;
    for(var i = 0; i < this.favoriten.length; i++) {
      //Alle Favoriten durchgehen
      c = 0;
      for(var x = 0; x < this.freeRooms.length; x++) {
        //Alle freien Räume durchgehen
        if(c == 2) {
          break;
        }
        //Wenn String ein Zeitslot ist
        //Also mit einer Zahl statt einem Buchstaben beginnt
        if(this.freeRooms[x].charAt(0) == '0' || this.freeRooms[x].charAt(0) == '1' ||
          this.freeRooms[x].charAt(0) == '2' || this.freeRooms[x].charAt(0) == '3' ||
          this.freeRooms[x].charAt(0) == '4' || this.freeRooms[x].charAt(0) == '5' ||
          this.freeRooms[x].charAt(0) == '6' || this.freeRooms[x].charAt(0) == '7' ||
          this.freeRooms[x].charAt(0) == '8' || this.freeRooms[x].charAt(0) == '9') {

          c++;
          //console.log("Slot endeckt c: " + c);
        }//if
        else{
          //Wenn Favoriten im ersten Slot der freien Räume sind
          //console.log("Raum: " + this.freeRooms[x]);
          if(this.freeRooms[x] == this.favoriten[i]) {
            //console.log("Dieser Raum ist in den Favoriten");
            //Ist der Favorit schon in Temp
            for(var t = 0; t < this.temp.length; t++) {
              if(this.temp[t] == this.favoriten[i]) {
                e = 1;
              }//if
            }//for t
            if(e == 0) {
              this.temp.push(this.favoriten[i]);
            }//if
              e = 0;
          }//if
        }//else
      }//for x
    }//for i
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion ruft das Gebäude auf und übermittelt den Namen des Raums.                      *
  *                                                                                           *
  *   temp -> Name des Raums auf den geklickt wurde                                           *
  *                                                                                           *
  ********************************************************************************************/
  onTip(temp){
    this.navCtrl.push(Gebaude, {item: temp});
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
  *   Funktion öffnet die Datenverwaltung                                                     *
  *                                                                                           *
  ********************************************************************************************/
  deleteDaten() {
    var raum:string[] = [
      "D01","D02","D11","D12","D13","D14","D15","D17","D18",
  	  "C001","C007","C035","C037","C113","C213","C237","C305","C313","C361","C375","C377","C405","C407","C413"
    ];
    let alert = this.alertCtrl.create({
      title: 'Datenverwaltung',
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
            this.toasts("Benutzerdaten gelöscht!");
          }
        },
        {
          text: 'Markierte Räume',
          handler: () => {
            localStorage.removeItem("markiert");
            this.toasts("Markierte Räume gelöscht!");
          }
        },
        {
          text: 'Alles',
          handler: () => {
            alert = null;
            let alert1 = this.alertCtrl.create({
              title: 'Warnung!',
              message: 'Alle Daten löschen und die App schließen?',
              buttons: [
                {
                  text: 'Nein',
                  role: 'cancel',
                  handler: () => {
                    alert1 = null;
                  }
                },
                {
                  text: 'Ja',
                  handler: () => {
                    localStorage.removeItem("benutzer");
                    localStorage.removeItem("passwort");
                    localStorage.removeItem("markiert");
                    localStorage.removeItem("page");
                    localStorage.removeItem("from");
                    localStorage.removeItem("aktuell");
                    localStorage.removeItem("markiert");
                    for(var i:number = 0; i < raum.length; i++){
                      localStorage.removeItem(raum[i]);
                    }
                    this.toasts("Alle Daten wurden gelöscht!");
                    this.platform.exitApp();
                  }
                }
              ]
            });
            alert1.present();
          }
        }
      ]
    });
    alert.present();
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion erstellt eine Meldung                                                          *
  *   message -> String mit der Nachricht, die die Meldung enthalten soll                     *
  *                                                                                           *
  ********************************************************************************************/
  toasts(message:string){
    let toast = this.toastCtrl.create({
        message:  message,
        duration: 2000,
        position: 'middle',
        cssClass: "my-toast"
    });
    toast.present();
  }
}
