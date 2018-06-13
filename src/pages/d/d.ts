import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Search } from '../search/search'
import { RaumModel } from '../../model/RaumModel';
import ICAL from "ical.js";


function getWochentag(){
  var jetzt = new Date();
  switch(jetzt.getDay()){
    case 1: return "Montag";
    case 2: return "Dienstag";
    case 3: return "Mittwoch";
    case 4: return "Donnerstag";
    case 5: return "Freitag";
    case 6: return "Samstag";
    case 0: return "Sonntag";
  }
}

function getUhrzeit(){
  
}

function getICS(text:string) {
	text.trim();
	//console.log("text.split(\\r\\n): "+text.split("\\r\\n"));
	return text.split("\\r\\n");
}

function wochenTag(text:string) {
  var datum = text.split("T");
  datum.pop();
  datum = datum[0].split("-");
  var datum2 = new Date(datum[0],datum[1]-1,datum[2]);
  var tag = datum2.getDay();
  var wochentag = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  return wochentag[tag];
}

function uhrZeit(text:string) {
  var datum = text.split("T");
  var tmp = datum[1];
  return tmp;
}

/**
 * Generated class for the DPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

    //Raum D01:
    let D01 = new RaumModel("D01");
    var ics = getICS(window.localStorage.getItem("D01"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      D01.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ wochenTag(start.toString()));
      D01.wochentag[i] = wochenTag(start.toString());
      console.log('start Uhrzeit: '+ uhrZeit(start.toString()));
      D01.uhrzeit[i] = uhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(D01);

    //Raum D02:
    let D02 = new RaumModel("D02");
    var ics = getICS(window.localStorage.getItem("D02"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      D02.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ wochenTag(start.toString()));
      D02.wochentag[i] = wochenTag(start.toString());
      console.log('start Uhrzeit: '+ uhrZeit(start.toString()));
      D02.uhrzeit[i] = uhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(D02);

    //Raum D11:
    let D11 = new RaumModel("D11");
    var ics = getICS(window.localStorage.getItem("D11"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      D11.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ wochenTag(start.toString()));
      D11.wochentag[i] = wochenTag(start.toString());
      console.log('start Uhrzeit: '+ uhrZeit(start.toString()));
      D11.uhrzeit[i] = uhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(D11);

    //Raum D12:
    let D12 = new RaumModel("D12");
    var ics = getICS(window.localStorage.getItem("D12"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      D12.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ wochenTag(start.toString()));
      D12.wochentag[i] = wochenTag(start.toString());
      console.log('start Uhrzeit: '+ uhrZeit(start.toString()));
      D12.uhrzeit[i] = uhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(D12);

    //Raum D01:
    let D13 = new RaumModel("D13");
    var ics = getICS(window.localStorage.getItem("D13"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      D13.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ wochenTag(start.toString()));
      D13.wochentag[i] = wochenTag(start.toString());
      console.log('start Uhrzeit: '+ uhrZeit(start.toString()));
      D13.uhrzeit[i] = uhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(D13);

    //Raum D14:
    let D14 = new RaumModel("D14");
    var ics = getICS(window.localStorage.getItem("D14"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      D14.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ wochenTag(start.toString()));
      D14.wochentag[i] = wochenTag(start.toString());
      console.log('start Uhrzeit: '+ uhrZeit(start.toString()));
      D14.uhrzeit[i] = uhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(D14);

    //Raum D15:
    let D15 = new RaumModel("D15");
    var ics = getICS(window.localStorage.getItem("D15"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      D15.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ wochenTag(start.toString()));
      D15.wochentag[i] = wochenTag(start.toString());
      console.log('start Uhrzeit: '+ uhrZeit(start.toString()));
      D15.uhrzeit[i] = uhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(D15);

    //Raum D17:
    let D17 = new RaumModel("D17");
    var ics = getICS(window.localStorage.getItem("D17"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      D17.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ wochenTag(start.toString()));
      D17.wochentag[i] = wochenTag(start.toString());
      console.log('start Uhrzeit: '+ uhrZeit(start.toString()));
      D17.uhrzeit[i] = uhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(D17);

    //Raum D18:
    let D18 = new RaumModel("D18");
    var ics = getICS(window.localStorage.getItem("D18"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      D18.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ wochenTag(start.toString()));
      D18.wochentag[i] = wochenTag(start.toString());
      console.log('start Uhrzeit: '+ uhrZeit(start.toString()));
      D18.uhrzeit[i] = uhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(D18);
  }

  BackToCampus(){
    this.navCtrl.setRoot(HomePage);
  }

  search() {
    this.navCtrl.setRoot( Search);
  }

}
