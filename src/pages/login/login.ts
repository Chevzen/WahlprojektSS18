import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Http, Headers, RequestOptions } from '@angular/http'

function get_Token(text:string) {
	return text.substring(text.search('authenticity_token')+61, text.search('authenticity_token')+149);
}


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  showLogin:boolean = true;   //Variablen anlegen
  benutzername:string = '';
  password:string = '';
  token:string ='';
  x:string = '';
  i:number = 0;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public loadingCtrl:LoadingController, private http: Http) {}

  ionViewDidLoad() {
    console.log('Dat is die LoginPage');
  }

  clicked(){
    var fehlerFeld: HTMLElement = document.getElementById('Fehler');
    fehlerFeld.style.display = "none";
  }

/*function post(body:string, options:let) {
      this.http.post('https://aor.cs.hs-rm.de/login', body, options).subscribe(
        result => {
          console.log("POST: "+result);
        }, error => {
          console.log("Error: POST: "+error);
        }
      ); 
}*/


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

     this.http.get('https://aor.cs.hs-rm.de/login').subscribe(
        result => {
          console.log('login API success');
          //window.localStorage.setItem("Token",result);
          /*loader.present();
          //Daten herunterladen!!
          setTimeout(2000);
          loader.dismiss();
          window.localStorage.setItem("benutzer",this.benutzername);
          window.localStorage.setItem("passwort",this.password);
          console.log(window.localStorage.getItem('benutzer'));
          console.log(window.localStorage.getItem('passwort'));
          this.navCtrl.setRoot(HomePage); */
	      this.x = JSON.stringify(result, null, 2);
		  this.token = get_Token(this.x);
		  console.log(this.token);
		  for(var i=0;i<100;i++){
		  this.token = this.token.replace('+', '%2B');
		  this.token = this.token.replace('/', '%2F');
		  this.token = this.token.replace('=', '%3D');
		  }
	      console.log("token: " + this.token);

		var body = 'utf8=%E2%9C%93&' +


		'authenticity_token='+ this.token +
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


		  this.http.post('https://aor.cs.hs-rm.de/login', body, options).subscribe(
	      	result => {
	        	console.log("POST: "+result);
	        	}, error => {
	          	console.log("Error: POST: "+error);
	        }
	      ); 


        }, error => {
          console.log("Error: "+JSON.stringify(error.json()));
        });        


    } else {
      this.showLogin = true;
    }

  }
};
