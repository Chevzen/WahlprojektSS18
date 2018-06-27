import { RaumModel } from './RaumModel.1';
import ICAL from "ical.js";
import { Veranstaltung } from './Veranstaltung';
import { GebaudeModel } from './GebaudeModel';
import { CampusModel } from './CampusModel';


export class Darstellung {
  /********************************************************************************************
  *                                                                                           *
  *   Enthält alle Gebäude und Räume in den Gebäuden                                          *
  *                                                                                           *
  ********************************************************************************************/
  CampusConfig = [

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

  /********************************************************************************************
  *                                                                                           *
  *   GebaudeAuswahl -> Nummer des Gebäudes (0 -> C-Gebäude, 1 -> D-Gebäude)                  *
  *   freeRooms -> Array, in den freie Räume mit Uhrzeit geschrieben werden                   *
  *   zugang -> Array, in den alle Räume mit Zugangsbeschränkung geschrieben werden           *
  *                                                                                           *
  ********************************************************************************************/
  GebaudeAuswahl:number;
  freeRooms:string[] = [];
  zugang:string[] = [];

  /********************************************************************************************
  *                                                                                           *
  *   Funktion setzt das Gebäude.                                                             *
  *                                                                                           *
  *   wahl -> Nummer des Gebäude (0 -> C-Gebäude, 1 -> D-Gebäude)                             *
  *                                                                                           *
  ********************************************************************************************/
  constructor(wahl:number){
    this.GebaudeAuswahl = wahl;
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion ermittelt anhand eines Datums den dazugehörigen Wochentag.                     *
  *                                                                                           *
  *   text -> Datum                                                                           *
  *                                                                                           *
  ********************************************************************************************/
  parseDateToWochentag(text:string) {
    var datum:any = text.split("T");
    datum.pop();
    datum = datum[0].split("-");
    var datum2:any = new Date(datum[0],datum[1]-1,datum[2]);
    var tag:any = datum2.getDay();
    var wochentag:any = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    return wochentag[tag];
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion parst die Uhrzeit aus dem Raumplan in das Format HH:MM:SS.                     *
  *                                                                                           *
  *   text -> Uhrzeit, die geparst werden soll                                                *
  *                                                                                           *
  ********************************************************************************************/
  parseUhrZeit(text:string) {
    var datum:any = text.split("T");
    var tmp:any = datum[1];
    return tmp;
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion fügt in die Gebäude einen Raum hinzu                                           *
  *                                                                                           *
  *   raumnamen -> Array mit Namen der Räume                                                  *
  *   name -> Name des Gebäudes                                                               *
  *                                                                                           *
  ********************************************************************************************/
  parseGebaude(raumnamen:string[], name:string){
    var gebaude = new GebaudeModel(name);
    console.log("parseGebaude");
    //console.log(name);
    raumnamen.forEach(raumname=> {
      var raum = this.parseToRaum(raumname);
      //console.log(raumname);
      gebaude.addRaum(raum);

    });
    return gebaude;
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion parst die Raumpläne und legt Veranstaltungen an.                               *
  *                                                                                           *
  *   raumname -> Name des Raums für den der Raumplan ermittelt werden soll                   *
  *                                                                                           *
  ********************************************************************************************/
  parseToRaum(raumname: string){
    var raum = new RaumModel(raumname);
    console.log("parseToRaum");
    console.log(raumname);
    var ics = raum.getICS(localStorage.getItem(raumname));
    ics.pop();

    var jcalData = ICAL.parse(ics.join("\r\n"));
    var vcalendar = new ICAL.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');

    for(var i:number = 0; i < vevent.length; i++){
      var start = vevent[i].getFirstPropertyValue('dtstart');
      var end = vevent[i].getFirstPropertyValue('dtend');
      var startZeit = this.parseUhrZeit(start.toString());
      var endZeit = this.parseUhrZeit(end.toString());
      var name = vevent[i].getFirstPropertyValue('description');
      var wochentag = this.parseDateToWochentag(start.toString());
      //console.log("start:"+ startZeit, "name" + name, "Wochentag " +wochentag, "end:"+ endZeit);
      var veranstaltung = new Veranstaltung(name, wochentag, startZeit, endZeit);
      raum.addVeranstaltung(veranstaltung);

      switch(startZeit){

        case "08:15:00":
        if (endZeit == "11:30:00") {
          console.log("hallo case 8 -11.30");
          var veranstaltung1 = new Veranstaltung(name, wochentag, "10:00:00", endZeit);
          raum.addVeranstaltung(veranstaltung1);
        }
        else if (endZeit == "13:15:00"){
          console.log("hallo case 8 -13");
          var veranstaltung2 = new Veranstaltung(name, wochentag, "10:00:00", endZeit);
          raum.addVeranstaltung(veranstaltung2);
          var veranstaltung3 = new Veranstaltung(name, wochentag, "11:45:00", endZeit);
          raum.addVeranstaltung(veranstaltung3);
        }
        break;

        case "10:00:00":
        if (endZeit == "13:15:00") {
          console.log("hallo case 10 -13.15");
          var veranstaltung4 = new Veranstaltung(name, wochentag, "11:45:00", endZeit);
          raum.addVeranstaltung(veranstaltung4);
        }
        else if (endZeit == "15:45:00") {
          console.log("hallo case 10 -15.45");
          var veranstaltung5 = new Veranstaltung(name, wochentag, "11:45:00", endZeit);
          raum.addVeranstaltung(veranstaltung5);
          var veranstaltung6 = new Veranstaltung(name, wochentag, "14:15:00", endZeit);
          raum.addVeranstaltung(veranstaltung6);
        }
        break;

        case "11:45:00":
        if (endZeit == "15:45:00") {
          console.log("hallo case 11.45-15.45");
          var veranstaltung7 = new Veranstaltung(name, wochentag, "14:15:00", endZeit);
          raum.addVeranstaltung(veranstaltung7);
        }
        else if (endZeit == "17:30:00") {
          console.log("hallo case 11.45-17.35");
          var veranstaltung8 = new Veranstaltung(name, wochentag, "14:15:00", endZeit);
          raum.addVeranstaltung(veranstaltung8);
          var veranstaltung9 = new Veranstaltung(name, wochentag, "16:00:00", endZeit);
          raum.addVeranstaltung(veranstaltung9);
        }
        break;

        case "14:15:00":
        if (endZeit == "17:30:00") {
          console.log("hallo case 14.15-17.30");
          var veranstaltung10 = new Veranstaltung(name, wochentag, "16:00:00", endZeit);
          raum.addVeranstaltung(veranstaltung10);
        }
        else if (endZeit == "19:15:00"){
          console.log("hallo case 14.15-19.15");
          var veranstaltung11 = new Veranstaltung(name, wochentag, "16:00:00", endZeit);
          raum.addVeranstaltung(veranstaltung11);
          var veranstaltung12 = new Veranstaltung(name, wochentag, "17:45:00", endZeit);
          raum.addVeranstaltung(veranstaltung12);
        }
        break;

        case "16:00:00":
        if (endZeit == "19:15:00") {
          console.log("hallo case 16.00-19.15");
          var veranstaltung13 = new Veranstaltung(name, wochentag, "17:45:00", endZeit);
          raum.addVeranstaltung(veranstaltung13);
        }
        else if (endZeit == "21:00:00"){
          console.log("hallo case 16.00-21.00");
          var veranstaltung14 = new Veranstaltung(name, wochentag, "17:45:00", endZeit);
          raum.addVeranstaltung(veranstaltung14);
          var veranstaltung15 = new Veranstaltung(name, wochentag, "19:30:00", endZeit);
          raum.addVeranstaltung(veranstaltung15);
        }
        break;

        case "17:45:00":
        if (endZeit == "21:00:00") {
          var veranstaltung16 = new Veranstaltung(name, wochentag, "19:30:00", endZeit);
          raum.addVeranstaltung(veranstaltung16);
        }
        default:
      }
    }
    return raum;
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion erstellt den Campus und füllt den Array freeRooms mit den freien Räumen.       *
  *                                                                                           *
  ********************************************************************************************/
  parseToCampus(){
    var campus = new CampusModel("HSRM");
    //console.log(this.CampusConfig)
    for(let gebaudeConfig of this.CampusConfig){
      var gebaude = this.parseGebaude(gebaudeConfig.raumnamen, gebaudeConfig.gebaudename)
      campus.addGebaude(gebaude);
      //console.log(this.CampusConfig);
    }
    for(var i: number = 0; i < campus.gebaude[this.GebaudeAuswahl].getFreeRooms().length; i++){
      this.freeRooms.push(campus.gebaude[this.GebaudeAuswahl].getFreeRooms()[i]);
    }
    for(var j:number = 0;j<campus.gebaude[this.GebaudeAuswahl].zugangsberechtigung.length;j++){//zugang1.length;i++){
      this.zugang.push(campus.gebaude[this.GebaudeAuswahl].zugangsberechtigung[j]);
    }

    //console.log("test"+campus.gebaude[0].getFreeRooms()[0]);
    return campus;
  }

   

  /********************************************************************************************
  *                                                                                           *
  *   Funktion entfernt die Sekunden in der Uhrzeit                                           *
  *                                                                                           *
  *   zeit -> Uhrzeit, die bearbeitet werden soll                                             *
  *                                                                                           *
  ********************************************************************************************/
  changeZeit(zeit:string){
    switch(zeit){
      case "08:15:00": return "08:15";
      case "09:45:00": return "09:45";
      case "10:00:00": return "10:00";
      case "11:30:00": return "11:30";
      case "11:45:00": return "11:45";
      case "13:15:00": return "13:15";
      case "14:15:00": return "14:15";
      case "15:45:00": return "15:45";
      case "16:00:00": return "16:00";
      case "17:30:00": return "17:30";
      case "17:45:00": return "17:45";
      case "19:15:00": return "19:15";
      case "19:30:00": return "19:30";
      case "21:00:00": return "21:00";
    }
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion erstellt ein HTML-Element.                                                     *
  *                                                                                           *
  *   text -> Text der in das HTML-Element gefüllt werden soll.                               *
  *   tag -> Tag des HTML-Elements                                                            *
  *                                                                                           *
  ********************************************************************************************/
  erstelleElement(text:string, tag:string){
    var element: HTMLElement = document.createElement(tag);
    //var text2:HTMLElement;
    var texte:string[] = text.split(",");

    for(var i:number = 0;i<texte.length;i++){
      var breaks:HTMLElement = document.createElement("div");
      var text2  = document.createTextNode(texte[i]);
      breaks.appendChild(text2);
      element.appendChild(breaks);
    }
    if(texte.length>1){
      element.style.borderRadius = "6px";
      element.style.width = "100%";
      element.style.padding = "3px";
    }
    return element;
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion erstellt eine optische Darstellung                                             *
  *   der in getLehrveranstaltungen() ermittelten                                             *
  *   Lehrveranstaltungen für einen Raum                                                      *
  *                                                                                           *
  *   lehrveranstaltungen -> ein Array mit den Lehrveranstaltungen, Uhrzeiten und Wochentagen *
  *   raumname -> Name des Raums für den der Raumplan dargestellt werden soll                 *
  *                                                                                           *
  *   Aufbau des DOM-Trees:                                                                   *
  *   <show2> //in c.ts bzw. d.ts                                                             *
  *     <inhalt>                              #                                               *
  *       <ueberschrift>                        #                                             *
  *       ...Kann mehrere Ueberschriften         # werden in dieser Funktion erstellt         *
  *       <veranstaltung>                        # und dann zurückgegeben                     *
  *       ...und Veranstaltungen enthalten      #                                             *
  *     </inhalt>                             #                                               *
  *   </show2>                                                                                *
  *                                                                                           *
  ********************************************************************************************/
  zeigeLehrveranstaltungen(lehrveranstaltungen:string[], raumname:string){
    /*var show: HTMLElement = document.getElementById('Lehraussen');
    show.style.display = "block";
    var notShow: HTMLElement = document.getElementById('anzeige');
    notShow.style.display = "none";*/
    var inhalt: HTMLElement = document.createElement("div");
    var ueberschrift: HTMLElement = this.erstelleElement(raumname,"h3");
    inhalt.appendChild(ueberschrift);
    //var breaks:HTMLElement = document.createElement("br");
    //inhalt.innerHTML = "<h3>"+raumname+"</h3>";

    var veranstaltung: HTMLElement;
    var lehrvtmp:string = "";
    if(lehrveranstaltungen.length == 0){
      veranstaltung = this.erstelleElement("In diesem Raum finden keine Veranstaltungen statt.,Studentischer Arbeitsraum.", "p");
      veranstaltung.style.backgroundColor = "rgba(140, 140, 140, 0.3)";
      veranstaltung.style.border = "2px solid rgb(140, 140, 140)";
      inhalt.appendChild(veranstaltung);
      return inhalt;
    }
    for(var j:number = 0;j < lehrveranstaltungen.length;j++){
      switch(lehrveranstaltungen[j]){
        case "Montag":
          ueberschrift = this.erstelleElement("Montag", "h5");
          inhalt.appendChild(ueberschrift);continue;//inhalt.innerHTML += "<h5>Montag</h5>";continue;
        case "Dienstag":
          ueberschrift = this.erstelleElement("Dienstag", "h5");
          inhalt.appendChild(ueberschrift);continue;//inhalt.innerHTML += "<h5>Dienstag</h5>";continue;
        case "Mittwoch":
          ueberschrift = this.erstelleElement("Mittwoch", "h5");
          inhalt.appendChild(ueberschrift);continue;//inhalt.innerHTML += "<h5>Mittwoch</h5>";continue;
        case "Donnerstag":
          ueberschrift = this.erstelleElement("Donnerstag", "h5");
          inhalt.appendChild(ueberschrift);continue;//inhalt.innerHTML += "<h5>Donnerstag</h5>";continue;
        case "Freitag":
          ueberschrift = this.erstelleElement("Freitag", "h5");
          inhalt.appendChild(ueberschrift);continue;//inhalt.innerHTML += "<h5>Freitag</h5>";continue;
        case "Samstag":
          ueberschrift = this.erstelleElement("Samstag", "h5");
          inhalt.appendChild(ueberschrift);continue;//inhalt.innerHTML += "<h5>Samstag</h5>";continue;
        case "Sonntag":
          ueberschrift = this.erstelleElement("Sonntag", "h5");
          inhalt.appendChild(ueberschrift);continue;//inhalt.innerHTML += "<h5>Sonntag</h5>";continue;
      }
      if(lehrveranstaltungen[j] != lehrvtmp){
        console.log(lehrveranstaltungen[j]);
        console.log(lehrveranstaltungen[j+1]);
        //Ermitteln welcher Veranstaltungstyp es ist:
        var vl = lehrveranstaltungen[j].indexOf("Vorlesung");
        var se = lehrveranstaltungen[j].indexOf("Seminar");
        var pr = lehrveranstaltungen[j].indexOf("Praktikum");
        var ue = lehrveranstaltungen[j].indexOf("Übung");

        if(vl != -1){
          //Vorlesung erstellen:
          veranstaltung = this.erstelleElement(""+lehrveranstaltungen[j]+","+lehrveranstaltungen[j+1],"p");
          veranstaltung.style.backgroundColor = "rgba(74, 106, 255, 0.5)";
          veranstaltung.style.border = "2px solid rgb(74, 106, 255)";
          inhalt.appendChild(veranstaltung);
          //console.log("HALLO");inhalt.innerHTML += "<span style='background-color: rgb(66, 134, 244); border-radius: 3px;'>";
        }else if(se != -1){
          //Seminar erstellen:
          veranstaltung = this.erstelleElement(""+lehrveranstaltungen[j]+","+lehrveranstaltungen[j+1],"p");
          veranstaltung.style.backgroundColor = "rgba(26, 123, 81, 0.5)";
          veranstaltung.style.border = "2px solid rgb(26, 123, 81)";
          inhalt.appendChild(veranstaltung);
          //inhalt.innerHTML += "<span style='background-color: rgb(111, 160, 36); border-radius: 3px; width: 100%;'>";
        }else if(pr != -1){
          //Praktikum erstellen:
          veranstaltung = this.erstelleElement(""+lehrveranstaltungen[j]+","+lehrveranstaltungen[j+1],"p");
          veranstaltung.style.backgroundColor = "rgba(255, 146, 63, 0.5)";
          veranstaltung.style.border = "2px solid rgb(255, 146, 63)";
          inhalt.appendChild(veranstaltung);
          //inhalt.innerHTML += "<span style='background-color: rgb(244, 65, 65); border-radius: 3px; width: 100%;'>";
        }else if(ue != -1){
          //Uebung erstellen:
          veranstaltung = this.erstelleElement(""+lehrveranstaltungen[j]+","+lehrveranstaltungen[j+1],"p");
          veranstaltung.style.backgroundColor = "rgba(44, 250, 40, 0.4)";
          veranstaltung.style.border = "2px solid rgb(44, 250, 40)";
          inhalt.appendChild(veranstaltung);
          //inhalt.innerHTML += "<span style='background-color: rgb(65, 196, 244); border-radius: 3px; width: 100%;'>";
        }else {
          //Sonstige Veranstaltung erstellen:
          veranstaltung = this.erstelleElement(""+lehrveranstaltungen[j]+","+lehrveranstaltungen[j+1],"p");
          veranstaltung.style.backgroundColor = "rgba(140, 140, 140, 0.3)";
          veranstaltung.style.border = "2px solid rgb(140, 140, 140)";
          inhalt.appendChild(veranstaltung);
          //inhalt.innerHTML += "<span style='background-color: rgb(65, 196, 244); border-radius: 3px; width: 100%;'>";
        }
        lehrvtmp = lehrveranstaltungen[j+1];
        //inhalt.appendChild(breaks);
        //inhalt.innerHTML += ""+lehrveranstaltungen[j]+"<br>";
      }
    }
    /*console.log("INNERHTML :"+inhalt.outerHTML.toString());
    var inhaltString:string = inhalt.outerHTML.toString();
    console.log(inhaltString);
    return inhaltString.toString();*/
    return inhalt;
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion ermittelt Lehrveranstaltungen für einen Raum                                   *
  *                                                                                           *
  *   raumname -> Name des Raums für den der Raumplan ermittelt werden soll                   *
  *                                                                                           *
  ********************************************************************************************/
  getLehrveranstaltungen(raumname:string){
    var LehrveranstaltungoffreeRooms:string[] = [];
    var Wochentag:string = "";
    var uhrzeit:string;
    var uhrzeittmp:string = "";
    var name:string;
    var enduhrzeit:string;
    var enduhrzeittmp:string = "";

    for(var i:number = 0; i< this.parseToRaum(raumname).veranstaltungen.length; i++){
      name = this.parseToRaum(raumname).veranstaltungen[i].name;
      console.log(name);

      if(this.parseToRaum(raumname).veranstaltungen[i].wochentag != Wochentag){
        Wochentag = this.parseToRaum(raumname).veranstaltungen[i].wochentag;
        LehrveranstaltungoffreeRooms.push(Wochentag);
        enduhrzeittmp = "";
        uhrzeittmp = "";
      }

      uhrzeit = this.changeZeit(this.parseToRaum(raumname).veranstaltungen[i].uhrzeit);
      enduhrzeit = this.changeZeit(this.parseToRaum(raumname).veranstaltungen[i].enduhrzeit);
      if(uhrzeit != uhrzeittmp && enduhrzeit != enduhrzeittmp){
        name = name.replace("\\","");
        name = name.replace(",","");
        LehrveranstaltungoffreeRooms.push(name);
        if(uhrzeit === undefined){
          LehrveranstaltungoffreeRooms.push("Keine Uhrzeit vorhanden!");
        }else {
          LehrveranstaltungoffreeRooms.push(uhrzeit+" bis "+enduhrzeit);
        }
        uhrzeittmp = uhrzeit;
        enduhrzeittmp = enduhrzeit;
      }
    }
    return this.zeigeLehrveranstaltungen(LehrveranstaltungoffreeRooms, raumname);
  }
}
