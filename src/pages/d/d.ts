import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Search } from '../search/search'
import { RaumModel } from '../../model/RaumModel';
import ICAL from "ical.js";


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
  selector: 'page-d',
  templateUrl: 'd.html',
})
export class Dgebaude {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DPage');
    /*
    //Raum D01:
    let D01 = new RaumModel("D01");
    var ics = D01.getICS(window.localStorage.getItem("D01"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      D01.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ D01.getwochenTag(start.toString()));
      D01.wochentag[i] = D01.getwochenTag(start.toString());
      console.log('start Uhrzeit: '+ D01.getUhrZeit(start.toString()));
      D01.uhrzeit[i] = D01.getUhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(D01);

    //Raum D02:
    let D02 = new RaumModel("D02");
    var ics = D02.getICS(window.localStorage.getItem("D02"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      D02.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ D02.getwochenTag(start.toString()));
      D02.wochentag[i] = D02.getwochenTag(start.toString());
      console.log('start Uhrzeit: '+ D02.getUhrZeit(start.toString()));
      D02.uhrzeit[i] = D02.getUhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(D02);

    //Raum D11:
    let D11 = new RaumModel("D11");
    var ics = D11.getICS(window.localStorage.getItem("D11"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      D11.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ D11.getwochenTag(start.toString()));
      D11.wochentag[i] = D11.getwochenTag(start.toString());
      console.log('start Uhrzeit: '+ D11.getUhrZeit(start.toString()));
      D11.uhrzeit[i] = D11.getUhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(D11);

    //Raum D12:
    let D12 = new RaumModel("D12");
    var ics = D12.getICS(window.localStorage.getItem("D12"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      D12.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ D12.getwochenTag(start.toString()));
      D12.wochentag[i] = D12.getwochenTag(start.toString());
      console.log('start Uhrzeit: '+ D12.getUhrZeit(start.toString()));
      D12.uhrzeit[i] = D12.getUhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(D12);

    //Raum D01:
    let D13 = new RaumModel("D13");
    var ics = D13.getICS(window.localStorage.getItem("D13"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      D13.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ D13.getwochenTag(start.toString()));
      D13.wochentag[i] = D13.getwochenTag(start.toString());
      console.log('start Uhrzeit: '+ D13.getUhrZeit(start.toString()));
      D13.uhrzeit[i] = D13.getUhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(D13);

    //Raum D14:
    let D14 = new RaumModel("D14");
    var ics = D14.getICS(window.localStorage.getItem("D14"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      D14.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ D14.getwochenTag(start.toString()));
      D14.wochentag[i] = D14.getwochenTag(start.toString());
      console.log('start Uhrzeit: '+ D14.getUhrZeit(start.toString()));
      D14.uhrzeit[i] = D14.getUhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(D14);

    //Raum D15:
    let D15 = new RaumModel("D15");
    var ics = D15.getICS(window.localStorage.getItem("D15"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      D15.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ D15.getwochenTag(start.toString()));
      D15.wochentag[i] = D15.getwochenTag(start.toString());
      console.log('start Uhrzeit: '+ D15.getUhrZeit(start.toString()));
      D15.uhrzeit[i] = D15.getUhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(D15);

    //Raum D17:
    let D17 = new RaumModel("D17");
    var ics = D17.getICS(window.localStorage.getItem("D17"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      D17.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ D17.getwochenTag(start.toString()));
      D17.wochentag[i] = D17.getwochenTag(start.toString());
      console.log('start Uhrzeit: '+ D17.getUhrZeit(start.toString()));
      D17.uhrzeit[i] = D17.getUhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(D17);

    //Raum D18:
    let D18 = new RaumModel("D18");
    var ics = D18.getICS(window.localStorage.getItem("D18"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      D18.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ D18.getwochenTag(start.toString()));
      D18.wochentag[i] = D18.getwochenTag(start.toString());
      console.log('start Uhrzeit: '+ D18.getUhrZeit(start.toString()));
      D18.uhrzeit[i] = D18.getUhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(D18);
    console.log(giveUhrzeit(),giveWochentag());

    var GebaudeD : RaumModel[]  = []; 

    GebaudeD[0] = D01;
    GebaudeD[1] = D02;
    console.log(GebaudeD);*/
  }

  BackToCampus(){
    this.navCtrl.setRoot(HomePage);
  }

  search() {
    this.navCtrl.setRoot( Search);
  }

}
