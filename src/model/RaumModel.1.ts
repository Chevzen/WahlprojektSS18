import { Veranstaltung } from "./Veranstaltung";



export class RaumModel{

  /********************************************************************************************
  *                                                                                           *
  *   raumname -> Name des Raums                                                              *
  *   veranstaltungen -> Array, in den Veranstaltungen eines Raumes geschrieben werden        *
  *                                                                                           *
  ********************************************************************************************/
  raumname:string = "";
  veranstaltungen:Veranstaltung [] = [];


  constructor (raumname:string){
    this.raumname = raumname;
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion fügt einem Raum eine Veranstaltung hinzu                                       *
  *                                                                                           *
  *   veranstaltung -> Veranstaltung, die hinzugefügt werden soll                             *
  *                                                                                           *
  ********************************************************************************************/
  addVeranstaltung(veranstaltung: Veranstaltung){
    this.veranstaltungen.push(veranstaltung);
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion gibt einen übergebenen Text in eine Array aufgesplittet zurück                 *
  *                                                                                           *
  *   text -> Text, der gesplittet werden soll                                                *
  *                                                                                           *
  *   RETURN-Wert: Array mit Einträgen aus dem übergebenen Text(ics-Datei)                    *
  *                                                                                           *
  ********************************************************************************************/
  getICS(text:string) {
    text.trim();
    return text.split("\\r\\n");
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion ermittelt, wann der Raum frei ist                                              *
  *                                                                                           *
  *   uhrzeit -> Uhrzeit, zu der der Raum frei sein soll                                      *
  *   wochentag -> Wochentag, zu dem der Raum frei sein soll                                  *
  *                                                                                           *
  *   RETURN-Wert: true, wenn der Raum frei ist; false falls nicht                            *
  *                                                                                           *
  ********************************************************************************************/
  isFree(uhrzeit:string, wochentag:string){
    var result:any = true;
    this.veranstaltungen.forEach(veranstaltung => {
      if(veranstaltung.wochentag == wochentag && veranstaltung.uhrzeit == uhrzeit){
        result = false;
      }
    });
    return result;
  }
}
