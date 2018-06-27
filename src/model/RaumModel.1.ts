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
  ********************************************************************************************/
  getICS(text:string) {
    text.trim();
    //console.log("text.split(\\r\\n): "+text.split("\\r\\n"));
    return text.split("\\r\\n");
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion parst die Uhrzeit aus dem Raumplan in das Format HH:MM:SS.                     *
  *                                                                                           *
  *   text -> Uhrzeit, die geparst werden soll                                                *
  *                                                                                           *
  ********************************************************************************************/
  getUhrZeit(text:string) {
    var datum:any = text.split("T");
    var tmp:any = datum[1];
    return tmp;
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion ermittelt, wann der Raum frei ist                                              *
  *                                                                                           *
  *   uhrzeit -> Uhrzeit, zu der der Raum frei sein soll                                      *
  *   wochentag -> Wochentag, zu dem der Raum frei sein soll                                  *
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
