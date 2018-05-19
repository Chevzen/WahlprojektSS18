import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Http, Headers, RequestOptions } from '@angular/http'

function get_Token(text:string) {
	console.log("text.indexOf(authenticity_token, 600): "+text.indexOf("authenticity_token", 600));
	return text.substring(text.indexOf("authenticity_token", 600)+29, text.indexOf("authenticity_token", 600)+117);
}

function get_Semester(text:string) {
	console.log("text.indexOf(option selected): "+text.indexOf("option selected"));
	return text.substring(text.indexOf("option selected")+37, text.indexOf("option selected")+46);
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
	semester:string='';

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
					console.log('X: '+this.x);
		  	this.token = get_Token(this.x);
				this.semester = get_Semester(this.x);
				console.log('Semester: '+this.semester);
		  	console.log('Token: '+this.token);
		  	/*for(var i=0;i<100;i++){
		  		this.token = this.token.replace('+', '%2B');
		  		this.token = this.token.replace('/', '%2F');
		  		this.token = this.token.replace('=', '%3D');
		  	}*/
	      //console.log("token: " + this.token);

				var body = 'utf8=%E2%9C%93&' +
				'authenticity_token='+this.token +
				'&login[account]='+this.benutzername+
				'&login[password]='+this.password+
				'&login[term_id]='+this.semester+
				'&commit=Anmeldung';
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
