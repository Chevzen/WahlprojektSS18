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


      var body = 'utf8=%E2%9C%93&' +


// TOKEN ÄNDERN
'authenticity_token=%2BToF7JE%2BQ8HDAkMJ8LzJDRZcg%2F2SyQDxd6wnYgaw3JlqWEM3yd36daKKLqYCDI918Xu206UdvWol55eMHDpObw%3D%3D'+ 
'&login%5Baccount%5D='+this.benutzername+
'&login%5Bpassword%5D='+this.password+
'&login%5Bterm_id%5D=343737466'+
'&commit=Anmeldung'   ;
      //let body = new URLSearchParams();
      //body.set('login[account]', this.benutzername);
      //body.set('login[password]', this.password);
      console.log("Body: "+body);
      //var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
//      var headers = new Headers();
  //    headers.append('Content-Type','text/html; charset=utf-8');
      //headers.append('Content-Type','application/x-www-form-urlencoded');
      //let options = new RequestOptions({headers: headers, withCredentials:true});
      let options = {
          headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
          withCredentials:true
      };

      this.http.get('https://aor.cs.hs-rm.de/login', body).subscribe(
        result => {
          console.log('login API success');
          console.log("Result: "+result);
          //window.localStorage.setItem("Token",result);
          /*loader.present();
          //Daten herunterladen!!
          setTimeout(2000);
          loader.dismiss();
          window.localStorage.setItem("benutzer",this.benutzername);
          window.localStorage.setItem("passwort",this.password);
          console.log(window.localStorage.getItem('benutzer'));
          console.log(window.localStorage.getItem('passwort'));
          this.navCtrl.setRoot(HomePage);*/
        }, error => {
          console.log("Error: "+JSON.stringify(error.json()));
        });

      this.http.post('https://aor.cs.hs-rm.de/login', body, options).subscribe(
        result => {
          console.log("POST: "+result);
        }, error => {
          console.log("Error: POST: "+error);
        }
      );


    } else {
      this.showLogin = true;
    }

  }
};
