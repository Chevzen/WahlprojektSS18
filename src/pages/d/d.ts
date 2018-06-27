import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Search } from '../search/search';
import { Darstellung } from '../../model/Darstellung';



@IonicPage()
@Component({
  selector: 'page-d',
  templateUrl: 'd.html',
})
export class Dgebaude {

    private freeRooms:string[] = [];
    private zugang:string[] = [];

    @ViewChild(Content) content: Content;

    private darstellung:Darstellung;
    constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
      var show: HTMLElement = document.getElementById('Lehraussen');
      show.style.display = "none";
      var innen: HTMLElement = document.getElementById('Lehrinnen');
      innen.style.display = "none";
      var span1: HTMLElement = document.getElementById('span1');
      span1.style.display = "none";
      var span2: HTMLElement = document.getElementById('span2');
      span2.style.display = "none";
      var button: HTMLElement = document.getElementById('button');
      button.style.display = "none";
      console.log('ionViewDidLoad CPage');
      this.darstellung = new Darstellung(1);
      console.log(this.darstellung);
      this.darstellung.parseToCampus();
      console.log(this.darstellung);
      this.freeRooms = this.darstellung.freeRooms;
      this.zugang = this.darstellung.zugang;
      this.fav = localStorage.getItem("Favoriten").split(",");
      console.log(this.freeRooms);
      console.log(this.zugang);
    }

    makeFav(item) {
    //Gehe alle Räume durch
    this.fav = localStorage.getItem("Favoriten").split(",");
    var isDelete:number = 0;
    //Gehe über alle Favoriten druch
    for(var i:number = 0; i < this.fav.length; i++) {
      //Ist der angeklickte Raum in den Favoriten? Lösche ihn
      if(this.fav[i] == item) {
        this.fav.splice(i,1);
        console.log("Eintrag gelöscht");
        isDelete = -1;
      } 
    }
    //Wenn der Raum nicht in den Favoriten ist, füge ihn hinzu
    if(isDelete == 0) {
      this.fav.push(item);
    }
    localStorage.setItem("Favoriten", this.fav);
  }

    onTip(raum:string){
      let toast = this.toastCtrl.create({
          message:  'Für den Raum '+raum+' brauchst du eine Zugangsberechtigung.',
          duration: 3000,
          position: 'middle'
      });
      toast.present();
    }

    BackToCampus(){
      this.navCtrl.setRoot(HomePage);
    }

    search() {
      this.navCtrl.setRoot( Search);
    }

    getL(raumname:string){
      console.log("GETL");
      var show2: HTMLElement = document.getElementById('Lehrinnen');

      //Entfernen der Lehrveranstaltungen:
      var remove = show2.firstChild;

      while(remove) {
          show2.removeChild(remove);
          remove = show2.firstChild;
      }
      console.log("HALLO");
      var show: HTMLElement = document.getElementById('Lehraussen');
      show.style.display = "block";
      show2.style.display = "block";
      var span1: HTMLElement = document.getElementById('span1');
      span1.style.display = "block";
      var span2: HTMLElement = document.getElementById('span2');
      span2.style.display = "block";
      var button: HTMLElement = document.getElementById('button');
      button.style.display = "block";
      var notShow: HTMLElement = document.getElementById('anzeige');
      notShow.style.display = "none";

      console.log("HALLO");
      console.log(this.darstellung.getLehrveranstaltungen(raumname));
      show2.appendChild(this.darstellung.getLehrveranstaltungen(raumname));
      this.scrollTop();
    }

    backClicked(){
      console.log("backklicked");
      var show: HTMLElement = document.getElementById('anzeige');
      show.style.display = "block";
      var notShow: HTMLElement = document.getElementById('Lehraussen');
      notShow.style.display = "none";
      var notShow2: HTMLElement = document.getElementById('Lehrinnen');
      notShow2.style.display = "none";
      var span1: HTMLElement = document.getElementById('span1');
      span1.style.display = "none";
      var span2: HTMLElement = document.getElementById('span2');
      span2.style.display = "none";
      var button: HTMLElement = document.getElementById('button');
      button.style.display = "none";
      this.scrollTop();
    }

    private scrollTop() {
      this.content.scrollToTop();
    }
}
