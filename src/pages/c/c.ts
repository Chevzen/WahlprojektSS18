import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Search } from '../search/search';
import { RaumModel } from '../../model/RaumModel';
import ICAL from "ical.js";

function getICS(text:string) {
	text.trim();
	//console.log("text.split(\\r\\n): "+text.split("\\r\\n"));
	return text.split("\\r\\n");
}

function wochenTag(text:string) {
  var datum:any = text.split("T");
  datum.pop();
  datum = datum[0].split("-");
  var datum2:any = new Date(datum[0],datum[1]-1,datum[2]);
  var tag:any = datum2.getDay();
  var wochentag:any = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  return wochentag[tag];
}

function uhrZeit(text:string) {
  var datum:any = text.split("T");
  var tmp:any = datum[1];
  return tmp;
}

/**
 * Generated class for the CPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

    //Raum C001:
    let C001 = new RaumModel("C001");
    var ics = getICS(window.localStorage.getItem("C001"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      C001.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ wochenTag(start.toString()));
			C001.wochentag[i] = wochenTag(start.toString());
      console.log('start Uhrzeit: '+ uhrZeit(start.toString()));
      C001.uhrzeit[i] = uhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(C001);

    //Raum C007:
    let C007 = new RaumModel("C007");
    var ics = getICS(window.localStorage.getItem("C007"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      C007.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ wochenTag(start.toString()));
      C007.wochentag[i] = wochenTag(start.toString());
      console.log('start Uhrzeit: '+ uhrZeit(start.toString()));
      C007.uhrzeit[i] = uhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(C007);

    //Raum C038:
    let C035 = new RaumModel("C035");
    var ics = getICS(window.localStorage.getItem("C035"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      C035.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ wochenTag(start.toString()));
      C035.wochentag[i] = wochenTag(start.toString());
      console.log('start Uhrzeit: '+ uhrZeit(start.toString()));
      C035.uhrzeit[i] = uhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(C035);

    //Raum C037:
    let C037 = new RaumModel("C037");
    var ics = getICS(window.localStorage.getItem("C037"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      C037.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ wochenTag(start.toString()));
      C037.wochentag[i] = wochenTag(start.toString());
      console.log('start Uhrzeit: '+ uhrZeit(start.toString()));
      C037.uhrzeit[i] = uhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(C037);

    //Raum C113:
    let C113 = new RaumModel("C113");
    var ics = getICS(window.localStorage.getItem("C113"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      C113.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ wochenTag(start.toString()));
      C113.wochentag[i] = wochenTag(start.toString());
      console.log('start Uhrzeit: '+ uhrZeit(start.toString()));
      C113.uhrzeit[i] = uhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(C113);

    //Raum C213:
    let C213 = new RaumModel("C213");
    var ics = getICS(window.localStorage.getItem("C213"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      C213.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ wochenTag(start.toString()));
      C213.wochentag[i] = wochenTag(start.toString());
      console.log('start Uhrzeit: '+ uhrZeit(start.toString()));
      C213.uhrzeit[i] = uhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(C213);

    //Raum C237:
    let C237 = new RaumModel("C237");
    var ics = getICS(window.localStorage.getItem("C237"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      C237.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ wochenTag(start.toString()));
      C237.wochentag[i] = wochenTag(start.toString());
      console.log('start Uhrzeit: '+ uhrZeit(start.toString()));
      C237.uhrzeit[i] = uhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(C237);

    //Raum C305:
    let C305 = new RaumModel("C305");
    var ics = getICS(window.localStorage.getItem("C305"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      C305.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ wochenTag(start.toString()));
      C305.wochentag[i] = wochenTag(start.toString());
      console.log('start Uhrzeit: '+ uhrZeit(start.toString()));
      C305.uhrzeit[i] = uhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(C305);

    //Raum C313:
    let C313 = new RaumModel("C313");
    var ics = getICS(window.localStorage.getItem("C313"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      C313.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ wochenTag(start.toString()));
      C313.wochentag[i] = wochenTag(start.toString());
      console.log('start Uhrzeit: '+ uhrZeit(start.toString()));
      C313.uhrzeit[i] = uhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(C313);

    //Raum C361:
    let C361 = new RaumModel("C361");
    var ics = getICS(window.localStorage.getItem("C361"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      C361.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ wochenTag(start.toString()));
      C361.wochentag[i] = wochenTag(start.toString());
      console.log('start Uhrzeit: '+ uhrZeit(start.toString()));
      C361.uhrzeit[i] = uhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(C361);

    //Raum C375:
    let C375 = new RaumModel("C375");
    var ics = getICS(window.localStorage.getItem("C375"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      C375.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ wochenTag(start.toString()));
      C375.wochentag[i] = wochenTag(start.toString());
      console.log('start Uhrzeit: '+ uhrZeit(start.toString()));
      C375.uhrzeit[i] = uhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(C375);

    //Raum C377:
    let C377 = new RaumModel("C377");
    var ics = getICS(window.localStorage.getItem("C377"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      C377.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ wochenTag(start.toString()));
      C377.wochentag[i] = wochenTag(start.toString());
      console.log('start Uhrzeit: '+ uhrZeit(start.toString()));
      C377.uhrzeit[i] = uhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(C377);

    //Raum C405:
    let C405 = new RaumModel("C405");
    var ics = getICS(window.localStorage.getItem("C405"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      C405.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ wochenTag(start.toString()));
      C405.wochentag[i] = wochenTag(start.toString());
      console.log('start Uhrzeit: '+ uhrZeit(start.toString()));
      C405.uhrzeit[i] = uhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(C405);

    //Raum C407:
    let C407 = new RaumModel("C407");
    var ics = getICS(window.localStorage.getItem("C407"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      C407.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ wochenTag(start.toString()));
      C407.wochentag[i] = wochenTag(start.toString());
      console.log('start Uhrzeit: '+ uhrZeit(start.toString()));
      C407.uhrzeit[i] = uhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(C407);

    //Raum C413:
    let C413 = new RaumModel("C413");
    var ics = getICS(window.localStorage.getItem("C413"));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for(var i:number = 0; i < vevent.length; i++){
      var description = vevent[i].getFirstPropertyValue('description');
      console.log('description: ' + description);
      C413.veranstaltung[i] = description;
      var start = vevent[i].getFirstPropertyValue('dtstart');
      console.log('Wochentag: '+ wochenTag(start.toString()));
      C413.wochentag[i] = wochenTag(start.toString());
      console.log('start Uhrzeit: '+ uhrZeit(start.toString()));
      C413.uhrzeit[i] = uhrZeit(start.toString());
      //var ende = vevent[i].getFirstPropertyValue('dtend');
      //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
    }
    console.log(C413);
  }

  BackToCampus(){
    this.navCtrl.setRoot(HomePage);
  }

  search() {
    this.navCtrl.setRoot( Search);
  }

}
