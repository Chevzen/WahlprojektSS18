import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Search } from '../search/search';
import { RaumModel } from '../../model/RaumModel.1';
import ICAL from "ical.js";
import { Veranstaltung } from '../../model/Veranstaltung';
import { GebaudeModel } from '../../model/GebaudeModel';
import { CampusModel } from '../../model/CampusModel';

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


var GebaudeAuswahl:number = 1;
var freeRooms:string[] = [];

function setGebaude(wahl:number){
  GebaudeAuswahl = wahl;
}

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
  console.log("parseGebaude");
  console.log(name);
  raumnamen.forEach(raumname=> {
    var raum = parseToRaum(raumname);
    console.log(raumname);
    gebaude.addRaum(raum);
    
  });
  return gebaude;
}

function parseToRaum(raumname: string){
  var raum = new RaumModel(raumname);
  console.log("parseToRaum");
  console.log(raumname);
  var ics = raum.getICS(window.localStorage.getItem(raumname));

  ics.pop();

  var jcalData = ICAL.parse(ics.join("\r\n"));
  var vcalendar = new ICAL.Component(jcalData);
  var vevent = vcalendar.getAllSubcomponents('vevent');

  for(var i:number = 0; i < vevent.length; i++){
    var start = vevent[i].getFirstPropertyValue('dtstart');
    var startZeit = parseUhrZeit(start.toString());
    var name = vevent[i].getFirstPropertyValue('description');
    var wochentag = parseDateToWochentag(start.toString());
    console.log("start:"+ startZeit, "name" + name, "Wochentag " +wochentag);
    var veranstaltung = new Veranstaltung(name, wochentag, startZeit);
    raum.addVeranstaltung(veranstaltung);
  }
  return raum;
}

function parseToCampus(){
  var campus = new CampusModel("HSRM");
  console.log(CampusConfig)
  for(let gebaudeConfig of CampusConfig){
    var gebaude = parseGebaude(gebaudeConfig.raumnamen, gebaudeConfig.gebaudename)
    campus.addGebaude(gebaude);
    console.log(CampusConfig);
  }
  for(var i: number = 0; i < campus.gebaude[GebaudeAuswahl].getFreeRooms().length; i++){
    freeRooms.push(campus.gebaude[GebaudeAuswahl].getFreeRooms()[i].raumname);
  }
  console.log("test"+campus.gebaude[0].getFreeRooms()[0].raumname);
  return campus;
}




@IonicPage()
@Component({
  selector: 'page-d',
  templateUrl: 'd.html',
})
export class Dgebaude {

  private freeRooms:string[] = freeRooms; 
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DPage');
    console.log('ionViewDidLoad CPage');
    setGebaude(1);
    console.log(parseToCampus());   
    console.log(freeRooms);
    
  }

  BackToCampus(){
    this.navCtrl.setRoot(HomePage);
  }

  search() {
    this.navCtrl.setRoot( Search);
  }

}
