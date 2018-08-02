import { RaumModel } from "./RaumModel.1";
import { Darstellung } from './Darstellung';

export class GebaudeModel{

  /********************************************************************************************
  *                                                                                           *
  *   gebaudename -> Name eines Gebäudes                                                      *
  *   raume -> Array mit allen Räumen eines Gebäudes                                          *
  *   zugangsberechtigung -> Array mit allen Räumen mit Zugangsbeschränkung                   *
  *                                                                                           *
  ********************************************************************************************/
  gebaudename: string = "";
  raume: RaumModel[] = [];
  zugangsberechtigung:string[] = ["D01","D12","D13","D15","D18","C001","C007","C113","C213","C237","C305","C313","C361","C375","C377","C413"];


  constructor(gebaudename:string){
      this.gebaudename = gebaudename;
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion fügt einen Raum in das Array raume ein                                         *
  *                                                                                           *
  *   raum -> Raum, der hinzugefügt werden soll                                               *
  *                                                                                           *
  ********************************************************************************************/
  addRaum(raum:RaumModel){
    this.raume.push(raum);
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion, die alle freien Räume zu allen Timeslots ermittelt                            *
  *                                                                                           *
  *   RETURN-Wert: Alle freien Räume                                                          *
  *                                                                                           *
  ********************************************************************************************/
  getFreeRooms(){
      var result:string[] = [];
      var slots:string[] = this.giveSlots();
      var darstellung:Darstellung;
      switch(this.gebaudename){
        case "C": darstellung = new Darstellung(0);break;
        case "D": darstellung = new Darstellung(1);break;
      }
      for(var i:number = 0;i<slots.length;i++){
        switch(slots[i]){
          case "08:15:00": result.push("08:15 bis 09:45:");break;
          case "10:00:00": result.push("10:00 bis 11:30:");break;
          case "11:45:00": result.push("11:45 bis 13:15:");break;
          case "14:15:00": result.push("14:15 bis 15:45:");break;
          case "16:00:00": result.push("16:00 bis 17:30:");break;
          case "17:45:00": result.push("17:45 bis 19:15:");break;
          case "19:30:00": result.push("19:30 bis 21:00:");break;
          case "21:00:00": result.push("ab 21:00:");break;
        }
        this.raume.forEach(raum => {
          if(raum.isFree(slots[i], darstellung.giveWochentag())){
            result.push(raum.raumname);
          }
        });
      }
      return result;
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion gibt zur aktuellen Uhrzeit die nachfolgenden Timeslots zurück.                 *
  *                                                                                           *
  *   RETURN-Wert: Alle Timeslots                                                             *
  *                                                                                           *
  ********************************************************************************************/
  private giveSlots(){
    switch(true){
      case this.giveUhrzeit() == "08:15:00": return ["08:15:00", "10:00:00", "11:45:00", "14:15:00", "16:00:00", "17:45:00", "19:30:00", "21:00:00"];
      case this.giveUhrzeit() == "10:00:00": return ["10:00:00", "11:45:00", "14:15:00", "16:00:00", "17:45:00", "19:30:00", "21:00:00"];
      case this.giveUhrzeit() == "11:45:00": return ["11:45:00", "14:15:00", "16:00:00", "17:45:00", "19:30:00", "21:00:00"];
      case this.giveUhrzeit() == "14:15:00": return ["14:15:00", "16:00:00", "17:45:00", "19:30:00", "21:00:00"];
      case this.giveUhrzeit() == "16:00:00": return ["16:00:00", "17:45:00", "19:30:00", "21:00:00"];
      case this.giveUhrzeit() == "17:45:00": return ["17:45:00", "19:30:00", "21:00:00"];
      case this.giveUhrzeit() == "19:30:00": return ["19:30:00", "21:00:00"];
      case this.giveUhrzeit() == "21:00:00": return ["21:00:00"]
      default: break;
    }
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion gibt die Uhrzeit des aktuellen Slots zurück                                    *
  *   Befinden wir uns vor dem ersten Timeslot wird dieser zurückgegeben.                     *
  *   Befinden wir uns nach dem letzten Timeslot wird dieser zurückgegeben.                   *
  *                                                                                           *
  *   RETURN-Wert: Die Uhrzeit des aktuellen Slots                                            *
  *                                                                                           *
  ********************************************************************************************/
  private giveUhrzeit(){
    var jetzt = new Date();
    var stunden = jetzt.getHours();
    var minuten = jetzt.getMinutes();
    switch(true){
      /*0:00 - 0:59*/case (stunden == 0) && (minuten >= 0 && minuten <= 59): return "08:15:00";
      /*1:00 - 1:59*/case (stunden == 1) && (minuten >= 0 && minuten <= 59): return "08:15:00";
      /*2:00 - 2:59*/case (stunden == 2) && (minuten >= 0 && minuten <= 59): return "08:15:00";
      /*3:00 - 3:59*/case (stunden == 3) && (minuten >= 0 && minuten <= 59): return "08:15:00";
      /*4:00 - 4:59*/case (stunden == 4) && (minuten >= 0 && minuten <= 59): return "08:15:00";
      /*5:00 - 5:59*/case (stunden == 5) && (minuten >= 0 && minuten <= 59): return "08:15:00";
      /*6:00 - 6:59*/case (stunden == 6) && (minuten >= 0 && minuten <= 59): return "08:15:00";
      /*7:00 - 7:59*/case (stunden == 7) && (minuten >= 0 && minuten <= 59): return "08:15:00";
      /*8:00 - 8:59*/case (stunden == 8) && (minuten >= 0 && minuten <= 59): return "08:15:00";
      /*9:00 - 9:44*/case (stunden == 9) && (minuten >= 0 && minuten <= 44): return "08:15:00";
      /*9:45 - 9:59*/case (stunden == 9) && (minuten >= 45 && minuten <= 59): return "10:00:00";
      /*10:00 - 10:59*/case (stunden == 10) && (minuten >= 0 && minuten <= 59): return "10:00:00";
      /*11:00 - 11:44*/case (stunden == 11) && (minuten >= 0 && minuten <= 44): return "10:00:00";
      /*11:45 - 11:59*/case (stunden == 11) && (minuten >= 45 && minuten <= 59): return "11:45:00";
      /*12:00 - 12:59*/case (stunden == 12) && (minuten >= 0 && minuten <= 59): return "11:45:00";
      /*13:00 - 13:59*/case (stunden == 13) && (minuten >= 0 && minuten <= 59): return "11:45:00";
      /*14:00 - 14:14*/case (stunden == 14) && (minuten >= 0 && minuten <= 14): return "11:45:00";
      /*14:15 - 14:59*/case (stunden == 14) && (minuten >= 15 && minuten <= 59): return "14:15:00";
      /*15:00 - 15:59*/case (stunden == 15) && (minuten >= 0 && minuten <= 59): return "14:15:00";
      /*16:00 - 16:59*/case (stunden == 16) && (minuten >= 0 && minuten <= 59): return "16:00:00";
      /*17:00 - 17:44*/case (stunden == 17) && (minuten >= 0 && minuten <= 44): return "16:00:00";
      /*17:45 - 17:59*/case (stunden == 17) && (minuten >= 45 && minuten <= 59): return "17:45:00";
      /*18:00 - 18:59*/case (stunden == 18) && (minuten >= 0 && minuten <= 59): return "17:45:00";
      /*19:00 - 19:29*/case (stunden == 19) && (minuten >= 0 && minuten <= 29): return "17:45:00";
      /*19:30 - 19:59*/case (stunden == 19) && (minuten >= 30 && minuten <= 59): return "19:30:00";
      /*20:00 - 20:59*/case (stunden == 20) && (minuten >= 0 && minuten <= 59): return "19:30:00";
      /*21:00 - 21:59*/case (stunden == 21) && (minuten >= 0 && minuten <= 59): return "21:00:00";
      /*22:00 - 22:59*/case (stunden == 22) && (minuten >= 0 && minuten <= 59): return "21:00:00";
      /*23:00 - 23:59*/case (stunden == 23) && (minuten >= 0 && minuten <= 59): return "21:00:00";
      default: break;
    }
  }
}
