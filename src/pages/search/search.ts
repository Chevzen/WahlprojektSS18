import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RaumModel } from '../../model/RaumModel.1';
import ICAL from "ical.js";
import { Veranstaltung } from '../../model/Veranstaltung';
import { GebaudeModel } from '../../model/GebaudeModel';
import { CampusModel } from '../../model/CampusModel';

// Die Konfigurationsvariable für die Räume und Gebäudenamen, diese wird in den späteren Funktionen verwendet
var CampusConfig = [

  {
    gebaudename: "C",
    raumnamen: [
      "C001",
      "C007",
      "C035",
      "C037",
      "C113",
      "C213",
      "C237",
      "C305",
      "C313",
      "C361",
      "C375",
      "C377",
      "C405",
      "C407",
      "C413",
    ]

  },

  {
    gebaudename: "D",
    raumnamen: [
      "D01",
      "D02",
      "D12",
      "D13",
      "D14",
      "D15",
      "D17",
      "D18",
    ]

  }

];
var campus = new CampusModel("HSRM");
var freeTimeSlot : number [] = [];

function giveWochentag(){
  var jetzt = new Date();
  switch(jetzt.getDay()){
    case 1: return "Montag";
    case 2: return "Dienstag";
    case 3: return "Mittwoch";
    case 4: return "Donnerstag";
    case 5: return "Freitag";
    case 6: return "Samstag";
    case 0: return "Sonntag";
    default: break;
    }
}

var StundenSlot: string [] = [
  '8:15:00', '10:00:00', '11:45:00', '14:15:00', '16:00:00', '17:45:00', '19:30:00','ab 21:00:'
];


function parseDateToWochentag(text:string) {
  var datum:any = text.split("T");
  datum.pop();
  datum = datum[0].split("-");
  var datum2:any = new Date(datum[0],datum[1]-1,datum[2]);
  var tag:any = datum2.getDay();
  var wochentag:any = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  return wochentag[tag];
}

function parseUhrZeit(text:string) {
  var datum:any = text.split("T");
  var tmp:any = datum[1];
  return tmp;
}

function parseGebaude(raumnamen:string[], name:string){
  var gebaude = new GebaudeModel(name);
  //console.log("parseGebaude");
  //console.log(name);
  raumnamen.forEach(raumname=> {
    var raum = parseToRaum(raumname);
    //console.log(raumname);
    gebaude.addRaum(raum);

  });
  return gebaude;
}

function parseToRaum(raumname: string){
  var raum = new RaumModel(raumname);
  //console.log("parseToRaum");
  //console.log(raumname);
  //console.log(localStorage.getItem(raumname));
  var ics = raum.getICS(localStorage.getItem(raumname));
  ics.pop();

  var jcalData = ICAL.parse(ics.join("\r\n"));
  var vcalendar = new ICAL.Component(jcalData);
  var vevent = vcalendar.getAllSubcomponents('vevent');

  for(var i:number = 0; i < vevent.length; i++){
    var start = vevent[i].getFirstPropertyValue('dtstart');
    var end = vevent[i].getFirstPropertyValue('dtend');
    var startZeit = parseUhrZeit(start.toString());
    var endZeit = parseUhrZeit(end.toString());
    var name = vevent[i].getFirstPropertyValue('description');
    var wochentag = parseDateToWochentag(start.toString());
    //console.log("start:"+ startZeit, "name" + name, "Wochentag " +wochentag, "end:"+ endZeit);
    var veranstaltung = new Veranstaltung(name, wochentag, startZeit, endZeit);
    raum.addVeranstaltung(veranstaltung);

    switch(startZeit){

      case "08:15:00":

       if (endZeit == "11:30:00")  {
        console.log("hallo case 8 -11.30");
        var veranstaltung = new Veranstaltung(name, wochentag, "10:00:00", endZeit);
        raum.addVeranstaltung(veranstaltung); }
        else if (endZeit == "13:15:00"){
          console.log("hallo case 8 -13");
          var veranstaltung = new Veranstaltung(name, wochentag, "10:00:00", endZeit);
          raum.addVeranstaltung(veranstaltung);
          var veranstaltung = new Veranstaltung(name, wochentag, "11:45:00", endZeit);
          raum.addVeranstaltung(veranstaltung);
          }
        break;
      case "10:00:00":

      if (endZeit == "13:15:00")  {
        console.log("hallo case 10 -13.15");
        var veranstaltung = new Veranstaltung(name, wochentag, "11:45:00", endZeit);
        raum.addVeranstaltung(veranstaltung); }
        else if (endZeit == "15:45:00"){
          console.log("hallo case 10 -15.45");
          var veranstaltung = new Veranstaltung(name, wochentag, "11:45:00", endZeit);
          raum.addVeranstaltung(veranstaltung);
          var veranstaltung = new Veranstaltung(name, wochentag, "14:15:00", endZeit);
          raum.addVeranstaltung(veranstaltung);
          }
        break;
      case "11:45:00":

      if (endZeit == "15:45:00")  {
        console.log("hallo case 11.45-15.45");
        var veranstaltung = new Veranstaltung(name, wochentag, "14:15:00", endZeit);
        raum.addVeranstaltung(veranstaltung); }
        else if (endZeit == "17:30:00"){
          console.log("hallo case 11.45-17.35");
          var veranstaltung = new Veranstaltung(name, wochentag, "14:15:00", endZeit);
          raum.addVeranstaltung(veranstaltung);
          var veranstaltung = new Veranstaltung(name, wochentag, "16:00:00", endZeit);
          raum.addVeranstaltung(veranstaltung);
          }
        break;
      case "14:15:00":
      if (endZeit == "17:30:00")  {
        console.log("hallo case 14.15-17.30");
        var veranstaltung = new Veranstaltung(name, wochentag, "16:00:00", endZeit);
        raum.addVeranstaltung(veranstaltung); }
        else if (endZeit == "19:15:00"){
          console.log("hallo case 14.15-19.15");
          var veranstaltung = new Veranstaltung(name, wochentag, "16:00:00", endZeit);
          raum.addVeranstaltung(veranstaltung);
          var veranstaltung = new Veranstaltung(name, wochentag, "17:45:00", endZeit);
          raum.addVeranstaltung(veranstaltung);
          }
        break;
      case "16:00:00":
      if (endZeit == "19:15:00")  {
        console.log("hallo case 16.00-19.15");
        var veranstaltung = new Veranstaltung(name, wochentag, "17:45:00", endZeit);
        raum.addVeranstaltung(veranstaltung); }
        else if (endZeit == "21:00:00"){
          console.log("hallo case 16.00-21.00");
          var veranstaltung = new Veranstaltung(name, wochentag, "17:45:00", endZeit);
          raum.addVeranstaltung(veranstaltung);
          var veranstaltung = new Veranstaltung(name, wochentag, "19:30:00", endZeit);
          raum.addVeranstaltung(veranstaltung);
          }
        break;

      case "17:45:00":
      if (endZeit == "21:00:00")  {
        var veranstaltung = new Veranstaltung(name, wochentag, "19:30:00", endZeit);
        raum.addVeranstaltung(veranstaltung); }
      default:

    }


  }
  return raum;
}

function parseToCampus(){
  
  console.log(CampusConfig)
  for(let gebaudeConfig of CampusConfig){
    var gebaude = parseGebaude(gebaudeConfig.raumnamen, gebaudeConfig.gebaudename)
    campus.addGebaude(gebaude);
    console.log(CampusConfig);
  }
  
  console.log("test"+campus.gebaude[0].getFreeRooms()[0]);
}



@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class Search {

  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
  searchRoom(searchbar){
    freeTimeSlot = [];
    var room:string = searchbar.target.value;
    for(let rooms of CampusConfig){
      var raume: string [] = rooms.raumnamen;
    }
    if(raume.indexOf(room) == -1){
      var fehlerFeld: HTMLElement = document.getElementById('Fehler');
      fehlerFeld.innerText = "Raum konnte nicht gefunden werden";
      fehlerFeld.style.display = "block";
      return null;
    }  
    for(var y:number = 0; y < StundenSlot.length; y++){
      console.log(parseToRaum(room).isFree(StundenSlot[y],giveWochentag()));
      console.log(giveWochentag());
      console.log(parseToRaum(room));
      console.log(StundenSlot[y]);
      if(parseToRaum(room).isFree(StundenSlot[y],giveWochentag())){
        freeTimeSlot.push(y);
       }
      else{
        freeTimeSlot.push(99);
      } 
    }
    console.log(freeTimeSlot);
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
  private freeTimeSlot:number [] = freeTimeSlot;  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
