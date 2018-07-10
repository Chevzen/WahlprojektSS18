import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform, Nav } from 'ionic-angular';
import { GebaudeModel } from '../../model/GebaudeModel';
import { Darstellung } from '../../model/Darstellung';
import { HomePage } from '../home/home';
import { Gebaude } from '../page/page';

/********************************************************************************************
*                                                                                           *
*   freeTimeSlot -> Array für die freien Slots eines Raums                                  *
*   freeUeberschrift -> Array für die Überschrift des Ergebnisses der Raumsuche             *
*   StundenSlot -> Array mit den Slots                                                      *
*                                                                                           *
********************************************************************************************/
var freeTimeSlot : number [] = [];
var freeUeberschrift:string[] = [];

var StundenSlot: string [] = [
  '08:15:00', '10:00:00', '11:45:00', '14:15:00', '16:00:00', '17:45:00', '19:30:00','21:00:00'
];


@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class Search {

  /********************************************************************************************
  *                                                                                           *
  *   darstellung -> Objekt vom Typ Darstellung                                               *
  *   gebaude -> ein Gebäude (wird benötigt für die Anzeige der Zugangsbeschränkung)          *
  *   freeTimeSlot -> Array für die freien Slots eines Raums                                  *
  *   freeUeberschrift -> Array für die Überschrift des Ergebnisses der Raumsuche             *
  *                                                                                           *
  ********************************************************************************************/
  private darstellung:Darstellung;
  private gebaude:GebaudeModel = new GebaudeModel("C");
  private freeTimeSlot:number [] = freeTimeSlot;
  private freeUeberschrift:string[] = freeUeberschrift;


  @ViewChild(Nav) nav:Nav;

  constructor(public platform: Platform, public toastCtrl: ToastController, public navCtrl: NavController,
    public navParams: NavParams) {

    platform.registerBackButtonAction(() => {
      var page:string;
      if(null != localStorage.getItem("from")){
        page = localStorage.getItem("from");
        localStorage.setItem("from", "Search");
        switch(page){
          case "Home":
          this.nav.setRoot(HomePage);
          console.log("backPressed 1");return;
          case "C":
          this.nav.setRoot(Gebaude, {item: "C"});
          console.log("backPressed 1");return;
          case "D":
          this.nav.setRoot(Gebaude, {item: "D"});
          console.log("backPressed 1");return;
        }
      }
    },1);
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion wird nach dem Laden der View ausgeführt.                                       *
  *                                                                                           *
  ********************************************************************************************/
  ionViewDidLoad(){
    console.log('ionViewDidLoad SearchPage');
    this.darstellung = new Darstellung(0);
    localStorage.setItem("page","Search");
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion ermittelt für einen Raum die freien Slots                                      *
  *   searchbar -> die Suchmaske                                                              *
  *                                                                                           *
  ********************************************************************************************/
  searchRoom(searchbar){
    freeTimeSlot = [];
    var room:string = searchbar.target.value;
    var raume:string[] = [];
    var zahl:number = 0;
    var lieblingsraum = "Der Raum";

    var liste:HTMLElement = document.getElementById('liste');

    var fehlerFeld: HTMLElement = document.getElementById('Fehler');
    fehlerFeld.innerText = "Raum konnte nicht gefunden werden";
    fehlerFeld.style.display = "none";

    //Raumliste wird gefüllt:
    if(room.indexOf("C") == 0){
      for(var i:number = 0; i < this.darstellung.CampusConfig[0].raumnamen.length; i++){
        raume.push(this.darstellung.CampusConfig[0].raumnamen[i]);
        console.log(this.darstellung.CampusConfig[0].raumnamen[i]);
      }
    }
    else if(room.indexOf("D") == 0){
      for(var j:number = 0; j < this.darstellung.CampusConfig[1].raumnamen.length; j++){
        raume.push(this.darstellung.CampusConfig[1].raumnamen[j]);
        console.log(this.darstellung.CampusConfig[1].raumnamen[j]);
      }
    }

    //Fehlerbehandlung:
    if(raume.indexOf(room) == -1){
      fehlerFeld.style.display = "block";
      liste.style.display = "none";
      return;
    }

    //Die einzelnen Timeslots werden überprüft:
    for(var y:number = 0; y < StundenSlot.length; y++){
      console.log(StundenSlot[y]);
      if(this.darstellung.parseToRaum(room).isFree(StundenSlot[y],this.darstellung.giveWochentag())){
        freeTimeSlot.push(y);
       }
      else{
        freeTimeSlot.push(99);
        zahl++;
      }
    }

    //Zugangsbeschränkung?:
    var zugang:string[] = this.gebaude.zugangsberechtigung;
    console.log(zugang);
    if(zugang.indexOf(room) != -1){
      this.toasts("Für den Raum "+room+" brauchst du eine Zugangsberechtigung!");
    }

    console.log(freeTimeSlot);
    liste.style.display = "block";

    //Markiert?
    var markiert:string[] = [];
    if(localStorage.getItem("markiert") != null){
      markiert = localStorage.getItem("markiert").split(",");
    }
    if(markiert.indexOf(room) != -1){
      lieblingsraum = "Dein Lieblingsraum ";
    }

    //Überschrift anpassen:
    if(zahl == StundenSlot.length){
      freeUeberschrift[0] = lieblingsraum+" \""+room+"\" ist heute leider nicht frei!";
    }else{
      freeUeberschrift[0] = lieblingsraum+" \""+room+"\" ist heute zu folgenden Uhrzeiten frei:";
    }

    this.navCtrl.setRoot(this.navCtrl.getActive().component);
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
