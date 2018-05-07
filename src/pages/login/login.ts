import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  showLogin:boolean = true;   //Variablen anlegen
  benutzername:string = '';
  password:string = '';

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public loadingCtrl:LoadingController) {}

  ionViewDidLoad() {
    console.log('Dat is die LoginPage');
  }
  doLogin() {
    if(this.showLogin) {
      console.log('login im gange');

        if(this.benutzername === '' || this.password === '') {
          let alert = this.alertCtrl.create({
            title:'Register Error',
            subTitle:'Alle Felder ausfüllen',
            buttons:['OK']
          });
      alert.present();
      return;
    }
    /*let loader = this.loadingCtrl.create({
      content: "Logging in..."
    });
    loader.present();
    setTimeout(2000);
    loader.dismissAll();*/
    this.navCtrl.setRoot(HomePage);

    } else {
      this.showLogin = true;
    }

  }
}
