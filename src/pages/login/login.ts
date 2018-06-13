import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Http, Headers, RequestOptions } from '@angular/http';
import ICAL from "ical.js";

function get_Token(text:string) {
	//console.log("text.indexOf(authenticity_token, 600): "+text.indexOf("authenticity_token", 600));
	return text.substring(text.indexOf("authenticity_token", 600)+29, text.indexOf("authenticity_token", 600)+117);
}

function get_Semester(text:string) {
	//console.log("text.indexOf(option selected): "+text.indexOf("option selected"));
	return text.substring(text.indexOf("option selected")+37, text.indexOf("option selected")+46);
}

function get_Header(text:string) {
	//console.log("text.indexOf(Ihre Anmeldung war leider nicht erfolgreich, bitte überprüfen Sie ihre Login-Daten): "+text.indexOf("Ihre Anmeldung war leider nicht erfolgreich, bitte überprüfen Sie ihre Login-Daten"));
	return text.indexOf("Ihre Anmeldung war leider nicht erfolgreich, bitte überprüfen Sie ihre Login-Daten");
}

function get_Plan(text:string) {
	return text.substring(text.indexOf("_body")+9, text.indexOf("Cache-Control")-78);
}

function timeout(zahl:number) {
	var start:any = new Date().getTime();
	var i:number;
	for(i = 0; i < 1e7; i++){
		if((new Date().getTime() - start) > zahl*1000){
			break;
		}
	}
}

function loginFunction(element:any) {
	let options = {
		headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
		withCredentials: true
	};

	var zahl: number = 0;
	for(var i:number = 0; i < 20; i++){
	element.http.get('https://aor.cs.hs-rm.de/login', options).subscribe(
		result => {
			console.log('login API success');

			element.x = JSON.stringify(result, null, 2);
			//console.log('X: '+ element.x);
			element.token = get_Token(element.x);
			element.semester = get_Semester(element.x);
			//console.log('Semester: '+ element.semester);
			//console.log('Token: '+ element.token);

			var body = 'utf8=%E2%9C%93' +
			'&authenticity_token=' + element.token +
			'&login[account]=' + element.benutzername +
			'&login[password]=' + element.password +
			'&login[term_id]=' + element.semester +
			'&commit=Anmeldung';

			//console.log("Body: "+ body);

			element.http.post('https://aor.cs.hs-rm.de/login', body, options).subscribe(
				result => {
					//console.log("POST: "+ JSON.stringify(result, null, 2));
					//console.log("Header: "+ get_Header(JSON.stringify(result, null, 2)));
					if(-1 == get_Header(JSON.stringify(result, null, 2))){

						let loader = element.loadingCtrl.create({
							content: "Daten werden geladen..."
						});
						loader.present();

						//Falls vorhanden auch die Reservierungspläne herunterladen
						//Raum D01:
						element.http.get('https://aor.cs.hs-rm.de/rooms/1001264429/plans.ics', options).subscribe(
							result => {
								console.log('login API success');
								element.x = JSON.stringify(result, null, 2);
								element.x = get_Plan(element.x);
								window.localStorage.setItem("D01", element.x);



								//console.log("D01: "+window.localStorage.getItem("D01"));
							}, error => {
								//console.log("Error: "+ JSON.stringify(error, null, 2));
							});
						//Raum D02:
						element.http.get('https://aor.cs.hs-rm.de/rooms/1001264431/plans.ics', options).subscribe(
							result => {
								//console.log('login API success');
								element.x = JSON.stringify(result, null, 2);
								element.x = get_Plan(element.x);
								window.localStorage.setItem("D02", element.x);
								//console.log("D02: "+window.localStorage.getItem("D02"));
							}, error => {
								console.log("Error: "+ JSON.stringify(error, null, 2));
							});
						//Raum D11:
						element.http.get('https://aor.cs.hs-rm.de/rooms/454131924/plans.ics', options).subscribe(
							result => {
								//console.log('login API success');
								element.x = JSON.stringify(result, null, 2);
								element.x = get_Plan(element.x);
								window.localStorage.setItem("D11", element.x);
								//console.log("D11: "+window.localStorage.getItem("D11"));
							}, error => {
								console.log("Error: "+ JSON.stringify(error, null, 2));
							});
						//Raum D12:
						element.http.get('https://aor.cs.hs-rm.de/rooms/454131925/plans.ics', options).subscribe(
							result => {
								//console.log('login API success');
								element.x = JSON.stringify(result, null, 2);
								element.x = get_Plan(element.x);
								window.localStorage.setItem("D12", element.x);
								//console.log("D12: "+window.localStorage.getItem("D12"));
							}, error => {
								console.log("Error: "+ JSON.stringify(error, null, 2));
							});
						//Raum D13:
						element.http.get('https://aor.cs.hs-rm.de/rooms/454131926/plans.ics', options).subscribe(
							result => {
								//console.log('login API success');
								element.x = JSON.stringify(result, null, 2);
								element.x = get_Plan(element.x);
								window.localStorage.setItem("D13", element.x);
								//console.log("D13: "+window.localStorage.getItem("D13"));
							}, error => {
								console.log("Error: "+ JSON.stringify(error, null, 2));
							});
						//Raum D14:
						element.http.get('https://aor.cs.hs-rm.de/rooms/454131927/plans.ics', options).subscribe(
							result => {
								//console.log('login API success');
								element.x = JSON.stringify(result, null, 2);
								element.x = get_Plan(element.x);
								window.localStorage.setItem("D14", element.x);
								//console.log("D14: "+window.localStorage.getItem("D14"));
							}, error => {
								console.log("Error: "+ JSON.stringify(error, null, 2));
							});
						//Raum D15:
						element.http.get('https://aor.cs.hs-rm.de/rooms/454131928/plans.ics', options).subscribe(
							result => {
								//console.log('login API success');
								element.x = JSON.stringify(result, null, 2);
								element.x = get_Plan(element.x);
								window.localStorage.setItem("D15", element.x);
								//console.log("D15: "+window.localStorage.getItem("D15"));
							}, error => {
								console.log("Error: "+ JSON.stringify(error, null, 2));
							});
						//Raum D17:
						element.http.get('https://aor.cs.hs-rm.de/rooms/454131930/plans.ics', options).subscribe(
							result => {
								//console.log('login API success');
								element.x = JSON.stringify(result, null, 2);
								element.x = get_Plan(element.x);
								window.localStorage.setItem("D17", element.x);
								//console.log("D17: "+window.localStorage.getItem("D17"));
							}, error => {
								console.log("Error: "+ JSON.stringify(error, null, 2));
							});
						//Raum D18:
						element.http.get('https://aor.cs.hs-rm.de/rooms/454131931/plans.ics', options).subscribe(
							result => {
								//console.log('login API success');
								element.x = JSON.stringify(result, null, 2);
								element.x = get_Plan(element.x);
								window.localStorage.setItem("D18", element.x);
								//console.log("D18: "+window.localStorage.getItem("D18"));
							}, error => {
								console.log("Error: "+ JSON.stringify(error, null, 2));
							});
						//Raum C001:
						element.http.get('https://aor.cs.hs-rm.de/rooms/967118069/plans.ics', options).subscribe(
							result => {
								//console.log('login API success');
								element.x = JSON.stringify(result, null, 2);
								element.x = get_Plan(element.x);
								window.localStorage.setItem("C001", element.x);
								//console.log("C001: "+window.localStorage.getItem("C001"));
							}, error => {
								console.log("Error: "+ JSON.stringify(error, null, 2));
							});
						//Raum C007:
						element.http.get('https://aor.cs.hs-rm.de/rooms/967118075/plans.ics', options).subscribe(
							result => {
								//console.log('login API success');
								element.x = JSON.stringify(result, null, 2);
								element.x = get_Plan(element.x);
								window.localStorage.setItem("C007", element.x);
								//console.log("C007: "+window.localStorage.getItem("C007"));
							}, error => {
								console.log("Error: "+ JSON.stringify(error, null, 2));
							});
						//Raum C035:
						element.http.get('https://aor.cs.hs-rm.de/rooms/967321020/plans.ics', options).subscribe(
							result => {
								//console.log('login API success');
								element.x = JSON.stringify(result, null, 2);
								element.x = get_Plan(element.x);
								window.localStorage.setItem("C035", element.x);
								//console.log("C035: "+window.localStorage.getItem("C035"));
							}, error => {
								console.log("Error: "+ JSON.stringify(error, null, 2));
							});
						//Raum C037:
						element.http.get('https://aor.cs.hs-rm.de/rooms/967321022/plans.ics', options).subscribe(
							result => {
								//console.log('login API success');
								element.x = JSON.stringify(result, null, 2);
								element.x = get_Plan(element.x);
								window.localStorage.setItem("C037", element.x);
								//console.log("C037: "+window.localStorage.getItem("C037"));
							}, error => {
								console.log("Error: "+ JSON.stringify(error, null, 2));
							});
						//Raum C113:
						element.http.get('https://aor.cs.hs-rm.de/rooms/975705394/plans.ics', options).subscribe(
							result => {
								//console.log('login API success');
								element.x = JSON.stringify(result, null, 2);
								element.x = get_Plan(element.x);
								window.localStorage.setItem("C113", element.x);
								//console.log("C113: "+window.localStorage.getItem("C113"));
							}, error => {
								console.log("Error: "+ JSON.stringify(error, null, 2));
							});
						//Raum C213:
						element.http.get('https://aor.cs.hs-rm.de/rooms/984225074/plans.ics', options).subscribe(
							result => {
								//console.log('login API success');
								element.x = JSON.stringify(result, null, 2);
								element.x = get_Plan(element.x);
								window.localStorage.setItem("C213", element.x);
								//console.log("C213: "+window.localStorage.getItem("C213"));
							}, error => {
								console.log("Error: "+ JSON.stringify(error, null, 2));
							});
						//Raum C237:
						element.http.get('https://aor.cs.hs-rm.de/rooms/984360376/plans.ics', options).subscribe(
							result => {
								//console.log('login API success');
								element.x = JSON.stringify(result, null, 2);
								element.x = get_Plan(element.x);
								window.localStorage.setItem("C237", element.x);
								//console.log("C237: "+window.localStorage.getItem("C237"));
							}, error => {
								console.log("Error: "+ JSON.stringify(error, null, 2));
							});
						//Raum C305:
						element.http.get('https://aor.cs.hs-rm.de/rooms/992677104/plans.ics', options).subscribe(
							result => {
								//console.log('login API success');
								element.x = JSON.stringify(result, null, 2);
								element.x = get_Plan(element.x);
								window.localStorage.setItem("C305", element.x);
								//console.log("C305: "+window.localStorage.getItem("C305"));
							}, error => {
								console.log("Error: "+ JSON.stringify(error, null, 2));
							});
						//Raum C313:
						element.http.get('https://aor.cs.hs-rm.de/rooms/992744751/plans.ics', options).subscribe(
							result => {
								//console.log('login API success');
								element.x = JSON.stringify(result, null, 2);
								element.x = get_Plan(element.x);
								window.localStorage.setItem("C313", element.x);
								//console.log("C313: "+window.localStorage.getItem("C313"));
							}, error => {
								console.log("Error: "+ JSON.stringify(error, null, 2));
							});
						//Raum C361:
						element.http.get('https://aor.cs.hs-rm.de/rooms/1001264469/plans.ics', options).subscribe(
							result => {
								//console.log('login API success');
								element.x = JSON.stringify(result, null, 2);
								element.x = get_Plan(element.x);
								window.localStorage.setItem("C361", element.x);
								//console.log("C361: "+window.localStorage.getItem("C361"));
							}, error => {
								console.log("Error: "+ JSON.stringify(error, null, 2));
							});
						//Raum C375:
						element.http.get('https://aor.cs.hs-rm.de/rooms/1001264470/plans.ics', options).subscribe(
							result => {
								//console.log('login API success');
								element.x = JSON.stringify(result, null, 2);
								element.x = get_Plan(element.x);
								window.localStorage.setItem("C375", element.x);
								//console.log("C375: "+window.localStorage.getItem("C375"));
							}, error => {
								console.log("Error: "+ JSON.stringify(error, null, 2));
							});
						//Raum C377:
						element.http.get('https://aor.cs.hs-rm.de/rooms/1001264471/plans.ics', options).subscribe(
							result => {
								//console.log('login API success');
								element.x = JSON.stringify(result, null, 2);
								element.x = get_Plan(element.x);
								window.localStorage.setItem("C377", element.x);
								//console.log("C377: "+window.localStorage.getItem("C377"));
							}, error => {
								console.log("Error: "+ JSON.stringify(error, null, 2));
							});
						//Raum C405:
						element.http.get('https://aor.cs.hs-rm.de/rooms/1001196781/plans.ics', options).subscribe(
							result => {
								//console.log('login API success');
								element.x = JSON.stringify(result, null, 2);
								element.x = get_Plan(element.x);
								window.localStorage.setItem("C405", element.x);
								//console.log("C405: "+window.localStorage.getItem("C405"));
							}, error => {
								console.log("Error: "+ JSON.stringify(error, null, 2));
							});
						//Raum C407:
						element.http.get('https://aor.cs.hs-rm.de/rooms/1001196783/plans.ics', options).subscribe(
							result => {
								//console.log('login API success');
								element.x = JSON.stringify(result, null, 2);
								element.x = get_Plan(element.x);
								window.localStorage.setItem("C407", element.x);
								//console.log("C407: "+window.localStorage.getItem("C407"));
							}, error => {
								console.log("Error: "+ JSON.stringify(error, null, 2));
							});
						//Raum C413:
						element.http.get('https://aor.cs.hs-rm.de/rooms/1001264428/plans.ics', options).subscribe(
							result => {
								//console.log('login API success');
								element.x = JSON.stringify(result, null, 2);
								element.x = get_Plan(element.x);
								window.localStorage.setItem("C413", element.x);
								//console.log("C413: "+window.localStorage.getItem("C413"));
							}, error => {
								console.log("Error: "+ JSON.stringify(error, null, 2));
							});
						timeout(4);
						loader.dismiss();
						window.localStorage.setItem("benutzer", element.benutzername);
						window.localStorage.setItem("passwort", element.password);
						console.log("Benutzername und Passwort gespeichert.");
						console.log(window.localStorage.getItem("benutzer"));
						element.navCtrl.setRoot(HomePage);
					} else{
						var fehlerFeld: HTMLElement = document.getElementById('Fehler');
						fehlerFeld.innerText = "Benutzername oder Passwort falsch.";
						fehlerFeld.style.display = "block";
						var fehlerFeldZwei: HTMLElement = document.getElementById('Fehler2');
						fehlerFeldZwei.innerText = "Login fehlgeschlagen. Bitte die App erneut starten.";
						fehlerFeldZwei.style.display = "block";
						var ladeicon: HTMLElement = document.getElementById('laden');
						ladeicon.style.display ="none";
						return;
					}
				}, error => {
					console.log("Error: POST: "+ JSON.stringify(error, null, 2));
					console.log("Fehler "+zahl);
					zahl++;
					//Überprüfen ob alle Versuche gescheitert sind:
					if(zahl >= 20){
						var fehlerFeld: HTMLElement = document.getElementById('Fehler');
						fehlerFeld.innerText = "Benutzername oder Passwort falsch.";
						fehlerFeld.style.display = "block";
						var fehlerFeldZwei: HTMLElement = document.getElementById('Fehler2');
						fehlerFeldZwei.innerText = "Login fehlgeschlagen. Bitte starte die App erneut.";
						fehlerFeldZwei.style.display = "block";
						var ladeicon: HTMLElement = document.getElementById('laden');
						ladeicon.style.display ="none";
						return;
					}
				});//post
		}, error => {
			console.log("Error: "+ JSON.stringify(error, null, 2));
		});//get

	}//for
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

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public alertCtrl: AlertController, public loadingCtrl:LoadingController, private http: Http) {}

  ionViewDidLoad() {
    console.log('Dat is die LoginPage');
		//Hier überprüfen:
		//-ob schon Benutzerdaten vorhanden sind.
		//Wenn ja, dann Login-formular ausblenden und Login durchführen.
		var FehlerFeld: HTMLElement = document.getElementById('Fehler');
		FehlerFeld.style.display = "none";

		var ladeicon: HTMLElement = document.getElementById('laden');
		ladeicon.style.display ="none";

		//Nachfolgenden Abschnitt einkommentieren um automatisch angemeldet zu werden:
		if(window.localStorage.getItem("benutzer") != null && window.localStorage.getItem("passwort") != null){
			this.benutzername = window.localStorage.getItem("benutzer");
			this.password = window.localStorage.getItem("passwort");
			timeout(3);
			var formular: HTMLElement = document.getElementById('content');
			formular.style.display = "none";
			var header: HTMLElement = document.getElementById('header');
			header.style.display = "none";
			var login: HTMLElement = document.getElementById('login');
			login.style.display = "block";
			loginFunction(this);
			//Falls man beim Starten der App nicht den Login machen möchte einfach die loginFunction auskommentieren und diese Zeile einkommentieren:
			//this.navCtrl.setRoot(HomePage);

		}
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


			loginFunction(this);
			var ladeicon: HTMLElement = document.getElementById('laden');
			ladeicon.style.display ="block";

    } else {
      this.showLogin = true;
    }

  }

	testLogin() {
		//Um einfach ohne Login auf die Startseite zu kommen diese Funktion verwenden:
		this.navCtrl.setRoot(HomePage);
	}

	ionViewWillEnter() {

       this.menuCtrl.swipeEnable( false )
   }

   ionViewDidLeave() {

       this.menuCtrl.swipeEnable( true )
   }
};
