import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RaumModel } from '../../model/RaumModel.1';
import ICAL from "ical.js";
import { Veranstaltung } from '../../model/Veranstaltung';
import { GebaudeModel } from '../../model/GebaudeModel';
import { CampusModel } from '../../model/CampusModel';
import { Darstellung } from '../../model/Darstellung';

// Die Konfigurationsvariable für die Räume und Gebäudenamen, diese wird in den späteren Funktionen verwendet
var CampusConfig = [      "C001",
      "C007",
      "C035",
      "C037",
      "C113",
      "C213",
      "C237",
      "C305",
      "C313",
      "C361",
      "C375",
      "C377",
      "C405",
      "C407",
      "C413"];
      var CampusConfig2 = ["D01",
            "D02",
            "D12",
            "D13",
            "D14",
            "D15",
            "D17",
            "D18"];
var freeTimeSlot : number [] = [];

var StundenSlot: string [] = [
  '8:15:00', '10:00:00', '11:45:00', '14:15:00', '16:00:00', '17:45:00', '19:30:00','ab 21:00:'
];

function timeout(zahl:number) {
	var start:any = new Date().getTime();
	var i:number;
	for(i = 0; i < 1e7; i++){
		if((new Date().getTime() - start) > zahl*1000){
			break;
		}
	}
}

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class Search {


  private darstellung:Darstellung;
  private darstellung2:Darstellung;
  private gebaudeC = new GebaudeModel("C");
  private gebaudeD = new GebaudeModel("D");
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
//parseGebaude(raumnamen:string[], name:string){
  ionViewDidLoad(){
    console.log('ionViewDidLoad SearchPage');
    this.darstellung = new Darstellung(0);
    this.darstellung2 = new Darstellung(1);
    this.gebaudeC = this.darstellung.parseGebaude(CampusConfig,"C");
    this.gebaudeD = this.darstellung2.parseGebaude(CampusConfig2,"D");
    console.log(this.gebaudeC);
    console.log(this.gebaudeD);
  }
  searchRoom(searchbar){
    freeTimeSlot = [];
    var room:string = searchbar.target.value;
    console.log("Campusconfig: "+CampusConfig);
    var raume:string[] = [];
    for(let rooms of this.gebaudeC.raume){
      raume.push(rooms.raumname);
    }
    for(let rooms of this.gebaudeD.raume){
      raume.push(rooms.raumname);
    }
    console.log(room+" "+raume);
    if(raume.indexOf(room) == -1){
      var fehlerFeld: HTMLElement = document.getElementById('Fehler');
      fehlerFeld.innerText = "Raum konnte nicht gefunden werden";
      fehlerFeld.style.display = "block";
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
      return null;
    }
    for(var y:number = 0; y < StundenSlot.length; y++){
      //console.log(this.darstellung.parseToRaum(room).isFree(StundenSlot[y],this.darstellung.giveWochentag()));
      //console.log(this.darstellung.giveWochentag());
      //console.log(this.darstellung.parseToRaum(room));
      console.log(StundenSlot[y]);
      if(this.darstellung.parseToRaum(room).isFree(StundenSlot[y],this.darstellung.giveWochentag())){
        freeTimeSlot.push(y);
       }
      else{
        freeTimeSlot.push(99);
      }
    }
    console.log(freeTimeSlot);
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
  private freeTimeSlot:number [] = freeTimeSlot;

}
