import { Veranstaltung } from "./Veranstaltung";

export class RaumModel{
  


  raumname:string = "";
  veranstaltungen:Veranstaltung [] = [];

  constructor (raumname:string){
    this.raumname = raumname;

  }

  addVeranstaltung(veranstaltung: Veranstaltung){
    this.veranstaltungen.push(veranstaltung);
  }


//Hilfsfunktion

   getICS(text:string) {
    text.trim();
    //console.log("text.split(\\r\\n): "+text.split("\\r\\n"));
    return text.split("\\r\\n");
  }

    getUhrZeit(text:string) {
    var datum:any = text.split("T");
    var tmp:any = datum[1];
    return tmp;
  }

  isFree(uhrzeit:string, wochentag:string){
    this.veranstaltungen.forEach(veranstaltung => {
        if(veranstaltung.wochentag == wochentag && veranstaltung.uhrzeit == uhrzeit){
          return false;
        }
      
    });
    return true;
  }

}
