export class Veranstaltung{

  /********************************************************************************************
  *                                                                                           *
  *   name -> Name der Veranstaltung                                                          *
  *   wochentag -> Wochentag der Veranstaltung                                                *
  *   uhrzeit -> Uhrzeit, zu der die Veranstaltung beginnt                                    *
  *   enduhrzeit -> Uhrzeit, zu der die Veranstaltung zu Ende ist                             *
  *                                                                                           *
  ********************************************************************************************/
  name:string = "";
  wochentag:string = "";
  uhrzeit:string= "";
  enduhrzeit:string= "";

  constructor (name: string, wochentag: string, uhrzeit: string,enduhrzeit:string){
      this.name = name;
      this.uhrzeit = uhrzeit;
      this.wochentag = wochentag;
      this.enduhrzeit = enduhrzeit;
  }
}
