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
  
   giveUhrzeit(){
      var jetzt = new Date();
      var stunden = jetzt.getHours();
      var minuten = jetzt.getMinutes();
      switch(true){
        case (stunden == 8 && minuten >= 5 || stunden == 9 && minuten <= 45): return "8:15:00";  
        case (stunden == 9 && minuten >= 45 || stunden == 10 || stunden == 11  && minuten <= 30): return "10:00:00";
        case (stunden == 11 && minuten >= 30 || stunden == 12 || stunden == 13 && minuten <= 15): return "11:45:00";
        case (stunden == 14 && minuten >= 15 || stunden == 15 && minuten <= 45): return "14:15:00";
        case (stunden == 16 || stunden == 17 && minuten <= 30): return "16:00:00";
        case (stunden == 17 && minuten >= 45 || stunden == 18 || stunden == 19 && minuten <= 15): return "17:45:00";
        default: break;
      }
  }

}
