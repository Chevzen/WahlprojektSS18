import { GebaudeModel } from "./GebaudeModel";

export class CampusModel{

  /********************************************************************************************
  *                                                                                           *
  *   campusname -> Name des Campus                                                           *
  *   gebaude -> Array, mit Gebäuden                                                          *
  *                                                                                           *
  ********************************************************************************************/
  campusname: string ="";
  gebaude: GebaudeModel[] = [];


  constructor(name:string){
    this.campusname = name;
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion fügt ein Gebäude dem Array gebaude hinzu                                       *
  *                                                                                           *
  *   gebaude -> Gebäude, das in den Array gebaude eingefügt werden soll                      *
  *                                                                                           *
  ********************************************************************************************/
  addGebaude(gebaude:GebaudeModel){
    this.gebaude.push(gebaude);
  }
}
