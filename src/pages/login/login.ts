import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Http, Headers, RequestOptions } from '@angular/http'

function get_Token(text:string) {
	//console.log("text.indexOf(authenticity_token): "+text.indexOf("authenticity_token"));
	//return text.substring(text.indexOf("authenticity_token")+61, text.indexOf("authenticity_token")+149);
	console.log("text.indexOf(authenticity_token, 600): "+text.indexOf("authenticity_token", 600));
	return text.substring(text.indexOf("authenticity_token", 600)+29, text.indexOf("authenticity_token", 600)+117);
}

function get_Semester(text:string) {
	console.log("text.indexOf(option selected): "+text.indexOf("option selected"));
	return text.substring(text.indexOf("option selected")+37, text.indexOf("option selected")+46);
}

function get_Plan(text:string) {
	return text.substring(text.indexOf("_body")+9, text.indexOf("Cache-Control")-76);
}

function timeout(zahl:number) {
	var start:any = new Date().getTime();
	var i:number;
	console.log("Login im Gange ...");
	for(i = 0; i < 1e7; i++){
		if((new Date().getTime() - start) > zahl*1000){
			break;
		}
	}
}

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	//Variablen anlegen
  showLogin:boolean = true;
  benutzername:string = '';
  password:string = '';
  token:string ='';
  x:string = '';
  i:number = 0;
	semester:string='';

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public loadingCtrl:LoadingController, private http: Http) {}

  ionViewDidLoad() {
    console.log('Dat is die LoginPage');
		//Hier überprüfen:
		//-ob schon Benutzerdaten vorhanden sind.
		//Wenn ja, dann Login-formular ausblenden und Login durchführen.
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

			let options = {
				headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
				withCredentials: true
			};

			this.http.get('https://aor.cs.hs-rm.de/login', options).subscribe(
				result => {
					console.log('login API success');
					//window.localStorage.setItem("Token",result);
					this.x = JSON.stringify(result, null, 2);
					console.log('X: '+ this.x);
					this.token = get_Token(this.x);
					this.semester = get_Semester(this.x);
					console.log('Semester: '+ this.semester);
					console.log('Token: '+ this.token);

					var body = 'utf8=%E2%9C%93' +
					'&authenticity_token=' + this.token +
					'&login[account]=' + this.benutzername +
					'&login[password]=' + this.password +
					'&login[term_id]=' + this.semester +
					'&commit=Anmeldung';
					/*var body = 'utf8=%E2%9C%93&' +
					'authenticity_token='+this.token +
					'&login%5Baccount%5D='+this.benutzername+
					'&login%5Bpassword%5D='+this.password+
					'&login%5Bterm_id%5D='+this.semester+
					'&commit=Anmeldung';*/
					//let body = new URLSearchParams();
					//body.set('login[account]', this.benutzername);
					//body.set('login[password]', this.password);
					console.log("Body: "+ body);
					//var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
					//var headers = new Headers();
					//headers.append('Content-Type','text/html; charset=utf-8');
					//headers.append('Content-Type','application/x-www-form-urlencoded');
					//let options = new RequestOptions({headers: headers, withCredentials:true});
					//let options = {
						//headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
						//withCredentials: true
					//};
					//headers.append('_aor_session', getCookie('_aor_session'));

					this.http.post('https://aor.cs.hs-rm.de/login', body, options).subscribe(
						result => {
							console.log("POST: "+ JSON.stringify(result, null, 2));

							let loader = this.loadingCtrl.create({
								content: "Daten werden geladen..."
							});
							loader.present();
							//Raum D01:
							this.http.get('https://aor.cs.hs-rm.de/rooms/1001264429/plans.ics', options).subscribe(
								result => {
									console.log('login API success');
									//window.localStorage.setItem("Token",result);
									this.x = JSON.stringify(result, null, 2);
									console.log("D01");
									console.log('X: '+ this.x);
									this.x = get_Plan(this.x);
									window.localStorage.setItem("D01", this.x);
									console.log("D01: "+window.localStorage.getItem("D01"));
								}, error => {
									console.log("Error: "+ JSON.stringify(error, null, 2));
								});
							//Raum D02:
							this.http.get('https://aor.cs.hs-rm.de/rooms/1001264431/plans.ics', options).subscribe(
								result => {
									console.log('login API success');
									//window.localStorage.setItem("Token",result);
									this.x = JSON.stringify(result, null, 2);
									console.log("D02");
									console.log('X: '+ this.x);
									this.x = get_Plan(this.x);
									window.localStorage.setItem("D02", this.x);
									console.log("D02: "+window.localStorage.getItem("D02"));
								}, error => {
									console.log("Error: "+ JSON.stringify(error, null, 2));
								});
							//Raum D11:
							this.http.get('https://aor.cs.hs-rm.de/rooms/454131924/plans.ics', options).subscribe(
								result => {
									console.log('login API success');
									//window.localStorage.setItem("Token",result);
									this.x = JSON.stringify(result, null, 2);
									console.log("D11");
									console.log('X: '+ this.x);
									this.x = get_Plan(this.x);
									window.localStorage.setItem("D11", this.x);
									console.log("D11: "+window.localStorage.getItem("D11"));
								}, error => {
									console.log("Error: "+ JSON.stringify(error, null, 2));
								});
							//Raum D12:
							this.http.get('https://aor.cs.hs-rm.de/rooms/454131925/plans.ics', options).subscribe(
								result => {
									console.log('login API success');
									//window.localStorage.setItem("Token",result);
									this.x = JSON.stringify(result, null, 2);
									console.log("D12");
									console.log('X: '+ this.x);
									this.x = get_Plan(this.x);
									window.localStorage.setItem("D12", this.x);
									console.log("D12: "+window.localStorage.getItem("D12"));
								}, error => {
									console.log("Error: "+ JSON.stringify(error, null, 2));
								});/*
							//Raum D13:
							this.http.get('https://aor.cs.hs-rm.de/rooms/454131926/plans.ics', options).subscribe(
								result => {
									console.log('login API success');
									//window.localStorage.setItem("Token",result);
									this.x = JSON.stringify(result, null, 2);
									console.log('X: '+ this.x);
									window.localStorage.setItem("D13", this.x);
								}, error => {
									console.log("Error: "+ JSON.stringify(error, null, 2));
								});
							//Raum D14:
							this.http.get('https://aor.cs.hs-rm.de/rooms/454131927/plans.ics', options).subscribe(
								result => {
									console.log('login API success');
									//window.localStorage.setItem("Token",result);
									this.x = JSON.stringify(result, null, 2);
									console.log('X: '+ this.x);
									window.localStorage.setItem("D14", this.x);
								}, error => {
									console.log("Error: "+ JSON.stringify(error, null, 2));
								});
							//Raum D15:
							this.http.get('https://aor.cs.hs-rm.de/rooms/454131928/plans.ics', options).subscribe(
								result => {
									console.log('login API success');
									//window.localStorage.setItem("Token",result);
									this.x = JSON.stringify(result, null, 2);
									console.log('X: '+ this.x);
									window.localStorage.setItem("D15", this.x);
								}, error => {
									console.log("Error: "+ JSON.stringify(error, null, 2));
								});
							//Raum D17:
							this.http.get('https://aor.cs.hs-rm.de/rooms/454131930/plans.ics', options).subscribe(
								result => {
									console.log('login API success');
									//window.localStorage.setItem("Token",result);
									this.x = JSON.stringify(result, null, 2);
									console.log('X: '+ this.x);
									window.localStorage.setItem("D17", this.x);
								}, error => {
									console.log("Error: "+ JSON.stringify(error, null, 2));
								});
							//Raum D18:
							this.http.get('https://aor.cs.hs-rm.de/rooms/454131931/plans.ics', options).subscribe(
								result => {
									console.log('login API success');
									//window.localStorage.setItem("Token",result);
									this.x = JSON.stringify(result, null, 2);
									console.log('X: '+ this.x);
									window.localStorage.setItem("D18", this.x);
								}, error => {
									console.log("Error: "+ JSON.stringify(error, null, 2));
								});
							//Raum C001:
							this.http.get('https://aor.cs.hs-rm.de/rooms/967118069/plans.ics', options).subscribe(
								result => {
									console.log('login API success');
									//window.localStorage.setItem("Token",result);
									this.x = JSON.stringify(result, null, 2);
									console.log('X: '+ this.x);
									window.localStorage.setItem("C001", this.x);
								}, error => {
									console.log("Error: "+ JSON.stringify(error, null, 2));
								});
							//Raum C007:
							this.http.get('https://aor.cs.hs-rm.de/rooms/967118075/plans.ics', options).subscribe(
								result => {
									console.log('login API success');
									//window.localStorage.setItem("Token",result);
									this.x = JSON.stringify(result, null, 2);
									console.log('X: '+ this.x);
									window.localStorage.setItem("C007", this.x);
								}, error => {
									console.log("Error: "+ JSON.stringify(error, null, 2));
								});
							//Raum C035:
							this.http.get('https://aor.cs.hs-rm.de/rooms/967321020/plans.ics', options).subscribe(
								result => {
									console.log('login API success');
									//window.localStorage.setItem("Token",result);
									this.x = JSON.stringify(result, null, 2);
									console.log('X: '+ this.x);
									window.localStorage.setItem("C035", this.x);
								}, error => {
									console.log("Error: "+ JSON.stringify(error, null, 2));
								});
							//Raum C037:
							this.http.get('https://aor.cs.hs-rm.de/rooms/967321022/plans.ics', options).subscribe(
								result => {
									console.log('login API success');
									//window.localStorage.setItem("Token",result);
									this.x = JSON.stringify(result, null, 2);
									console.log('X: '+ this.x);
									window.localStorage.setItem("C037", this.x);
								}, error => {
									console.log("Error: "+ JSON.stringify(error, null, 2));
								});
							//Raum C113:
							this.http.get('https://aor.cs.hs-rm.de/rooms/975705394/plans.ics', options).subscribe(
								result => {
									console.log('login API success');
									//window.localStorage.setItem("Token",result);
									this.x = JSON.stringify(result, null, 2);
									console.log('X: '+ this.x);
									window.localStorage.setItem("C113", this.x);
								}, error => {
									console.log("Error: "+ JSON.stringify(error, null, 2));
								});
							//Raum C213:
							this.http.get('https://aor.cs.hs-rm.de/rooms/984225074/plans.ics', options).subscribe(
								result => {
									console.log('login API success');
									//window.localStorage.setItem("Token",result);
									this.x = JSON.stringify(result, null, 2);
									console.log('X: '+ this.x);
									window.localStorage.setItem("C213", this.x);
								}, error => {
									console.log("Error: "+ JSON.stringify(error, null, 2));
								});
							//Raum C237:
							this.http.get('https://aor.cs.hs-rm.de/rooms/984360376/plans.ics', options).subscribe(
								result => {
									console.log('login API success');
									//window.localStorage.setItem("Token",result);
									this.x = JSON.stringify(result, null, 2);
									console.log('X: '+ this.x);
									window.localStorage.setItem("C237", this.x);
								}, error => {
									console.log("Error: "+ JSON.stringify(error, null, 2));
								});
							//Raum C305:
							this.http.get('https://aor.cs.hs-rm.de/rooms/992677104/plans.ics', options).subscribe(
								result => {
									console.log('login API success');
									//window.localStorage.setItem("Token",result);
									this.x = JSON.stringify(result, null, 2);
									console.log('X: '+ this.x);
									window.localStorage.setItem("C305", this.x);
								}, error => {
									console.log("Error: "+ JSON.stringify(error, null, 2));
								});
							//Raum C313:
							this.http.get('https://aor.cs.hs-rm.de/rooms/992744751/plans.ics', options).subscribe(
								result => {
									console.log('login API success');
									//window.localStorage.setItem("Token",result);
									this.x = JSON.stringify(result, null, 2);
									console.log('X: '+ this.x);
									window.localStorage.setItem("C313", this.x);
								}, error => {
									console.log("Error: "+ JSON.stringify(error, null, 2));
								});
							//Raum C361:
							this.http.get('https://aor.cs.hs-rm.de/rooms/1001264469/plans.ics', options).subscribe(
								result => {
									console.log('login API success');
									//window.localStorage.setItem("Token",result);
									this.x = JSON.stringify(result, null, 2);
									console.log('X: '+ this.x);
									window.localStorage.setItem("C361", this.x);
								}, error => {
									console.log("Error: "+ JSON.stringify(error, null, 2));
								});
							//Raum C375:
							this.http.get('https://aor.cs.hs-rm.de/rooms/1001264470/plans.ics', options).subscribe(
								result => {
									console.log('login API success');
									//window.localStorage.setItem("Token",result);
									this.x = JSON.stringify(result, null, 2);
									console.log('X: '+ this.x);
									window.localStorage.setItem("C375", this.x);
								}, error => {
									console.log("Error: "+ JSON.stringify(error, null, 2));
								});
							//Raum C377:
							this.http.get('https://aor.cs.hs-rm.de/rooms/1001264471/plans.ics', options).subscribe(
								result => {
									console.log('login API success');
									//window.localStorage.setItem("Token",result);
									this.x = JSON.stringify(result, null, 2);
									console.log('X: '+ this.x);
									window.localStorage.setItem("C377", this.x);
								}, error => {
									console.log("Error: "+ JSON.stringify(error, null, 2));
								});
							//Raum C405:
							this.http.get('https://aor.cs.hs-rm.de/rooms/1001196781/plans.ics', options).subscribe(
								result => {
									console.log('login API success');
									//window.localStorage.setItem("Token",result);
									this.x = JSON.stringify(result, null, 2);
									console.log('X: '+ this.x);
									window.localStorage.setItem("C405", this.x);
								}, error => {
									console.log("Error: "+ JSON.stringify(error, null, 2));
								});
							//Raum C407:
							this.http.get('https://aor.cs.hs-rm.de/rooms/1001196783/plans.ics', options).subscribe(
								result => {
									console.log('login API success');
									//window.localStorage.setItem("Token",result);
									this.x = JSON.stringify(result, null, 2);
									console.log('X: '+ this.x);
									window.localStorage.setItem("C407", this.x);
								}, error => {
									console.log("Error: "+ JSON.stringify(error, null, 2));
								});
							//Raum C413:
							this.http.get('https://aor.cs.hs-rm.de/rooms/1001264428/plans.ics', options).subscribe(
								result => {
									console.log('login API success');
									//window.localStorage.setItem("Token",result);
									this.x = JSON.stringify(result, null, 2);
									console.log('X: '+ this.x);
									window.localStorage.setItem("C413", this.x);
								}, error => {
									console.log("Error: "+ JSON.stringify(error, null, 2));
								});*/
							setTimeout(3);
							loader.dismiss();
							window.localStorage.setItem("benutzer", this.benutzername);
							window.localStorage.setItem("passwort", this.password);
							window.localStorage.setItem("semester", this.semester);
							console.log(window.localStorage.getItem('benutzer'));
							console.log(window.localStorage.getItem('passwort'));
							console.log(window.localStorage.getItem('semester'));
							//this.navCtrl.setRoot(HomePage);
						}, error => {
							console.log("Error: POST: "+ JSON.stringify(error, null, 2));
						});//post
				}, error => {
					console.log("Error: "+ JSON.stringify(error, null, 2));
				});//get

    } else {
      this.showLogin = true;
    }

  }
};
