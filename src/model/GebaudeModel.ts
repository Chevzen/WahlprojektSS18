import { RaumModel } from "./RaumModel.1";
import { Veranstaltung } from "./Veranstaltung";

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
        var result:string[] = [];// RaumModel[] = [];
        var slots:string[] = this.giveSlots();
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
            if(raum.isFree(slots[i], this.giveWochentag())){
              result.push(raum.raumname);
            }
          });
        }
        return result;
    }

  private giveSlots(){
          var jetzt = new Date();
          var stunden = jetzt.getHours();
          var minuten = jetzt.getMinutes();
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

      private giveUhrzeit(){
          var jetzt = new Date();

          var stunden = jetzt.getHours();
          var minuten = jetzt.getMinutes();

          switch(true){
            //0:00 - 0:59
            case (stunden == 0) && (minuten >= 0 && minuten <= 59): console.log("1");return "08:15:00";
            //1:00 - 1:59
            case (stunden == 1) && (minuten >= 0 && minuten <= 59): console.log("2");return "08:15:00";
            //2:00 - 2:59
            case (stunden == 2) && (minuten >= 0 && minuten <= 59): console.log("3");return "08:15:00";
            //3:00 - 3:59
            case (stunden == 3) && (minuten >= 0 && minuten <= 59): console.log("4");return "08:15:00";
            //4:00 - 4:59
            case (stunden == 4) && (minuten >= 0 && minuten <= 59): console.log("5");return "08:15:00";
            //5:00 - 5:59
            case (stunden == 5) && (minuten >= 0 && minuten <= 59): console.log("6");return "08:15:00";
            //6:00 - 6:59
            case (stunden == 6) && (minuten >= 0 && minuten <= 59): console.log("7");return "08:15:00";
            //7:00 - 7:59
            case (stunden == 7) && (minuten >= 0 && minuten <= 59): console.log("8");return "08:15:00";
            //8:00 - 8:59
            case (stunden == 8) && (minuten >= 0 && minuten <= 59): console.log("9");return "08:15:00";
            //9:00 - 9:44
            case (stunden == 9) && (minuten >= 0 && minuten <= 44): console.log("10");return "08:15:00";

            //9:45 - 9:59
            case (stunden == 9) && (minuten >= 45 && minuten <= 59): console.log("11");return "10:00:00";
            //10:00 - 10:59
            case (stunden == 10) && (minuten >= 0 && minuten <= 59): console.log("12");return "10:00:00";
            //11:00 - 11:44
            case (stunden == 11) && (minuten >= 0 && minuten <= 44): console.log("13");return "10:00:00";

            //11:45 - 11:59
            case (stunden == 11) && (minuten >= 45 && minuten <= 59): console.log("14");return "11:45:00";
            //12:00 - 12:59
            case (stunden == 12) && (minuten >= 0 && minuten <= 59): console.log("15");return "11:45:00";
            //13:00 - 13:59
            case (stunden == 13) && (minuten >= 0 && minuten <= 59): console.log("16");return "11:45:00";
            //14:00 - 14:14
            case (stunden == 14) && (minuten >= 0 && minuten <= 14): console.log("17");return "11:45:00";

            //14:15 - 14:59
            case (stunden == 14) && (minuten >= 15 && minuten <= 59): console.log("18");return "14:15:00";
            //15:00 - 15:59
            case (stunden == 15) && (minuten >= 0 && minuten <= 59): console.log("19");return "14:15:00";

            //16:00 - 16:59
            case (stunden == 16) && (minuten >= 0 && minuten <= 59): console.log("20");return "16:00:00";
            //17:00 - 17:44
            case (stunden == 17) && (minuten >= 0 && minuten <= 44): console.log("21");return "16:00:00";

            //17:45 - 17:59
            case (stunden == 17) && (minuten >= 45 && minuten <= 59): console.log("22");return "17:45:00";
            //18:00 - 18:59
            case (stunden == 18) && (minuten >= 0 && minuten <= 59): console.log("23");return "17:45:00";
            //19:00 - 19:29
            case (stunden == 19) && (minuten >= 0 && minuten <= 29): console.log("24");return "17:45:00";

            //19:30 - 19:59
            case (stunden == 19) && (minuten >= 30 && minuten <= 59): console.log("25");return "19:30:00";
            //20:00 - 20:59
            case (stunden == 20) && (minuten >= 0 && minuten <= 59): console.log("26");return "19:30:00";

            //21:00 - 21:59
            case (stunden == 21) && (minuten >= 0 && minuten <= 59): console.log("27");return "21:00:00";
            //22:00 - 22:59
            case (stunden == 22) && (minuten >= 0 && minuten <= 59): console.log("28");return "21:00:00";
            //23:00 - 23:59
            case (stunden == 23) && (minuten >= 0 && minuten <= 59): console.log("29");return "21:00:00";

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

    getRoom(name:string){
        this.raume.forEach(raum => {
            if(raum.raumname == name){
                return raum;
            }
        });

    }
}
