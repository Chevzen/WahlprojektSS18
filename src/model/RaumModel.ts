export class RaumModel{
  


  raumname:string;
  wochentag:string[] = [];
  uhrzeit:string[] = [];
  veranstaltung:string[] = [];

  constructor (raumname:string){
    this.raumname = raumname;
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

   getwochenTag(text:string) {
    var datum:any = text.split("T");
    datum.pop();
    datum = datum[0].split("-");
    var datum2:any = new Date(datum[0],datum[1]-1,datum[2]);
    var tag:any = datum2.getDay();
    var wochentag:any = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    return wochentag[tag];
  }

}
