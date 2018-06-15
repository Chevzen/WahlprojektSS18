import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Search } from '../search/search';
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
  console.log("test"+campus.gebaude[0].getFreeRooms());
  return campus;
}
  
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

function giveUhrzeit(){
    var jetzt = new Date();
    var stunden = jetzt.getHours();
    var minuten = jetzt.getMinutes();
    switch(true){
      case (stunden == 8 && minuten >= 5 || stunden == 9 && minuten <= 45): return "8:15:00";  
      case (stunden == 9 && minuten >= 45 || stunden == 10 || stunden == 11  && minuten <= 30): return "10:00:00";
      case (stunden == 11 && minuten >= 30 || stunden == 12 || stunden == 13 && minuten <= 15): return "11:45:00";
      case (stunden == 14 && minuten >= 15 || stunden == 15 && minuten <= 45): return "14:15:00";
      case (stunden == 16 || stunden == 17 && minuten <= 30): return "16:00:00";
      case (stunden == 17 && minuten >= 45 || stunden == 18 || stunden == 19 && minuten <= 15): return "17:45:00";
      default: break;
    }
}

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
    console.log(parseToCampus());
    /*
    //Raum C001:
    let C001 = new RaumModel("C001");
    var ics = C001.getICS(window.localStorage.getItem("C001"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      C001.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ C001.getwochenTag(start.toString()));
			C001.wochentag[i] = C001.getwochenTag(start.toString());
      console.log('start Uhrzeit: '+ C001.getUhrZeit(start.toString()));
      C001.uhrzeit[i] = C001.getUhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(C001);
    //Raum C007:
    let C007 = new RaumModel("C007");
    var ics = C007.getICS(window.localStorage.getItem("C007"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      C007.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ C007.getwochenTag(start.toString()));
      C007.wochentag[i] = C007.getwochenTag(start.toString());
      console.log('start Uhrzeit: '+ C007.getUhrZeit(start.toString()));
      C007.uhrzeit[i] = C007.getUhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(C007);

    //Raum C035:
    let C035 = new RaumModel("C035");
    var ics = C035.getICS(window.localStorage.getItem("C035"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      C035.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ C035.getwochenTag(start.toString()));
      C035.wochentag[i] = C035.getwochenTag(start.toString());
      console.log('start Uhrzeit: '+ C035.getUhrZeit(start.toString()));
      C035.uhrzeit[i] = C035.getUhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(C035);

    //Raum C037:
    let C037 = new RaumModel("C037");
    var ics = C037.getICS(window.localStorage.getItem("C037"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      C037.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ C037.getwochenTag(start.toString()));
      C037.wochentag[i] = C037.getwochenTag(start.toString());
      console.log('start Uhrzeit: '+ C037.getUhrZeit(start.toString()));
      C037.uhrzeit[i] = C037.getUhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(C037);

    //Raum C113:
    let C113 = new RaumModel("C113");
    var ics = C113.getICS(window.localStorage.getItem("C113"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      C113.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ C113.getwochenTag(start.toString()));
      C113.wochentag[i] = C113.getwochenTag(start.toString());
      console.log('start Uhrzeit: '+ C113.getUhrZeit(start.toString()));
      C113.uhrzeit[i] = C113.getUhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(C113);

    //Raum C213:
    let C213 = new RaumModel("C213");
    var ics = C213.getICS(window.localStorage.getItem("C213"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      C213.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ C213.getwochenTag(start.toString()));
      C213.wochentag[i] = C213.getwochenTag(start.toString());
      console.log('start Uhrzeit: '+ C213.getUhrZeit(start.toString()));
      C213.uhrzeit[i] = C213.getUhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(C213);

    //Raum C237:
    let C237 = new RaumModel("C237");
    var ics = C237.getICS(window.localStorage.getItem("C237"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      C237.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ C237.getwochenTag(start.toString()));
      C237.wochentag[i] = C237.getwochenTag(start.toString());
      console.log('start Uhrzeit: '+ C237.getUhrZeit(start.toString()));
      C237.uhrzeit[i] = C237.getUhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(C237);

    //Raum C305:
    let C305 = new RaumModel("C305");
    var ics =  C305.getICS(window.localStorage.getItem("C305"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      C305.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ C305.getwochenTag(start.toString()));
      C305.wochentag[i] = C305.getwochenTag(start.toString());
      console.log('start Uhrzeit: '+ C305.getUhrZeit(start.toString()));
      C305.uhrzeit[i] = C305.getUhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(C305);

    //Raum C313:
    let C313 = new RaumModel("C313");
    var ics = C313.getICS(window.localStorage.getItem("C313"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      C313.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ C313.getwochenTag(start.toString()));
      C313.wochentag[i] = C313.getwochenTag(start.toString());
      console.log('start Uhrzeit: '+ C313.getUhrZeit(start.toString()));
      C313.uhrzeit[i] = C313.getUhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(C313);

    //Raum C361:
    let C361 = new RaumModel("C361");
    var ics = C361.getICS(window.localStorage.getItem("C361"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      C361.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ C361.getwochenTag(start.toString()));
      C361.wochentag[i] = C361.getwochenTag(start.toString());
      console.log('start Uhrzeit: '+ C361.getUhrZeit(start.toString()));
      C361.uhrzeit[i] = C361.getUhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(C361);

    //Raum C375:
    let C375 = new RaumModel("C375");
    var ics = C375.getICS(window.localStorage.getItem("C375"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      C375.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ C375.getwochenTag(start.toString()));
      C375.wochentag[i] = C375.getwochenTag(start.toString());
      console.log('start Uhrzeit: '+ C375.getUhrZeit(start.toString()));
      C375.uhrzeit[i] = C375.getUhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(C375);

    //Raum C377:
    let C377 = new RaumModel("C377");
    var ics = C377.getICS(window.localStorage.getItem("C377"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      C377.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ C377.getwochenTag(start.toString()));
      C377.wochentag[i] = C377.getwochenTag(start.toString());
      console.log('start Uhrzeit: '+ C377.getUhrZeit(start.toString()));
      C377.uhrzeit[i] = C377.getUhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(C377);

    //Raum C405:
    let C405 = new RaumModel("C405");
    var ics = C405.getICS(window.localStorage.getItem("C405"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      C405.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ C405.getwochenTag(start.toString()));
      C405.wochentag[i] = C405.getwochenTag(start.toString());
      console.log('start Uhrzeit: '+ C405.getUhrZeit(start.toString()));
      C405.uhrzeit[i] = C405.getUhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(C405);

    //Raum C407:
    let C407 = new RaumModel("C407");
    var ics = C407.getICS(window.localStorage.getItem("C407"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      C407.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ C407.getwochenTag(start.toString()));
      C407.wochentag[i] = C407.getwochenTag(start.toString());
      console.log('start Uhrzeit: '+ C407.getUhrZeit(start.toString()));
      C407.uhrzeit[i] = C407.getUhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(C407);

    //Raum C413:
    let C413 = new RaumModel("C413");
    var ics = C413.getICS(window.localStorage.getItem("C413"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      C413.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ C413.getwochenTag(start.toString()));
      C413.wochentag[i] = C413.getwochenTag(start.toString());
      console.log('start Uhrzeit: '+ C413.getUhrZeit(start.toString()));
      C413.uhrzeit[i] = C413.getUhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(C413);
    */

    
  }


  

  BackToCampus(){
    this.navCtrl.setRoot(HomePage);
  }

  search() {
    this.navCtrl.setRoot( Search);
  }

}
