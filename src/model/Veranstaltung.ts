export class Veranstaltung{

    name:string = "";
    wochentag:string = "";
    uhrzeit:string= "";

    constructor (name: string, wochentag: string, uhrzeit: string){
        this.name = name;
        this.uhrzeit = uhrzeit;
        this.wochentag = wochentag;
    }
   

}