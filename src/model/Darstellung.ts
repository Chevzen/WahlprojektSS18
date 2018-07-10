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
  *   Konstruktor setzt das Gebäude.                                                             *
  *                                                                                           *
  *   wahl -> Nummer des Gebäude (0 -> C-Gebäude, 1 -> D-Gebäude)                             *
  *                                                                                           *
  ********************************************************************************************/
  constructor(wahl:number){
    this.GebaudeAuswahl = wahl;
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion gibt den aktuellen Wochentag zurück                                            *
  *                                                                                           *
  *   RETURN-Wert: Der aktuelle Wochentag als String                                          *
  *                                                                                           *
  ********************************************************************************************/
  giveWochentag(){
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

  /********************************************************************************************
  *                                                                                           *
  *   Funktion parst ein Datum aus dem Raumplan (Format: HH:MM:SSTJahr-Monat-Tag)             *
  *   und ermittelt dessen Wochentag.                                                         *
  *                                                                                           *
  *   text -> Datum                                                                           *
  *                                                                                           *
  *   RETURN-Wert: Der Wochentag eines Datums                                                 *
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
  *   Funktion parst ein Datum aus dem Raumplan (Format: HH:MM:SSTJahr-Monat-Tag)             *
  *   und ermittelt dessen Uhrzeit.                                                           *
  *                                                                                           *
  *   text -> Uhrzeit, die geparst werden soll                                                *
  *                                                                                           *
  *   RETURN-Wert: Die Uhrzeit eines Datums                                                   *
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
  *   RETURN-Wert: Das erstellte Gebäude                                                      *
  *                                                                                           *
  ********************************************************************************************/
  parseGebaude(raumnamen:string[], name:string){
    var gebaude = new GebaudeModel(name);
    raumnamen.forEach(raumname=> {
      var raum = this.parseToRaum(raumname);
      gebaude.addRaum(raum);

    });
    return gebaude;
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion parst die Raumpläne und fügt Veranstaltungen einem Raum hinzu.                 *
  *                                                                                           *
  *   raumname -> Name des Raums für den der Raumplan ermittelt werden soll                   *
  *                                                                                           *
  *   RETURN-Wert: Der erstellte Raum                                                         *
  *                                                                                           *
  ********************************************************************************************/
  parseToRaum(raumname: string){
    var raum = new RaumModel(raumname);
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

      this.neueVeranstaltung(name, wochentag, startZeit, endZeit, raum);

      this.laengereVeranstaltungen(name, wochentag, startZeit, endZeit, raum);
    }
    return raum;
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion erstellt eine neue Veranstaltung.                                              *
  *                                                                                           *
  *   name -> Name der Veranstaltung                                                          *
  *   wochentag -> Wochtag der Veranstaltung                                                  *
  *   startZeit -> Beginn der Veranstaltung                                                   *
  *   endZeit -> Ende der Veranstaltung                                                       *
  *   raum -> Raum, zu dem die Veranstaltung hinzugefügt werden soll                          *
  *                                                                                           *
  ********************************************************************************************/
  neueVeranstaltung(name:string, wochentag:string, startZeit:string, endZeit:string, raum:RaumModel){
    var veranstaltung = new Veranstaltung(name, wochentag, startZeit, endZeit);
    raum.addVeranstaltung(veranstaltung);
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion erstellt eine neue Veranstaltung.                                              *
  *                                                                                           *
  *   name -> Name der Veranstaltung                                                          *
  *   wochentag -> Wochtag der Veranstaltung                                                  *
  *   startZeit -> Beginn der Veranstaltung                                                   *
  *   endZeit -> Ende der Veranstaltung                                                       *
  *   raum -> Raum, in der die Veranstaltung stattfindet                                      *
  *                                                                                           *
  ********************************************************************************************/
  laengereVeranstaltungen(name:string, wochentag:string, startZeit:string, endZeit:string, raum:RaumModel){
    switch(startZeit){
      case "08:15:00":
      if(endZeit == "11:30:00") {
        this.neueVeranstaltung(name, wochentag, "10:00:00", endZeit, raum);
      }else if(endZeit == "13:15:00"){
        this.neueVeranstaltung(name, wochentag, "10:00:00", endZeit, raum);
        this.neueVeranstaltung(name, wochentag, "11:45:00", endZeit, raum);
      }break;

      case "10:00:00":
      if(endZeit == "13:15:00") {
        this.neueVeranstaltung(name, wochentag, "11:45:00", endZeit, raum);
      }else if(endZeit == "15:45:00") {
        this.neueVeranstaltung(name, wochentag, "11:45:00", endZeit, raum);
        this.neueVeranstaltung(name, wochentag, "14:15:00", endZeit, raum);
      }break;

      case "11:45:00":
      if(endZeit == "15:45:00") {
        this.neueVeranstaltung(name, wochentag, "14:15:00", endZeit, raum);
      }else if(endZeit == "17:30:00") {
        this.neueVeranstaltung(name, wochentag, "14:15:00", endZeit, raum);
        this.neueVeranstaltung(name, wochentag, "16:00:00", endZeit, raum);
      }break;

      case "14:15:00":
      if(endZeit == "17:30:00") {
        this.neueVeranstaltung(name, wochentag, "16:00:00", endZeit, raum);
      }else if(endZeit == "19:15:00"){
        this.neueVeranstaltung(name, wochentag, "16:00:00", endZeit, raum);
        this.neueVeranstaltung(name, wochentag, "17:45:00", endZeit, raum);
      }break;

      case "16:00:00":
      if(endZeit == "19:15:00") {
        this.neueVeranstaltung(name, wochentag, "17:45:00", endZeit, raum);
      }else if(endZeit == "21:00:00"){
        this.neueVeranstaltung(name, wochentag, "17:45:00", endZeit, raum);
        this.neueVeranstaltung(name, wochentag, "19:30:00", endZeit, raum);
      }break;

      case "17:45:00":
      if(endZeit == "21:00:00") {
        this.neueVeranstaltung(name, wochentag, "19:30:00", endZeit, raum);
      }
    }
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion erstellt den Campus und füllt den Array freeRooms mit den freien Räumen.       *
  *                                                                                           *
  *   RETURN-Wert: Der erstellte Campus                                                       *
  *                                                                                           *
  ********************************************************************************************/
  parseToCampus(){
    var campus = new CampusModel("HSRM");
    for(let gebaudeConfig of this.CampusConfig){
      var gebaude = this.parseGebaude(gebaudeConfig.raumnamen, gebaudeConfig.gebaudename)
      campus.addGebaude(gebaude);
    }
    for(var i: number = 0; i < campus.gebaude[this.GebaudeAuswahl].getFreeRooms().length; i++){
      this.freeRooms.push(campus.gebaude[this.GebaudeAuswahl].getFreeRooms()[i]);
    }
    for(var j:number = 0;j<campus.gebaude[this.GebaudeAuswahl].zugangsberechtigung.length;j++){
      this.zugang.push(campus.gebaude[this.GebaudeAuswahl].zugangsberechtigung[j]);
    }
    return campus;
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion entfernt die Sekunden in der Uhrzeit                                           *
  *                                                                                           *
  *   zeit -> Uhrzeit, die bearbeitet werden soll                                             *
  *                                                                                           *
  *   RETURN-Wert: Die geänderte Uhrzeit                                                      *
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
  *   RETURN-Wert: Das erstellte HTML-Element                                                 *
  *                                                                                           *
  ********************************************************************************************/
  erstelleElement(text:string, tag:string){
    var element: HTMLElement = document.createElement(tag);
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
  *   <show2> //in page.ts                                                                    *
  *     <inhalt>                              #                                               *
  *       <ueberschrift>                        #                                             *
  *       ...Kann mehrere Ueberschriften         # werden in dieser Funktion erstellt         *
  *       <veranstaltung>                        # und dann zurückgegeben                     *
  *       ...und Veranstaltungen enthalten      #                                             *
  *     </inhalt>                             #                                               *
  *   </show2>                                                                                *
  *                                                                                           *
  *   RETURN-Wert: Der erstellte Raumplan                                                     *
  *                                                                                           *
  ********************************************************************************************/
  zeigeLehrveranstaltungen(lehrveranstaltungen:string[], raumname:string){
    var inhalt: HTMLElement = document.createElement("div");
    var ueberschrift: HTMLElement = this.erstelleElement(raumname,"h3");
    inhalt.appendChild(ueberschrift);

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
      //Wenn im Array ein Wochentag steht, dann wird eine Wochentagsüberschrift erstellt:
      switch(lehrveranstaltungen[j]){
        case "Montag":
          this.erstelleUeberschrift("Montag", inhalt);continue;
        case "Dienstag":
          this.erstelleUeberschrift("Dienstag", inhalt);continue;
        case "Mittwoch":
          this.erstelleUeberschrift("Mittwoch", inhalt);continue;
        case "Donnerstag":
          this.erstelleUeberschrift("Donnerstag", inhalt);continue;
        case "Freitag":
          this.erstelleUeberschrift("Freitag", inhalt);continue;
        case "Samstag":
          this.erstelleUeberschrift("Samstag", inhalt);continue;
        case "Sonntag":
          this.erstelleUeberschrift("Sonntag", inhalt);continue;
      }
      if(lehrveranstaltungen[j] != lehrvtmp){
        //Ermitteln welcher Veranstaltungstyp es ist:
        var vl = lehrveranstaltungen[j].indexOf("Vorlesung");
        var se = lehrveranstaltungen[j].indexOf("Seminar");
        var pr = lehrveranstaltungen[j].indexOf("Praktikum");
        var ue = lehrveranstaltungen[j].indexOf("Übung");

        veranstaltung = this.erstelleElement(""+lehrveranstaltungen[j]+","+lehrveranstaltungen[j+1],"p");
        if(vl != -1){
          //Farben für Vorlesungen festlegen:
          veranstaltung.style.backgroundColor = "rgba(74, 106, 255, 0.5)";
          veranstaltung.style.border = "2px solid rgb(74, 106, 255)";
        }else if(se != -1){
          //Farben für Seminar festlegen:
          veranstaltung = this.erstelleElement(""+lehrveranstaltungen[j]+","+lehrveranstaltungen[j+1],"p");
          veranstaltung.style.backgroundColor = "rgba(26, 123, 81, 0.5)";
          veranstaltung.style.border = "2px solid rgb(26, 123, 81)";
        }else if(pr != -1){
          //Farben für Praktikum festlegen:
          veranstaltung = this.erstelleElement(""+lehrveranstaltungen[j]+","+lehrveranstaltungen[j+1],"p");
          veranstaltung.style.backgroundColor = "rgba(255, 146, 63, 0.5)";
          veranstaltung.style.border = "2px solid rgb(255, 146, 63)";
        }else if(ue != -1){
          //Farben für Uebung festlegen:
          veranstaltung = this.erstelleElement(""+lehrveranstaltungen[j]+","+lehrveranstaltungen[j+1],"p");
          veranstaltung.style.backgroundColor = "rgba(44, 250, 40, 0.4)";
          veranstaltung.style.border = "2px solid rgb(44, 250, 40)";
        }else {
          //Farben für Sonstige Veranstaltung festlegen:
          veranstaltung = this.erstelleElement(""+lehrveranstaltungen[j]+","+lehrveranstaltungen[j+1],"p");
          veranstaltung.style.backgroundColor = "rgba(140, 140, 140, 0.3)";
          veranstaltung.style.border = "2px solid rgb(140, 140, 140)";
        }
        inhalt.appendChild(veranstaltung);
        lehrvtmp = lehrveranstaltungen[j+1];
      }
    }
    return inhalt;
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion erstellt eine Wochentags-Überschrift für den Raumplan.                         *
  *                                                                                           *
  *   wochentag -> Name des Wochentags                                                        *
  *   inhalt -> HTML-Element, zu dem die Überschrift hinzugefügt wird                         *
  *                                                                                           *
  ********************************************************************************************/
  erstelleUeberschrift(wochentag:string,inhalt:HTMLElement){
    var ueberschrift = this.erstelleElement(wochentag, "h5");
    inhalt.appendChild(ueberschrift);
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion ermittelt Lehrveranstaltungen für einen Raum                                   *
  *                                                                                           *
  *   raumname -> Name des Raums für den der Raumplan ermittelt werden soll                   *
  *                                                                                           *
  *   RETURN-Wert: Der erstellte Raumplan                                                     *
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

    var raum = this.parseToRaum(raumname);

    for(var i:number = 0; i< raum.veranstaltungen.length; i++){
      name = raum.veranstaltungen[i].name;

      //Der Wochentag wird ermittelt und in den Array geschrieben
      //Damit der Wochentag nur einmal vorkommt:
      if(raum.veranstaltungen[i].wochentag != Wochentag){
        Wochentag = raum.veranstaltungen[i].wochentag;
        LehrveranstaltungoffreeRooms.push(Wochentag);
        enduhrzeittmp = "";
        uhrzeittmp = "";
      }

      uhrzeit = this.changeZeit(raum.veranstaltungen[i].uhrzeit);
      enduhrzeit = this.changeZeit(raum.veranstaltungen[i].enduhrzeit);
      //Die Uhrzeit wird überprüft, damit parallele Veranstaltungen nicht vorkommen:
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
