import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Search } from '../search/search';
import { Darstellung } from '../../model/Darstellung';

@IonicPage()
@Component({
  selector: 'page-c',
  templateUrl: 'c.html',
})
export class Cgebaude {

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
    this.darstellung = new Darstellung(0);
    console.log(this.darstellung);
    this.darstellung.parseToCampus();
    console.log(this.darstellung);
    this.freeRooms = this.darstellung.freeRooms;
    this.zugang = this.darstellung.zugang;
    console.log(this.freeRooms);
    console.log(this.zugang);
  }

  onTip(raum:string){
    let toast = this.toastCtrl.create({
        message:  'Für den Raum '+raum+' brauchst du eine Zugangsberechtigung.',
        duration: 4000,
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
