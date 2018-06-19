import { RaumModel } from "./RaumModel.1";

export class GebaudeModel{

    gebaudename: string = "";
    raume: RaumModel[] = [];


    constructor(gebaudename:string){
        this.gebaudename = gebaudename;
    }


    addRaum(raum:RaumModel){
        this.raume.push(raum);
      }
    
    getFreeRooms(){
        var result: RaumModel[] = [];
        this.raume.forEach(raum => {
            if(raum.isFree(this.giveUhrzeit(), this.giveWochentag())){
                result.push(raum);  
            }
        });
        return result;
    }
    
    private giveUhrzeit(){
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
    private giveWochentag(){
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
}