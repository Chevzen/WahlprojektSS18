import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http'

 

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    t { HTTP } from '@ionic-native/http' 
};

  showLogin:boolean = true;   //Variablen anlegen
  benutzername:string = '';
  password:string = '';

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public loadingCtrl:LoadingController, private theInAppBrowser: InAppBrowser, private http: Http) {}
  
  
  public openWithInAppBrowser(url : string){
    let target = "_blank";
    this.theInAppBrowser.create(url,target,this.options);
  }

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

    var body = JSON.stringify({
    login_account: this.benutzername,
    login_password: this.password
    });
    
    var body = `login_account=${this.benutzername}&login_password=${this.password}`;
    var headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');
    let options = new RequestOptions({headers: headers});
    this.http.post('https://aor.cs.hs-rm.de/login', body, options)
    .subscribe(data => {
              console.log('login API success');
              console.log(data);
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