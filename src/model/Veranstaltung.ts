export class Veranstaltung{

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