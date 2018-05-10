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

  clicked(){
    var fehlerFeld: HTMLElement = document.getElementById('Fehler');
    fehlerFeld.style.display = "none";
  }

  doLogin() {
    if(this.showLogin) {
      console.log('login im gange');
      if(this.benutzername === '' || this.password === '') {
        var fehlerFeld: HTMLElement = document.getElementById('Fehler');
        fehlerFeld.innerText = "Benutzername oder Passwort falsch.";
        fehlerFeld.style.display = "block";
        return;
      }
      let loader = this.loadingCtrl.create({
        content: "Daten werden geladen..."
      });
      loader.present();
      $http.post('https://aor.cs.hs-rm.de/login', { login_account: this.benutzername, login_password: this.password})
      .success(function(response){
        console.log("Erfolg: "+response);
        //setTimeout(2000);
        loader.dismiss();
        this.navCtrl.setRoot(HomePage);
      })
      .error(function(response){
        console.log("Error: "+response);
      });

    } else {
      this.showLogin = true;
    }

  }
}
