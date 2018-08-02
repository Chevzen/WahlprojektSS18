import { Component, ViewChild } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController, Platform, Nav } from 'ionic-angular';
import { GebaudeModel } from '../../model/GebaudeModel';
import { Darstellung } from '../../model/Darstellung';

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
  *   items -> Liste für die Autovervollständigung der Searchbar                              *
  *                                                                                           *
  ********************************************************************************************/
  private darstellung:Darstellung;
  private gebaude:GebaudeModel = new GebaudeModel("C");
  private freeTimeSlot:number [] = freeTimeSlot;
  private freeUeberschrift:string[] = freeUeberschrift;
  private items: Array<string>;


  @ViewChild(Nav) nav:Nav;

  constructor(public platform: Platform, public toastCtrl: ToastController, public navCtrl: NavController,
    private alertCtrl: AlertController, public navParams: NavParams) {

    }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion wird nach dem Laden der View ausgeführt.                                       *
  *                                                                                           *
  ********************************************************************************************/
  ionViewDidLoad(){
    this.darstellung = new Darstellung(0);
    localStorage.setItem("page","Search");
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion ermittelt den Raum, der gesucht werden soll.                                   *
  *   searchbar -> die Suchmaske                                                              *
  *                                                                                           *
  ********************************************************************************************/
  searchRoom(searchbar){
    var room:string = searchbar.target.value;
    this.searchRoom2(room);
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion ermittelt für einen Raum die freien Slots                                      *
  *   room -> die Raum                                                                        *
  *                                                                                           *
  ********************************************************************************************/
  searchRoom2(room:string){
    freeTimeSlot = [];
    var raume:string[] = [];
    var zahl:number = 0;
    var lieblingsraum = "Der Raum ";

    var liste:HTMLElement = document.getElementById('liste');

    //Raumliste wird gefüllt:
    if(room.indexOf("C") == 0){
      for(var i:number = 0; i < this.darstellung.CampusConfig[0].raumnamen.length; i++){
        raume.push(this.darstellung.CampusConfig[0].raumnamen[i]);
      }
    }
    else if(room.indexOf("D") == 0){
      for(var j:number = 0; j < this.darstellung.CampusConfig[1].raumnamen.length; j++){
        raume.push(this.darstellung.CampusConfig[1].raumnamen[j]);
      }
    }

    //Fehlerbehandlung:
    if(raume.indexOf(room) == -1){
      liste.style.display = "none";
      this.filterItems(room);
      return;
    }

    //Die einzelnen Timeslots werden überprüft:
    for(var y:number = 0; y < StundenSlot.length; y++){
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
    if(zugang.indexOf(room) != -1){
      this.toasts("Für den Raum "+room+" brauchst du eine Zugangsberechtigung!");
    }

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
  *   Funktion füllt Array mit Räumen                                                         *
  *                                                                                           *
  ********************************************************************************************/
  setItems() {
    var raume:string[] = [];
    for(var i:number = 0; i < this.darstellung.CampusConfig[0].raumnamen.length; i++){
      raume.push(this.darstellung.CampusConfig[0].raumnamen[i]);
    }
    for(var j:number = 0; j < this.darstellung.CampusConfig[1].raumnamen.length; j++){
      raume.push(this.darstellung.CampusConfig[1].raumnamen[j]);
    }
    this.items = raume;
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion ruft die Filterfunktion mit dem Inhalt der Searchbar auf.                      *
  *   event -> die Searchbar                                                                  *
  *                                                                                           *
  ********************************************************************************************/
  filterItems2(event:any){
    var liste:HTMLElement = document.getElementById('liste');
    liste.style.display = "none";
    this.filterItems(event.target.value);
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion filtert die Räume                                                              *
  *   value -> String, nach dem in den Raumnamen gesucht werden soll                          *
  *                                                                                           *
  ********************************************************************************************/
  filterItems(value:string) {
    this.setItems();
    let val = value;

    if (val && val.trim() !== '') {
      this.items = this.items.filter(function(item) {
        return item.toLowerCase().includes(val.toLowerCase());
      });
      if(this.items.length == 0){
        this.items.unshift("Dieser Raum existiert leider nicht!");
      }else if(this.items.length != 1){
        this.items.unshift("Dieser Raum existiert leider nicht! Vielleicht hilft dir diese Liste:");
      }else{
        this.items.unshift("");
      }

    }else{
      this.items.unshift("Dieser Raum existiert leider nicht! Vielleicht hilft dir diese Liste:");
    }
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

  /********************************************************************************************
 	*                                                                                           *
 	*   Funktion löscht beim Verlassen die Variable from.                                       *
 	*                                                                                           *
 	********************************************************************************************/
   ionViewDidLeave() {
     if(null != localStorage.getItem("from")){
       localStorage.removeItem("from");
     }
   }
}
