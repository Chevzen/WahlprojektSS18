import { GebaudeModel } from "./GebaudeModel";

export class CampusModel{

    campusname: string ="";
    gebaude: GebaudeModel[] = [];


    constructor(name:string){
        this.campusname = name;
    }

    addGebaude(gebaude:GebaudeModel){
        this.gebaude.push(gebaude);
      }
    
}