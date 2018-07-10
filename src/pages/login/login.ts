import { Component } from '@angular/core';
import { NavController, AlertController, MenuController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Http, Headers } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	/********************************************************************************************
	*                                                                                           *
	*   showLogin -> bool ob Login angezeigt wird                                               *
	*   benutzername -> String mit dem Benutzernamen im Formular                                *
	*   password -> String mit dem Passwort im Formular                                         *
	*   token -> String mit dem zu ermittelnden Token                                           *
	*   x -> String für die Antwort des Servers                                                 *
	*   semester -> String für das zu ermittelnde Semester                                      *
	*   speicher -> boolean für die Checkbox -> Standard: true                                  *
	*                                                                                           *
	********************************************************************************************/
  showLogin:boolean = true;
  benutzername:string = '';
  password:string = '';
  token:string ='';
  x:string = '';
	semester:string='';
	speichern = [true];

  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public menuCtrl: MenuController,
		public alertCtrl: AlertController, private http: Http, public navParams: NavParams) {

		}

	/********************************************************************************************
  *                                                                                           *
  *   Funktion wird nach dem Laden der View ausgeführt.                                       *
  *                                                                                           *
  ********************************************************************************************/
  ionViewDidLoad() {
    console.log('Dat is die LoginPage');

		var FehlerFeld: HTMLElement = document.getElementById('Fehler');
		FehlerFeld.style.display = "none";

		var ladeicon: HTMLElement = document.getElementById('laden');
		ladeicon.style.display ="none";

		//Wenn Benutzerdaten vorhanden sind, dann Login-formular ausblenden und Login durchführen.
		if(localStorage.getItem("benutzer") != null && localStorage.getItem("passwort") != null){
			this.benutzername = localStorage.getItem("benutzer");
			this.password = localStorage.getItem("passwort");

			//Das Loginformular wird ausgeblendet:
			var formular: HTMLElement = document.getElementById('content');
			formular.style.display = "none";
			var header: HTMLElement = document.getElementById('header');
			header.style.display = "none";
			//Der Screen für den automatischen Login wird eingeblendet:
			var login: HTMLElement = document.getElementById('login');
			login.style.display = "block";

			if(this.navParams.get('item') == 'Aktualisieren'){
				this.loginFunction();
			}else{
				this.aktualisierungsAnfrage();
			}
		}
  }

	/********************************************************************************************
	*                                                                                           *
	*   Funktion blendet das Fehlerfeld des Loginformulars aus.                                 *
	*                                                                                           *
	********************************************************************************************/
  clicked(){
    var fehlerFeld: HTMLElement = document.getElementById('Fehler');
    fehlerFeld.style.display = "none";
  }

	/********************************************************************************************
	*                                                                                           *
	*   Funktion führt den Login nach dem korrekten Ausfüllen des Formulars durch.              *
	*                                                                                           *
	********************************************************************************************/
  doLogin() {
    if(this.showLogin) {
      console.log('login im gange');
			console.log("checkbox: "+this.speichern);
      if(this.benutzername.length != 8 || this.password === '') {
        var fehlerFeld: HTMLElement = document.getElementById('Fehler');
        fehlerFeld.innerText = "Benutzername oder Passwort falsch.";
        fehlerFeld.style.display = "block";
        return;
      }

			this.loginFunction();
			var ladeicon: HTMLElement = document.getElementById('laden');
			ladeicon.style.display ="block";

    } else {
      this.showLogin = true;
    }

  }

	/********************************************************************************************
	*                                                                                           *
	*   Funktion filtert aus dem übergebenen String das Token für die                           *
	*   Anmeldung beim Server.                                                                  *
	*   text -> String mit einem Text, in der das Token steckt                                  *
	*                                                                                           *
	*   RETURN-Wert: Das csrf-Token                                                             *
	*                                                                                           *
	********************************************************************************************/
	private get_Token(text:string) {
		return text.substring(text.indexOf("csrf-token")+23, text.indexOf("csrf-token")+111);
	}

	/********************************************************************************************
	*                                                                                           *
	*   Funktion filtert aus dem übergebenen String das Semester für die                        *
	*   Anmeldung beim Server.                                                                  *
	*   text -> String mit einem Text, in der das Semester steckt                               *
	*                                                                                           *
	*   RETURN-Wert: Die ID des Semesters                                                       *
	*                                                                                           *
	********************************************************************************************/
	private get_Semester(text:string) {
		return text.substring(text.indexOf("option selected")+37, text.indexOf("option selected")+46);
	}

	/********************************************************************************************
	*                                                                                           *
	*   Funktion filtert aus dem übergebenen String einen bestimmten String heraus,             *
	*   um festzustellen, ob die Anmeldung erfolgreich war.                                     *
	*   text -> String mit einem Text, in dem die Antwort des Servers steckt                    *
	*                                                                                           *
	*   RETURN-Wert: Falls Anmeldung erfolgreich -1, sonst eine Zahl >= 0                       *
	*                                                                                           *
	********************************************************************************************/
	private get_Header(text:string) {
		return text.indexOf("Ihre Anmeldung war leider nicht erfolgreich, bitte überprüfen Sie ihre Login-Daten");
	}

	/********************************************************************************************
	*                                                                                           *
	*   Funktion gibt eine Fehlermeldung aus.                                                   *
	*   meldung1 -> String der ersten Fehlermeldung                                             *
	*   meldung2 -> String der zweiten Fehlermeldung                                             *
	*                                                                                           *
	********************************************************************************************/
	private fehler(meldung1:string, meldung2:string){
		var fehlerFeld: HTMLElement = document.getElementById('Fehler');
		fehlerFeld.innerText = meldung1;
		fehlerFeld.style.display = "block";
		var fehlerFeldZwei: HTMLElement = document.getElementById('Fehler2');
		fehlerFeldZwei.innerText = meldung2;
		fehlerFeldZwei.style.display = "block";
		var ladeicon: HTMLElement = document.getElementById('laden');
		ladeicon.style.display ="none";
	}

	/********************************************************************************************
	*                                                                                           *
	*   Funktion filtert aus dem übergebenen String den Quelltext der ics-Dateien heraus        *
	*   text -> String mit der Antwort des Servers, in der der Quelltext steckt                 *
	*                                                                                           *
	*   RETURN-Wert: Der Inhalt der ics-Datei                                                   *
	*                                                                                           *
	********************************************************************************************/
	private get_Plan(text:string) {
		if(-1 == text.indexOf("DOCTYPE")){
			return text.substring(text.indexOf("_body")+9, text.indexOf("status")-6);
		}
		//Sollte im String "DOCTYPE" stehen, dann ist das nicht der Inhalt der ics-Datei:
		this.fehler("Fehler beim Herunterladen der Daten. Bitte versuche es erneut",
		"Fehler beim Herunterladen der Daten. Bitte App neu starten");
		return "-1";
	}

	/********************************************************************************************
	*                                                                                           *
	*   Funktion lädt die ics-Dateien herunter und speichert sie im localStorage                *
	*   options -> der aus der loginFunction übergebenen Header für die get-Anfragen            *
	*   stelle -> Zahl, die die Anzahl der Downloads enthält (Beginn bei 0 -> 1. Download)      *
	*   loader -> Loader                                                                        *
	*                                                                                           *
	*   RETURN-Wert: -1 im Fehlerfall                                                           *
	*                                                                                           *
	********************************************************************************************/
	private download(options:any, stelle:number){
		//Arrays mit der id des Raumplans und den Räumen:
		var id:string[] = [
			"1001264429","1001264431","454131924","454131925","454131926","454131927","454131928","454131930","454131931",
			"967118069","967118075","967321020","967321022","975705394","984225074","984360376","992677104","992744751",
			"1001264469","1001264470","1001264471","1001196781","1001196783","1001264428"
		];

		var raum:string[] = [
			"D01","D02","D11","D12","D13","D14","D15","D17","D18",
			"C001","C007","C035","C037","C113","C213","C237","C305","C313","C361","C375","C377","C405","C407","C413"
		];

		//Solange nicht alle Raumpläne heruntergeladen wurden:
		if(stelle < id.length){
			//Raumplan über id herunterladen
			this.http.get('https://aor.cs.hs-rm.de/rooms/'+id[stelle]+'/plans.ics', options).subscribe(
				result => {
					this.x = JSON.stringify(result, null, 2);
					this.x = this.get_Plan(this.x);
					if("-1" == this.x){
						return -1;
					}
					//Raumplan abspeichern
					localStorage.setItem(raum[stelle], this.x);
					//nächsten Raumplan:
					this.download(options,stelle+1);
				}, error => {
					console.log("Error: "+ JSON.stringify(error, null, 2));
				});
		}else{
			if(this.speichern){
				localStorage.setItem("benutzer", this.benutzername);
				localStorage.setItem("passwort", this.password);
				let toast = this.toastCtrl.create({
						message:  "Benutzerdaten wurden gespeichert! Du kannst deine Benutzerdaten jederzeit löschen.",
						duration: 3000,
						position: 'middle',
						cssClass: "my-toast"
				});
				toast.present();
			}
			this.navCtrl.setRoot(HomePage);
		}
	}

	/********************************************************************************************
	*                                                                                           *
	*   Funktion führt den Login durch.                                                         *
	*                                                                                           *
	*   RETURN-Wert: -1 im Fehlerfall                                                           *
	*                                                                                           *
	********************************************************************************************/
	private loginFunction() {
		//Header für die Anmeldung
		let options = {
			headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
			withCredentials: true
		};

		//GET-Anfrage um den Content der Seite zu bekommen, damit das Token gefunden werden kann
		this.http.get('https://aor.cs.hs-rm.de/login', options).subscribe(
			result => {
				this.x = JSON.stringify(result, null, 2);
				this.token = this.get_Token(this.x);
				this.semester = this.get_Semester(this.x);
				this.token = encodeURIComponent(this.token);

				//Der Body für die Anmeldung:
				var body = 'utf8=%E2%9C%93' +
				'&authenticity_token=' + this.token +
				'&login[account]=' + this.benutzername +
				'&login[password]=' + this.password +
				'&login[term_id]=' + this.semester +
				'&commit=Anmeldung';

				this.http.post('https://aor.cs.hs-rm.de/login', body, options).subscribe(
					result => {
						if(-1 == this.get_Header(JSON.stringify(result, null, 2))){

							var fehlerFeldZwei: HTMLElement = document.getElementById('Fehler2');
							fehlerFeldZwei.innerText = "Login war erfolgreich. Daten werden geladen...";
							fehlerFeldZwei.style.display = "block";
							var lademessage:HTMLElement = document.getElementById('lademessage');
							lademessage.innerText = "Login war erfolgreich. Daten werden geladen...";

							//Wenn die Anmeldung erfolgreich war, werden die Raumpläne heruntergeladen:
							this.download(options,0);
						} else{
							this.fehler("Benutzername oder Passwort falsch.", "Login fehlgeschlagen. Bitte starte die App erneut.");
							return -1;
						}
					}, error => {
						//console.log("Error: POST: "+ JSON.stringify(error, null, 2));;
						this.fehler("Benutzername oder Passwort falsch.", "Login fehlgeschlagen. Bitte starte die App erneut.");
						return -1;

					});//post
			}, error => {
				console.log("Error: "+ JSON.stringify(error, null, 2));
			});//get
	}

	/********************************************************************************************
	*                                                                                           *
	*   Funktion prüft ob der Benutzer zuletzt zu Beginn des letzten Semesters aufgefordert     *
	*   wurde zu aktualisieren.                                                                 *
	*   Beispiel:                                                                               *
	*   Der Benutzer öffnet die App am 3.4.2018 also zu Beginn des Sommersemesters.             *
	*   Im localStorage steht ein Datum, an dem er das letzte Mal aufgefordert wurde die        *
	*   Raumpläne zu aktualisieren.                                                             *
	*   In diesem Beispiel wurde der Benutzer am 4.10.2017 zuletzt aufgefordert.                *
	*   Also liegt der letzte Aktualisierungsvorgang im letzten Semester.                       *
	*   Der Benutzer kann natürlich während des letzten Semesters auch nach dem 4.10.2017       *
	*   über das Menü aktualisiert haben, aber das spielt hier keine Rolle.                     *
	*                                                                                           *
	*   RETURN-Wert: 0 wenn kein neues Semester begonnen hat, sonst 1                           *
	*                                                                                           *
	********************************************************************************************/
	private getSemesterBeginn(){
		var jetzt = new Date();
		var monat = jetzt.getMonth();
		var tag = jetzt.getDate();

		monat++;

		if(localStorage.getItem('aktuell') != null){
			var old = new Date(localStorage.getItem('aktuell'));
			switch(monat){
				//Wenn der aktuelle Monat April ist und zuletzt im Oktober
				//durch den Alert aktualisiert wurde wird 1 zurückgegeben
				case 4:
				if(old.getMonth()+1 == 10){
					return 1;
				}else{
					return 0;
				}
				//Wenn der aktuelle Monat Oktober ist und zuletzt im April
				//durch den Alert aktualisiert wurde wird 1 zurückgegeben
				case 10:
				if(old.getMonth()+1 == 4){
					return 1;
				}else{
					return 0;
				}
			}
		}

		if(monat == 4 && (tag >= 1 && tag <= 10) || monat == 10 && (tag >= 1 && tag <= 10)){
			//Wenn das Datum zwischen dem 1.4. und dem 10.4.
			//oder zwischen dem 1.10. und dem 10.10. liegt hat ein neues Semester begonnen!
			console.log("1");
			return 1;
		}else{
			console.log("0");
			return 0;
		}
	}

	/********************************************************************************************
	*                                                                                           *
	*   Funktion zeigt entweder einen Aktualisierungshinweis an oder leitet auf die             *
	*   Startseite weiter.                                                                      *
	*                                                                                           *
	********************************************************************************************/
	aktualisierungsAnfrage(){
		//Es wird ermittelt ob ein Semester begonnen hat:
		//Wenn ja, wird außerdem noch überprüft, ob bereits durch diesen Alert zu Semesterbeginn
		//aktualisiert wurde.
		var aktualisieren:number = this.getSemesterBeginn();
		if(aktualisieren == 1){
			let alert = this.alertCtrl.create({
				title: 'Aktualisieren',
				message: 'Ein neues Semester hat begonnen. Möchtest du die Raumpläne aktualisieren?',
				buttons: [
					{
						text: 'Nein',
						role: 'cancel',
						handler: () => {
							alert = null;
							this.navCtrl.setRoot(HomePage);
						}
					},
					{
						text: 'Ja',
						handler: () => {
							//Es wird das Datum des Aktualisierungshinweises gesetzt:
							var jetzt = new Date("Tue Apr 03 2018 11:09:54 GMT+0200 (CEST)");
							localStorage.setItem('aktuell', jetzt.toString());
							this.loginFunction();
						}
					}
				]
			});
			alert.present();
		}else{
			//Wenn nicht aktualisiert werden muss:
			this.navCtrl.setRoot(HomePage);
		}
	}

	/********************************************************************************************
	*                                                                                           *
	*   Funktion setzt das Sidemenü für die Loginseite aus.                                     *
	*                                                                                           *
	********************************************************************************************/
	ionViewWillEnter() {
       this.menuCtrl.swipeEnable( false )
   }

	/********************************************************************************************
 	*                                                                                           *
 	*   Funktion setzt das Sidemenü nach der Loginseite aktiv.                                  *
 	*                                                                                           *
 	********************************************************************************************/
   ionViewDidLeave() {
       this.menuCtrl.swipeEnable( true )
   }
};
