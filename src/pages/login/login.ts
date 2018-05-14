import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Http, Headers, RequestOptions } from '@angular/http'

 

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  showLogin:boolean = true;   //Variablen anlegen
  benutzername:string = '';
  password:string = '';

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public loadingCtrl:LoadingController, private http: Http) {}
  
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
      if(this.benutzername.length != 8 || this.password === '') {
        var fehlerFeld: HTMLElement = document.getElementById('Fehler');
        fehlerFeld.innerText = "Benutzername oder Passwort falsch.";
        fehlerFeld.style.display = "block";
        return;
      }
      let loader = this.loadingCtrl.create({
        content: "Daten werden geladen..."
      });
    
    var body = `login_account=${this.benutzername}&login_password=${this.password}`;
    var headers = new Headers();
    headers.append('Content-Type','text/html; charset=utf-8');
    let options = new RequestOptions({headers: headers});
    this.http.get('https://aor.cs.hs-rm.de/login', body).subscribe(result => {
              console.log('login API success');
              console.log(result);
          }, error => {
              console.log(JSON.stringify(error.json()));
    });
      loader.present();
      setTimeout(2000);
      loader.dismiss();
      window.localStorage.setItem("benutzer",this.benutzername);
      window.localStorage.setItem("passwort",this.password);
      console.log(window.localStorage.getItem('benutzer'));
      console.log(window.localStorage.getItem('passwort'));
      this.navCtrl.setRoot(HomePage);

    } else {
      this.showLogin = true;
    }

  }
}

;