import { Component, ViewChild } from '@angular/core';
import { Content, Platform, Nav } from 'ionic-angular';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Search } from '../search/search';
import { Darstellung } from '../../model/Darstellung';

/********************************************************************************************
*                                                                                           *
*   ueberschrift -> Array für die Überschrift der Seite                                     *
*                                                                                           *
********************************************************************************************/
var ueberschrift:string[] = [];

@IonicPage()
@Component({
  selector: 'gebaude',
  templateUrl: 'page.html',
})
export class Gebaude {

  /********************************************************************************************
  *                                                                                           *
  *   ueberschrift -> Array für die Überschriften der Seite                                   *
  *   freeRooms -> Array mit den freien Räumen                                                *
  *   zugang -> Array mit den Räumen, die eine Zugangsbeschränkung haben                      *
  *   markiert -> Array mit allen markierten Räumen                                           *
  *   entmarkiert -> Array mit allen nicht markierten Räumen                                  *
  *                                                                                           *
  ********************************************************************************************/
  private ueberschrift:string[] = ueberschrift;
  private freeRooms:string[] = [];
  private zugang:string[] = [];
  private markiert:string[] = [];
  private entmarkiert:string[] = ["D01", "D02", "D12", "D13", "D14", "D15", "D17", "D18", "C001", "C007", "C035", "C037", "C113", "C213", "C237", "C305", "C313", "C361", "C375", "C377", "C405", "C407", "C413"];


  @ViewChild(Content) content: Content;
  @ViewChild(Nav) nav:Nav;

  private darstellung:Darstellung;
  constructor(public platform: Platform, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {

    platform.registerBackButtonAction(() => {
      var page:string;
      if(null != localStorage.getItem("page")){
        page = localStorage.getItem("page");
        switch(page){
          case "room":
          this.backClicked();
          console.log("backPressed 1");return;
        }
      }
      this.nav.pop();
      console.log("backPressed 1");
    },101);
  }

  ionViewDidLoad() {
    console.log("NAVPARAMS: "+ this.navParams.get('item'));
    var page:string = this.navParams.get('item');
    var show: HTMLElement = document.getElementById('Lehraussen');
    show.style.display = "none";
    var innen: HTMLElement = document.getElementById('Lehrinnen');
    innen.style.display = "none";
    var span1: HTMLElement = document.getElementById('span1');
    span1.style.display = "none";
    var span2: HTMLElement = document.getElementById('span2');
    span2.style.display = "none";
    var button: HTMLElement = document.getElementById('button');
    button.style.display = "none";
    console.log('ionViewDidLoad '+page+'Page');
    var tmp:string = "";

    console.log(page.length);
    if(page.length > 1){
      console.log(page);
      tmp = page;
      page = page.substring(0,1);
    }

    //Unterscheide Seiten:
    switch(page){
      case "C":
        console.log("C");
        this.darstellung = new Darstellung(0);
        ueberschrift[0] = "C-Gebäude";
        ueberschrift[1] = "Folgende Räume sind zur Zeit im C-Gebäude frei:";
        break;
      case "D":
        console.log("D");
        this.darstellung = new Darstellung(1);
        ueberschrift[0] = "D-Gebäude";
        ueberschrift[1] = "Folgende Räume sind zur Zeit im D-Gebäude frei:";
        break;
    }

    console.log(this.darstellung);
    this.darstellung.parseToCampus();
    console.log(this.darstellung);
    this.freeRooms = this.darstellung.freeRooms;
    this.zugang = this.darstellung.zugang;
    console.log(this.freeRooms);
    console.log(this.zugang);
    //Favoriten laden:
    this.getMarkierung();
    console.log("Markiert: "+this.markiert);
    console.log("Entmarkiert: "+this.entmarkiert);
    //Raumplan anzeigen, falls gefordert durch Startseite:
    if(tmp != ""){
      this.getL(tmp);
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
  *   Funktion zeigt Meldung für Räume mit Zugangsbeschränkung                                *
  *   raum -> String mit dem Namen des Raums                                                  *
  *                                                                                           *
  ********************************************************************************************/
  onTip(raum:string){
    this.toasts("Für den Raum "+raum+" brauchst du eine Zugangsberechtigung.");
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion markiert bzw. entmarkiert Räume                                                *
  *   item -> Raumname                                                                        *
  *                                                                                           *
  ********************************************************************************************/
  makeFav(item) {
    //Gehe alle Räume durch
    var isDelete:number = 0;
    var tmp:string[] = this.markiert;
    //Gehe über alle Favoriten druch
    for(var i:number = 0; i < tmp.length; i++) {
      //Ist der angeklickte Raum in den Favoriten? Lösche ihn
      if(tmp[i] == item) {
        tmp.splice(i,1);
        this.toasts('Raum '+item+' wurde aus der Liste \"Markiert\" entfernt.');
        isDelete = -1;
        //Der gelöschte Eintrag wird aus den markierten entfernt:
        this.entferneEntmarkiertAusMarkiert(item);
      }
    }
    //Wenn der Raum nicht in den Favoriten ist, füge ihn hinzu
    if(isDelete == 0) {
      tmp.push(item);
      this.toasts('Raum '+item+' wurde markiert.');
      //Der hinzugefügte Eintrag wird aus den entmarkierten gelöscht:
      this.entferneMarkiertAusEntmarkiert();
    }
    localStorage.setItem("markiert", tmp.join(","));
    this.markiert = tmp;
    console.log("Markiert: "+ this.markiert);
    console.log("Entmarkiert: "+ this.entmarkiert);
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion füllt den Array markiert mit allen markierten Räumen                           *
  *                                                                                           *
  ********************************************************************************************/
  getMarkierung(){
    if(localStorage.getItem("markiert") != null){
      this.markiert = localStorage.getItem("markiert").split(",");
    }
    this.entferneMarkiertAusEntmarkiert();
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion entfernt alle markierten Räume aus den entmarkierten                           *
  *                                                                                           *
  ********************************************************************************************/
  entferneMarkiertAusEntmarkiert(){
    //tmp ist nun der Array mit den entmarkierten Räumen.
    var tmp = this.entmarkiert;
    //die markierten Räume werden durchlaufen
    for(var i:number = 0; i<this.markiert.length;i++){
      var index = tmp.indexOf(this.markiert[i]);
      //Wenn ein markierter Raum in den entmarkierten vorkommt...
      if(index != -1){
        //...wird der Raum entfernt
        for(var j:number = index; j < tmp.length-1;j++){
          tmp[j] = tmp[j+1];
        }
        tmp.pop();
      }
    }
    this.entmarkiert = tmp;
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion entfernt alle entmarkierten Räume aus den markierten                           *
  *                                                                                           *
  ********************************************************************************************/
  entferneEntmarkiertAusMarkiert(raum:string){
    //tmp ist nun der Array mit den markierten Räumen.
    var tmp = this.markiert;
    console.log("Markiert vor Entfernen: "+tmp);
    if(tmp.length == 1 && tmp[0] == raum){
      tmp.pop();
      this.markiert = tmp;
      console.log("Markiert nach Entfernen: "+tmp);
      this.entmarkiert.push(raum);
      console.log("Entmarkiert nach Entfernen aus Markiert: "+tmp);
      return;
    }
    var index = tmp.indexOf(raum);
    //Wenn ein entmarkierter Raum in den markierten vorkommt...
    if(index != -1){
      //...wird der Raum entfernt
      for(var i:number = index; i < tmp.length-1;i++){
        tmp[i] = tmp[i+1];
        tmp.pop();
      }
    }
    this.markiert = tmp;
    console.log("Markiert nach Entfernen: "+tmp);
    this.entmarkiert.push(raum);
    console.log("Entmarkiert nach Entfernen aus Markiert: "+tmp);
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion leitet ruft die Seite home.html auf                                            *
  *                                                                                           *
  ********************************************************************************************/
  BackToCampus(){
    this.navCtrl.setRoot(HomePage);
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion ruft die Seite search.html auf                                                 *
  *                                                                                           *
  ********************************************************************************************/
  search() {
    this.navCtrl.push( Search);
    var page:string = this.navParams.get('item');
    localStorage.setItem("from",page);
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion zeigt den Raumplan eines Raumes an                                             *
  *                                                                                           *
  ********************************************************************************************/
  getL(raumname:string){
    console.log("GETL");

    var show2: HTMLElement = document.getElementById('Lehrinnen');

    //Entfernen der Lehrveranstaltungen:
    var remove = show2.firstChild;

    while(remove) {
        show2.removeChild(remove);
        remove = show2.firstChild;
    }

    //Raumplan-Popup einblenden:
    var show: HTMLElement = document.getElementById('Lehraussen');
    show.style.display = "block";
    show2.style.display = "block";
    var span1: HTMLElement = document.getElementById('span1');
    span1.style.display = "block";
    var span2: HTMLElement = document.getElementById('span2');
    span2.style.display = "block";
    var button: HTMLElement = document.getElementById('button');
    button.style.display = "block";
    //Freie Räume ausblenden:
    var notShow: HTMLElement = document.getElementById('anzeige');
    notShow.style.display = "none";
    var header: HTMLElement = document.getElementById('header');
    header.style.display = "none";

    show2.appendChild(this.darstellung.getLehrveranstaltungen(raumname));

    localStorage.setItem("page", "room");
    this.scrollTop();
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion blendet den Raumplan eines Raumes aus                                          *
  *                                                                                           *
  ********************************************************************************************/
  backClicked(){
    console.log("backklicked");
    //Freie Räume einblenden:
    var show: HTMLElement = document.getElementById('anzeige');
    show.style.display = "block";
    var header: HTMLElement = document.getElementById('header');
    header.style.display = "block";
    //Raumplan-Popup ausblenden:
    var notShow: HTMLElement = document.getElementById('Lehraussen');
    notShow.style.display = "none";
    var notShow2: HTMLElement = document.getElementById('Lehrinnen');
    notShow2.style.display = "none";
    var span1: HTMLElement = document.getElementById('span1');
    span1.style.display = "none";
    var span2: HTMLElement = document.getElementById('span2');
    span2.style.display = "none";
    var button: HTMLElement = document.getElementById('button');
    button.style.display = "none";
    var page:string = this.navParams.get('item');
    localStorage.setItem("page", page);
    this.scrollTop();
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion scrollt nach oben                                                              *
  *                                                                                           *
  ********************************************************************************************/
  private scrollTop() {
    this.content.scrollToTop();
  }

}
