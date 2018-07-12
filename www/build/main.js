webpackJsonp([3],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(159);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginPage = /** @class */ (function () {
    function LoginPage(toastCtrl, navCtrl, menuCtrl, alertCtrl, http, navParams) {
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.navParams = navParams;
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
        this.showLogin = true;
        this.benutzername = '';
        this.password = '';
        this.token = '';
        this.x = '';
        this.semester = '';
        this.speichern = [true];
    }
    /********************************************************************************************
  *                                                                                           *
  *   Funktion wird nach dem Laden der View ausgeführt.                                       *
  *                                                                                           *
  ********************************************************************************************/
    LoginPage.prototype.ionViewDidLoad = function () {
        var FehlerFeld = document.getElementById('Fehler');
        FehlerFeld.style.display = "none";
        var ladeicon = document.getElementById('laden');
        ladeicon.style.display = "none";
        //Wenn Benutzerdaten vorhanden sind, dann Login-formular ausblenden und Login durchführen.
        if (localStorage.getItem("benutzer") != null && localStorage.getItem("passwort") != null) {
            this.benutzername = localStorage.getItem("benutzer");
            this.password = localStorage.getItem("passwort");
            //Das Loginformular wird ausgeblendet:
            var formular = document.getElementById('content');
            formular.style.display = "none";
            var header = document.getElementById('header');
            header.style.display = "none";
            //Der Screen für den automatischen Login wird eingeblendet:
            var login = document.getElementById('login');
            login.style.display = "block";
            if (this.navParams.get('item') == 'Aktualisieren') {
                this.loginFunction();
            }
            else {
                this.aktualisierungsAnfrage();
            }
        }
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion blendet das Fehlerfeld des Loginformulars aus.                                 *
    *                                                                                           *
    ********************************************************************************************/
    LoginPage.prototype.clicked = function () {
        var fehlerFeld = document.getElementById('Fehler');
        fehlerFeld.style.display = "none";
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion führt den Login nach dem korrekten Ausfüllen des Formulars durch.              *
    *                                                                                           *
    ********************************************************************************************/
    LoginPage.prototype.doLogin = function () {
        if (this.showLogin) {
            if (this.benutzername.length != 8 || this.password === '') {
                var fehlerFeld = document.getElementById('Fehler');
                fehlerFeld.innerText = "Benutzername oder Passwort falsch.";
                fehlerFeld.style.display = "block";
                return;
            }
            this.loginFunction();
            var ladeicon = document.getElementById('laden');
            ladeicon.style.display = "block";
        }
        else {
            this.showLogin = true;
        }
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion filtert aus dem übergebenen String das Token für die                           *
    *   Anmeldung beim Server.                                                                  *
    *   text -> String mit einem Text, in der das Token steckt                                  *
    *                                                                                           *
    *   RETURN-Wert: Das csrf-Token                                                             *
    *                                                                                           *
    ********************************************************************************************/
    LoginPage.prototype.get_Token = function (text) {
        return text.substring(text.indexOf("csrf-token") + 23, text.indexOf("csrf-token") + 111);
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion filtert aus dem übergebenen String das Semester für die                        *
    *   Anmeldung beim Server.                                                                  *
    *   text -> String mit einem Text, in der das Semester steckt                               *
    *                                                                                           *
    *   RETURN-Wert: Die ID des Semesters                                                       *
    *                                                                                           *
    ********************************************************************************************/
    LoginPage.prototype.get_Semester = function (text) {
        return text.substring(text.indexOf("option selected") + 37, text.indexOf("option selected") + 46);
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion filtert aus dem übergebenen String einen bestimmten String heraus,             *
    *   um festzustellen, ob die Anmeldung erfolgreich war.                                     *
    *   text -> String mit einem Text, in dem die Antwort des Servers steckt                    *
    *                                                                                           *
    *   RETURN-Wert: Falls Anmeldung erfolgreich -1, sonst eine Zahl >= 0                       *
    *                                                                                           *
    ********************************************************************************************/
    LoginPage.prototype.get_Header = function (text) {
        return text.indexOf("Ihre Anmeldung war leider nicht erfolgreich, bitte überprüfen Sie ihre Login-Daten");
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion gibt eine Fehlermeldung aus.                                                   *
    *   meldung1 -> String der ersten Fehlermeldung                                             *
    *   meldung2 -> String der zweiten Fehlermeldung                                             *
    *                                                                                           *
    ********************************************************************************************/
    LoginPage.prototype.fehler = function (meldung1, meldung2) {
        var fehlerFeld = document.getElementById('Fehler');
        fehlerFeld.innerText = meldung1;
        fehlerFeld.style.display = "block";
        var fehlerFeldZwei = document.getElementById('Fehler2');
        fehlerFeldZwei.innerText = meldung2;
        fehlerFeldZwei.style.display = "block";
        var ladeicon = document.getElementById('laden');
        ladeicon.style.display = "none";
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion filtert aus dem übergebenen String den Quelltext der ics-Dateien heraus        *
    *   text -> String mit der Antwort des Servers, in der der Quelltext steckt                 *
    *                                                                                           *
    *   RETURN-Wert: Der Inhalt der ics-Datei                                                   *
    *                                                                                           *
    ********************************************************************************************/
    LoginPage.prototype.get_Plan = function (text) {
        if (-1 == text.indexOf("DOCTYPE")) {
            return text.substring(text.indexOf("_body") + 9, text.indexOf("status") - 6);
        }
        //Sollte im String "DOCTYPE" stehen, dann ist das nicht der Inhalt der ics-Datei:
        this.fehler("Fehler beim Herunterladen der Daten. Bitte versuche es erneut", "Fehler beim Herunterladen der Daten. Bitte App neu starten");
        return "-1";
    };
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
    LoginPage.prototype.download = function (options, stelle) {
        var _this = this;
        //Arrays mit der id des Raumplans und den Räumen:
        var id = [
            "1001264429", "1001264431", "454131924", "454131925", "454131926", "454131927", "454131928", "454131930", "454131931",
            "967118069", "967118075", "967321020", "967321022", "975705394", "984225074", "984360376", "992677104", "992744751",
            "1001264469", "1001264470", "1001264471", "1001196781", "1001196783", "1001264428"
        ];
        var raum = [
            "D01", "D02", "D11", "D12", "D13", "D14", "D15", "D17", "D18",
            "C001", "C007", "C035", "C037", "C113", "C213", "C237", "C305", "C313", "C361", "C375", "C377", "C405", "C407", "C413"
        ];
        //Solange nicht alle Raumpläne heruntergeladen wurden:
        if (stelle < id.length) {
            //Raumplan über id herunterladen
            this.http.get('https://aor.cs.hs-rm.de/rooms/' + id[stelle] + '/plans.ics', options).subscribe(function (result) {
                _this.x = JSON.stringify(result, null, 2);
                _this.x = _this.get_Plan(_this.x);
                if ("-1" == _this.x) {
                    return -1;
                }
                //Raumplan abspeichern
                localStorage.setItem(raum[stelle], _this.x);
                //nächsten Raumplan:
                _this.download(options, stelle + 1);
            }, function (error) {
                _this.fehler("Fehler beim Laden der Daten.", "Bitte starte die App erneut.");
            });
        }
        else {
            if (this.speichern && localStorage.getItem("benutzer") == null) {
                localStorage.setItem("benutzer", this.benutzername);
                localStorage.setItem("passwort", this.password);
                var toast = this.toastCtrl.create({
                    message: "Benutzerdaten wurden gespeichert! Du kannst deine Benutzerdaten jederzeit löschen.",
                    duration: 3000,
                    position: 'middle',
                    cssClass: "my-toast"
                });
                toast.present();
            }
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
        }
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion führt den Login durch.                                                         *
    *                                                                                           *
    *   RETURN-Wert: -1 im Fehlerfall                                                           *
    *                                                                                           *
    ********************************************************************************************/
    LoginPage.prototype.loginFunction = function () {
        var _this = this;
        //Header für die Anmeldung
        var options = {
            headers: new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/x-www-form-urlencoded' }),
            withCredentials: true
        };
        //GET-Anfrage um den Content der Seite zu bekommen, damit das Token gefunden werden kann
        this.http.get('https://aor.cs.hs-rm.de/login', options).subscribe(function (result) {
            _this.x = JSON.stringify(result, null, 2);
            _this.token = _this.get_Token(_this.x);
            _this.semester = _this.get_Semester(_this.x);
            _this.token = encodeURIComponent(_this.token);
            //Der Body für die Anmeldung:
            var body = 'utf8=%E2%9C%93' +
                '&authenticity_token=' + _this.token +
                '&login[account]=' + _this.benutzername +
                '&login[password]=' + _this.password +
                '&login[term_id]=' + _this.semester +
                '&commit=Anmeldung';
            _this.http.post('https://aor.cs.hs-rm.de/login', body, options).subscribe(function (result) {
                if (-1 == _this.get_Header(JSON.stringify(result, null, 2))) {
                    var fehlerFeldZwei = document.getElementById('Fehler2');
                    fehlerFeldZwei.innerText = "Login war erfolgreich. Daten werden geladen...";
                    fehlerFeldZwei.style.display = "block";
                    var lademessage = document.getElementById('lademessage');
                    lademessage.innerText = "Login war erfolgreich. Daten werden geladen...";
                    //Wenn die Anmeldung erfolgreich war, werden die Raumpläne heruntergeladen:
                    _this.download(options, 0);
                }
                else {
                    _this.fehler("Benutzername oder Passwort falsch.", "Login fehlgeschlagen. Bitte starte die App erneut.");
                    return -1;
                }
            }, function (error) {
                _this.fehler("Benutzername oder Passwort falsch.", "Login fehlgeschlagen. Bitte starte die App erneut.");
                return -1;
            }); //post
        }, function (error) {
            _this.fehler("Benutzername oder Passwort falsch.", "Login fehlgeschlagen. Bitte starte die App erneut.");
        }); //get
    };
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
    LoginPage.prototype.getSemesterBeginn = function () {
        var jetzt = new Date();
        var monat = jetzt.getMonth();
        var tag = jetzt.getDate();
        monat++;
        if (localStorage.getItem('aktuell') != null) {
            var old = new Date(localStorage.getItem('aktuell'));
            switch (monat) {
                //Wenn der aktuelle Monat April ist und zuletzt im Oktober
                //durch den Alert aktualisiert wurde wird 1 zurückgegeben
                case 4:
                    if (old.getMonth() + 1 == 10) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                //Wenn der aktuelle Monat Oktober ist und zuletzt im April
                //durch den Alert aktualisiert wurde wird 1 zurückgegeben
                case 10:
                    if (old.getMonth() + 1 == 4) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
            }
        }
        if (monat == 4 && (tag >= 1 && tag <= 10) || monat == 10 && (tag >= 1 && tag <= 10)) {
            //Wenn das Datum zwischen dem 1.4. und dem 10.4.
            //oder zwischen dem 1.10. und dem 10.10. liegt hat ein neues Semester begonnen!
            return 1;
        }
        else {
            return 0;
        }
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion zeigt entweder einen Aktualisierungshinweis an oder leitet auf die             *
    *   Startseite weiter.                                                                      *
    *                                                                                           *
    ********************************************************************************************/
    LoginPage.prototype.aktualisierungsAnfrage = function () {
        var _this = this;
        //Es wird ermittelt ob ein Semester begonnen hat:
        //Wenn ja, wird außerdem noch überprüft, ob bereits durch diesen Alert zu Semesterbeginn
        //aktualisiert wurde.
        var aktualisieren = this.getSemesterBeginn();
        if (aktualisieren == 1) {
            var alert_1 = this.alertCtrl.create({
                title: 'Aktualisieren',
                message: 'Ein neues Semester hat begonnen. Möchtest du die Raumpläne aktualisieren?',
                buttons: [
                    {
                        text: 'Nein',
                        role: 'cancel',
                        handler: function () {
                            alert_1 = null;
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
                        }
                    },
                    {
                        text: 'Ja',
                        handler: function () {
                            //Es wird das Datum des Aktualisierungshinweises gesetzt:
                            var jetzt = new Date("Tue Apr 03 2018 11:09:54 GMT+0200 (CEST)");
                            localStorage.setItem('aktuell', jetzt.toString());
                            _this.loginFunction();
                        }
                    }
                ]
            });
            alert_1.present();
        }
        else {
            //Wenn nicht aktualisiert werden muss:
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
        }
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion setzt das Sidemenü für die Loginseite aus.                                     *
    *                                                                                           *
    ********************************************************************************************/
    LoginPage.prototype.ionViewWillEnter = function () {
        this.menuCtrl.swipeEnable(false);
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion setzt das Sidemenü nach der Loginseite aktiv.                                  *
    *                                                                                           *
    ********************************************************************************************/
    LoginPage.prototype.ionViewDidLeave = function () {
        this.menuCtrl.swipeEnable(true);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/home/patrick/Schreibtisch/WahlprojektSS18/src/pages/login/login.html"*/'<!--\nDer Header der Seite mit dem Titel der Seite und dem Logo\n-->\n<ion-header id="header" hide-nav-bar="true">\n\n  <ion-navbar>\n    <ion-title><img class="logo" style="margin-right: 10px; float: left;" src="assets/imgs/FreiRaumLogo.png" width="30px"/> Login</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<!--\nDer Inhalt der Seite. Das Loginformular\nDieser Inhaltsabschnitt wird nur eingeblendet, wenn keine Benutzerdaten gespeichert wurden.\n-->\n<ion-content id="content" padding>\n  <!--\n  Dieser Abschnitt beinhaltet das Ladeicon, sowie eine Nachricht über den Loginverlauf\n  Der Abschnitt wird erst nach dem Absenden eingeblendet\n  -->\n  <div id="laden" style="display:none; margin: -16px; width: 100%;height:100%;background: rgba(0,0,0,.5);display:block;z-index:100;position:absolute;">\n    <div id="ladeimage" style="background: rgba(255,255,255,1); display:block; z-index:101;border:1px solid #FFFFFF;border-radius:3px;position:relative;margin:150px 50px;padding:10px;text-align:center;">\n      <img class="logo" src="assets/imgs/Ladeicon.gif" width="100"/><br><br>\n      <span id="lademessage">Login wird durchgeführt.</span>\n    </div>\n  </div>\n  <!--\n  Das Formular\n  -->\n  <ion-grid style="height: 50%">\n    <ion-row style="height: 100%">\n      <span style="margin-left: 10px;">Bitte mit deinem HDS-Account anmelden.</span><br>\n      <span id="Fehler" style="display: none; margin: 15px; padding: 5px; border: thin solid red; border-radius: 3px; color: red;">\n      </span>\n      <div *ngIf="showLogin" style="margin-left: -5px; text-align:center; width: 100%;">\n        <ion-item>\n          <!--\n          Benutzername\n          -->\n          <ion-input (click)="clicked()" type="benutzername" placeholder="Benutzername" [(ngModel)]="benutzername" [attr.autofocus]="shouldFocus"></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <!--\n          Passwort\n          -->\n          <ion-input (click)="clicked()" type="password" placeholder="Passwort" [(ngModel)]="password"></ion-input>\n        </ion-item>\n\n        <!--\n        angemeldet bleiben? Standardmäßig auf "true" gesetzt\n        -->\n        <ion-item text-wrap>\n          <ion-label>Benutzerdaten speichern und angemeldet bleiben.</ion-label>\n          <ion-checkbox [(ngModel)]="speichern"></ion-checkbox>\n        </ion-item>\n      </div>\n      <!--\n      Absendebutton\n      -->\n      <span style="width: 100%; text-align: center;">\n        <button ion-button style="margin: 20px; width: 200px;" (click)="doLogin()">Login</button>\n      </span>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n\n<!--\nDer zweite Inhaltsabschnitt:\nFalls Logindaten gespeichert sind, startet der automatische Login.\n-->\n<ion-content id="login" padding style="display:none;white-space:pre-line;">\n  <ion-grid style="height: 60%">\n    <!--\n    Ladeicon\n    -->\n    <ion-row justify-content-center align-items-center style="text-align: center; height: 60%">\n      <img class="logo" src="assets/imgs/Ladeicon.gif" width="250"/>\n    </ion-row>\n    <!--\n    Meldung über den Verlauf des Loginvorgangs\n    -->\n    <ion-row justify-content-center align-items-center style="text-align: center; height: 20%">\n      <span id="Fehler2" style="margin-top: 15px;">Login wird durchgeführt.</span>\n    </ion-row>\n    <!--\n    Slogan\n    -->\n    <ion-row justify-content-center align-items-center style="text-align: center; height: 20%">\n      <h1>Finde deinen freien Raum!</h1>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/home/patrick/Schreibtisch/WahlprojektSS18/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], LoginPage);
    return LoginPage;
}());

;
//# sourceMappingURL=login.js.map

/***/ }),

/***/ 115:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 115;

/***/ }),

/***/ 157:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/login/login.module": [
		285,
		2
	],
	"../pages/page/page.module": [
		286,
		1
	],
	"../pages/search/search.module": [
		287,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 157;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GebaudeModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Darstellung__ = __webpack_require__(49);

var GebaudeModel = /** @class */ (function () {
    function GebaudeModel(gebaudename) {
        /********************************************************************************************
        *                                                                                           *
        *   gebaudename -> Name eines Gebäudes                                                      *
        *   raume -> Array mit allen Räumen eines Gebäudes                                          *
        *   zugangsberechtigung -> Array mit allen Räumen mit Zugangsbeschränkung                   *
        *                                                                                           *
        ********************************************************************************************/
        this.gebaudename = "";
        this.raume = [];
        this.zugangsberechtigung = ["D01", "D12", "D13", "D15", "D18", "C001", "C007", "C113", "C213", "C237", "C305", "C313", "C361", "C375", "C377", "C413"];
        this.gebaudename = gebaudename;
    }
    /********************************************************************************************
    *                                                                                           *
    *   Funktion fügt einen Raum in das Array raume ein                                         *
    *                                                                                           *
    *   raum -> Raum, der hinzugefügt werden soll                                               *
    *                                                                                           *
    ********************************************************************************************/
    GebaudeModel.prototype.addRaum = function (raum) {
        this.raume.push(raum);
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion, die alle freien Räume zu allen Timeslots ermittelt                            *
    *                                                                                           *
    *   RETURN-Wert: Alle freien Räume                                                          *
    *                                                                                           *
    ********************************************************************************************/
    GebaudeModel.prototype.getFreeRooms = function () {
        var result = [];
        var slots = this.giveSlots();
        var darstellung;
        switch (this.gebaudename) {
            case "C":
                darstellung = new __WEBPACK_IMPORTED_MODULE_0__Darstellung__["a" /* Darstellung */](0);
                break;
            case "D":
                darstellung = new __WEBPACK_IMPORTED_MODULE_0__Darstellung__["a" /* Darstellung */](1);
                break;
        }
        for (var i = 0; i < slots.length; i++) {
            switch (slots[i]) {
                case "08:15:00":
                    result.push("08:15 bis 09:45:");
                    break;
                case "10:00:00":
                    result.push("10:00 bis 11:30:");
                    break;
                case "11:45:00":
                    result.push("11:45 bis 13:15:");
                    break;
                case "14:15:00":
                    result.push("14:15 bis 15:45:");
                    break;
                case "16:00:00":
                    result.push("16:00 bis 17:30:");
                    break;
                case "17:45:00":
                    result.push("17:45 bis 19:15:");
                    break;
                case "19:30:00":
                    result.push("19:30 bis 21:00:");
                    break;
                case "21:00:00":
                    result.push("ab 21:00:");
                    break;
            }
            this.raume.forEach(function (raum) {
                if (raum.isFree(slots[i], darstellung.giveWochentag())) {
                    result.push(raum.raumname);
                }
            });
        }
        return result;
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion gibt zur aktuellen Uhrzeit die nachfolgenden Timeslots zurück.                 *
    *                                                                                           *
    *   RETURN-Wert: Alle Timeslots                                                             *
    *                                                                                           *
    ********************************************************************************************/
    GebaudeModel.prototype.giveSlots = function () {
        switch (true) {
            case this.giveUhrzeit() == "08:15:00": return ["08:15:00", "10:00:00", "11:45:00", "14:15:00", "16:00:00", "17:45:00", "19:30:00", "21:00:00"];
            case this.giveUhrzeit() == "10:00:00": return ["10:00:00", "11:45:00", "14:15:00", "16:00:00", "17:45:00", "19:30:00", "21:00:00"];
            case this.giveUhrzeit() == "11:45:00": return ["11:45:00", "14:15:00", "16:00:00", "17:45:00", "19:30:00", "21:00:00"];
            case this.giveUhrzeit() == "14:15:00": return ["14:15:00", "16:00:00", "17:45:00", "19:30:00", "21:00:00"];
            case this.giveUhrzeit() == "16:00:00": return ["16:00:00", "17:45:00", "19:30:00", "21:00:00"];
            case this.giveUhrzeit() == "17:45:00": return ["17:45:00", "19:30:00", "21:00:00"];
            case this.giveUhrzeit() == "19:30:00": return ["19:30:00", "21:00:00"];
            case this.giveUhrzeit() == "21:00:00": return ["21:00:00"];
            default: break;
        }
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion gibt die Uhrzeit des aktuellen Slots zurück                                    *
    *                                                                                           *
    *   RETURN-Wert: Die Uhrzeit des aktuellen Slots                                            *
    *                                                                                           *
    ********************************************************************************************/
    GebaudeModel.prototype.giveUhrzeit = function () {
        var jetzt = new Date();
        var stunden = jetzt.getHours();
        var minuten = jetzt.getMinutes();
        switch (true) {
            /*0:00 - 0:59*/ case (stunden == 0) && (minuten >= 0 && minuten <= 59): return "08:15:00";
            /*1:00 - 1:59*/ case (stunden == 1) && (minuten >= 0 && minuten <= 59): return "08:15:00";
            /*2:00 - 2:59*/ case (stunden == 2) && (minuten >= 0 && minuten <= 59): return "08:15:00";
            /*3:00 - 3:59*/ case (stunden == 3) && (minuten >= 0 && minuten <= 59): return "08:15:00";
            /*4:00 - 4:59*/ case (stunden == 4) && (minuten >= 0 && minuten <= 59): return "08:15:00";
            /*5:00 - 5:59*/ case (stunden == 5) && (minuten >= 0 && minuten <= 59): return "08:15:00";
            /*6:00 - 6:59*/ case (stunden == 6) && (minuten >= 0 && minuten <= 59): return "08:15:00";
            /*7:00 - 7:59*/ case (stunden == 7) && (minuten >= 0 && minuten <= 59): return "08:15:00";
            /*8:00 - 8:59*/ case (stunden == 8) && (minuten >= 0 && minuten <= 59): return "08:15:00";
            /*9:00 - 9:44*/ case (stunden == 9) && (minuten >= 0 && minuten <= 44): return "08:15:00";
            /*9:45 - 9:59*/ case (stunden == 9) && (minuten >= 45 && minuten <= 59): return "10:00:00";
            /*10:00 - 10:59*/ case (stunden == 10) && (minuten >= 0 && minuten <= 59): return "10:00:00";
            /*11:00 - 11:44*/ case (stunden == 11) && (minuten >= 0 && minuten <= 44): return "10:00:00";
            /*11:45 - 11:59*/ case (stunden == 11) && (minuten >= 45 && minuten <= 59): return "11:45:00";
            /*12:00 - 12:59*/ case (stunden == 12) && (minuten >= 0 && minuten <= 59): return "11:45:00";
            /*13:00 - 13:59*/ case (stunden == 13) && (minuten >= 0 && minuten <= 59): return "11:45:00";
            /*14:00 - 14:14*/ case (stunden == 14) && (minuten >= 0 && minuten <= 14): return "11:45:00";
            /*14:15 - 14:59*/ case (stunden == 14) && (minuten >= 15 && minuten <= 59): return "14:15:00";
            /*15:00 - 15:59*/ case (stunden == 15) && (minuten >= 0 && minuten <= 59): return "14:15:00";
            /*16:00 - 16:59*/ case (stunden == 16) && (minuten >= 0 && minuten <= 59): return "16:00:00";
            /*17:00 - 17:44*/ case (stunden == 17) && (minuten >= 0 && minuten <= 44): return "16:00:00";
            /*17:45 - 17:59*/ case (stunden == 17) && (minuten >= 45 && minuten <= 59): return "17:45:00";
            /*18:00 - 18:59*/ case (stunden == 18) && (minuten >= 0 && minuten <= 59): return "17:45:00";
            /*19:00 - 19:29*/ case (stunden == 19) && (minuten >= 0 && minuten <= 29): return "17:45:00";
            /*19:30 - 19:59*/ case (stunden == 19) && (minuten >= 30 && minuten <= 59): return "19:30:00";
            /*20:00 - 20:59*/ case (stunden == 20) && (minuten >= 0 && minuten <= 59): return "19:30:00";
            /*21:00 - 21:59*/ case (stunden == 21) && (minuten >= 0 && minuten <= 59): return "21:00:00";
            /*22:00 - 22:59*/ case (stunden == 22) && (minuten >= 0 && minuten <= 59): return "21:00:00";
            /*23:00 - 23:59*/ case (stunden == 23) && (minuten >= 0 && minuten <= 59): return "21:00:00";
            default: break;
        }
    };
    return GebaudeModel;
}());

//# sourceMappingURL=GebaudeModel.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(224);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_page_page__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_search_search__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_login_login__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_page_page__["a" /* Gebaude */],
                __WEBPACK_IMPORTED_MODULE_10__pages_search_search__["a" /* Search */],
                __WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/page/page.module#GebaudeModule', name: 'Gebaude', segment: 'page', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/search/search.module#SearchPageModule', name: 'Search', segment: 'search', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_http__["c" /* HttpModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_page_page__["a" /* Gebaude */],
                __WEBPACK_IMPORTED_MODULE_10__pages_search_search__["a" /* Search */],
                __WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RaumModel; });
var RaumModel = /** @class */ (function () {
    function RaumModel(raumname) {
        /********************************************************************************************
        *                                                                                           *
        *   raumname -> Name des Raums                                                              *
        *   veranstaltungen -> Array, in den Veranstaltungen eines Raumes geschrieben werden        *
        *                                                                                           *
        ********************************************************************************************/
        this.raumname = "";
        this.veranstaltungen = [];
        this.raumname = raumname;
    }
    /********************************************************************************************
    *                                                                                           *
    *   Funktion fügt einem Raum eine Veranstaltung hinzu                                       *
    *                                                                                           *
    *   veranstaltung -> Veranstaltung, die hinzugefügt werden soll                             *
    *                                                                                           *
    ********************************************************************************************/
    RaumModel.prototype.addVeranstaltung = function (veranstaltung) {
        this.veranstaltungen.push(veranstaltung);
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion gibt einen übergebenen Text in eine Array aufgesplittet zurück                 *
    *                                                                                           *
    *   text -> Text, der gesplittet werden soll                                                *
    *                                                                                           *
    *   RETURN-Wert: Array mit Einträgen aus dem übergebenen Text(ics-Datei)                    *
    *                                                                                           *
    ********************************************************************************************/
    RaumModel.prototype.getICS = function (text) {
        text.trim();
        return text.split("\\r\\n");
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion ermittelt, wann der Raum frei ist                                              *
    *                                                                                           *
    *   uhrzeit -> Uhrzeit, zu der der Raum frei sein soll                                      *
    *   wochentag -> Wochentag, zu dem der Raum frei sein soll                                  *
    *                                                                                           *
    *   RETURN-Wert: true, wenn der Raum frei ist; false falls nicht                            *
    *                                                                                           *
    ********************************************************************************************/
    RaumModel.prototype.isFree = function (uhrzeit, wochentag) {
        var result = true;
        this.veranstaltungen.forEach(function (veranstaltung) {
            if (veranstaltung.wochentag == wochentag && veranstaltung.uhrzeit == uhrzeit) {
                result = false;
            }
        });
        return result;
    };
    return RaumModel;
}());

//# sourceMappingURL=RaumModel.1.js.map

/***/ }),

/***/ 251:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Veranstaltung; });
var Veranstaltung = /** @class */ (function () {
    function Veranstaltung(name, wochentag, uhrzeit, enduhrzeit) {
        /********************************************************************************************
        *                                                                                           *
        *   name -> Name der Veranstaltung                                                          *
        *   wochentag -> Wochentag der Veranstaltung                                                *
        *   uhrzeit -> Uhrzeit, zu der die Veranstaltung beginnt                                    *
        *   enduhrzeit -> Uhrzeit, zu der die Veranstaltung zu Ende ist                             *
        *                                                                                           *
        ********************************************************************************************/
        this.name = "";
        this.wochentag = "";
        this.uhrzeit = "";
        this.enduhrzeit = "";
        this.name = name;
        this.uhrzeit = uhrzeit;
        this.wochentag = wochentag;
        this.enduhrzeit = enduhrzeit;
    }
    return Veranstaltung;
}());

//# sourceMappingURL=Veranstaltung.js.map

/***/ }),

/***/ 252:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CampusModel; });
var CampusModel = /** @class */ (function () {
    function CampusModel(name) {
        /********************************************************************************************
        *                                                                                           *
        *   campusname -> Name des Campus                                                           *
        *   gebaude -> Array, mit Gebäuden                                                          *
        *                                                                                           *
        ********************************************************************************************/
        this.campusname = "";
        this.gebaude = [];
        this.campusname = name;
    }
    /********************************************************************************************
    *                                                                                           *
    *   Funktion fügt ein Gebäude dem Array gebaude hinzu                                       *
    *                                                                                           *
    *   gebaude -> Gebäude, das in den Array gebaude eingefügt werden soll                      *
    *                                                                                           *
    ********************************************************************************************/
    CampusModel.prototype.addGebaude = function (gebaude) {
        this.gebaude.push(gebaude);
    };
    return CampusModel;
}());

//# sourceMappingURL=CampusModel.js.map

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_page_page__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_search_search__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */];
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide;
            //Der Hardware-Backbutton des Handys bekommt eine Aktion:
            platform.registerBackButtonAction(function () {
                var page;
                if (null != localStorage.getItem("page")) {
                    page = localStorage.getItem("page");
                    switch (page) {
                        case "room":
                            return;
                    }
                }
                _this.nav.pop();
            }, 1);
        });
        //Die Seiten des Menüs:
        this.pages = [
            { title: 'Campusplan', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */], item: "Home" },
            { title: 'Gebäude C', component: __WEBPACK_IMPORTED_MODULE_5__pages_page_page__["a" /* Gebaude */], item: "C" },
            { title: 'Gebäude D', component: __WEBPACK_IMPORTED_MODULE_5__pages_page_page__["a" /* Gebaude */], item: "D" },
            { title: 'Raumsuche', component: __WEBPACK_IMPORTED_MODULE_6__pages_search_search__["a" /* Search */], item: "Search" },
            { title: 'Aktualisieren', component: __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */], item: "Aktualisieren" }
        ];
    }
    /********************************************************************************************
    *                                                                                           *
    *   Funktion öffnet die übergebene Seite                                                    *
    *                                                                                           *
    *   page -> Seite, die geöffnet werden soll                                                 *
    *   item -> item mit dem Inhalt, der an die Seite übermittelt werden soll                   *
    *                                                                                           *
    ********************************************************************************************/
    MyApp.prototype.openPage = function (page, item) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.push(page.component, { item: item });
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion ruft die Startseite auf                                                        *
    *                                                                                           *
    ********************************************************************************************/
    MyApp.prototype.datenverwaltung = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */], { item: "daten" });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/patrick/Schreibtisch/WahlprojektSS18/src/app/app.html"*/'<ion-menu [content]="content">\n  <!--\n  Der Header der Seite mit dem Logo und dem Slogan\n  -->\n  <ion-header>\n    <ion-toolbar>\n      <img class="logo" style="margin-left: 10px; float: left;" src="assets/imgs/FreiRaumLogo.png" width="40px"/>\n      <div style="padding-left: 20px; float: left; height: 40px; text-align: center; font-size: 12pt; vertical-align: middle;">\n        &nbsp;Finde deinen<br>&nbsp;freien Raum!\n      </div>\n      <ion-title>\n      </ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <!--Das Menü wird erstellt:-->\n  <ion-content padding>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p, p.item)">\n        {{p.title}}\n      </button>\n      <button menuClose ion-item (click)="datenverwaltung()">\n        Datenverwaltung\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/home/patrick/Schreibtisch/WahlprojektSS18/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_page__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search_search__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_Darstellung__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomePage = /** @class */ (function () {
    function HomePage(platform, toastCtrl, navCtrl, alertCtrl, navParams) {
        this.platform = platform;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.temp = [];
    }
    /********************************************************************************************
    *                                                                                           *
    *   Funktion wird nach dem Laden der View ausgeführt.                                       *
    *                                                                                           *
    ********************************************************************************************/
    HomePage.prototype.ionViewDidLoad = function () {
        localStorage.setItem("page", "Home");
        if (localStorage.getItem("markiert") != null) {
            this.favoriten = localStorage.getItem("markiert").split(",");
            var h = 0;
            for (h = 0; h < 2; h++) {
                this.darstellung = new __WEBPACK_IMPORTED_MODULE_4__model_Darstellung__["a" /* Darstellung */](h);
                this.darstellung.parseToCampus();
                this.freeRooms = this.darstellung.freeRooms;
                this.freieMarkierte();
            }
        }
        if (this.navParams.get("item") == "daten") {
            this.deleteDaten();
        }
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion ermittelt die aktuell freien, markierten Räume.                                *
    *   Diese werden in den Array temp geschrieben.                                             *
    *                                                                                           *
    ********************************************************************************************/
    HomePage.prototype.freieMarkierte = function () {
        var c = 0;
        var e = 0;
        for (var i = 0; i < this.favoriten.length; i++) {
            //Alle Favoriten durchgehen
            c = 0;
            for (var x = 0; x < this.freeRooms.length; x++) {
                //Alle freien Räume durchgehen
                if (c == 2) {
                    break;
                }
                //Wenn String ein Zeitslot ist
                //Also mit einer Zahl statt einem Buchstaben beginnt
                if (this.freeRooms[x].charAt(0) == '0' || this.freeRooms[x].charAt(0) == '1' ||
                    this.freeRooms[x].charAt(0) == '2' || this.freeRooms[x].charAt(0) == '3' ||
                    this.freeRooms[x].charAt(0) == '4' || this.freeRooms[x].charAt(0) == '5' ||
                    this.freeRooms[x].charAt(0) == '6' || this.freeRooms[x].charAt(0) == '7' ||
                    this.freeRooms[x].charAt(0) == '8' || this.freeRooms[x].charAt(0) == '9') {
                    c++;
                } //if
                else {
                    //Wenn Favoriten im ersten Slot der freien Räume sind
                    if (this.freeRooms[x] == this.favoriten[i]) {
                        //Ist der Favorit schon in Temp
                        for (var t = 0; t < this.temp.length; t++) {
                            if (this.temp[t] == this.favoriten[i]) {
                                e = 1;
                            } //if
                        } //for t
                        if (e == 0) {
                            this.temp.push(this.favoriten[i]);
                        } //if
                        e = 0;
                    } //if
                } //else
            } //for x
        } //for i
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion ruft das Gebäude auf und übermittelt den Namen des Raums.                      *
    *                                                                                           *
    *   temp -> Name des Raums auf den geklickt wurde                                           *
    *                                                                                           *
    ********************************************************************************************/
    HomePage.prototype.onTip = function (temp) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__page_page__["a" /* Gebaude */], { item: temp });
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion leitet weiter auf page.html                                                    *
    *   Es wird das item "C" an die Seite übermittelt um die Seite für das C-Gebäude            *
    *   zu erstellen.                                                                           *
    *                                                                                           *
    ********************************************************************************************/
    HomePage.prototype.nextC = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__page_page__["a" /* Gebaude */], { item: "C" });
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion leitet weiter auf page.html                                                    *
    *   Es wird das item "D" an die Seite übermittelt um die Seite für das D-Gebäude            *
    *   zu erstellen.                                                                           *
    *                                                                                           *
    ********************************************************************************************/
    HomePage.prototype.nextD = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__page_page__["a" /* Gebaude */], { item: "D" });
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion leitet weiter auf search.html                                                  *
    *                                                                                           *
    ********************************************************************************************/
    HomePage.prototype.search = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__search_search__["a" /* Search */]);
        localStorage.setItem("from", "Home");
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion öffnet die Datenverwaltung                                                     *
    *                                                                                           *
    ********************************************************************************************/
    HomePage.prototype.deleteDaten = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Datenverwaltung',
            message: 'Welche Daten möchtest du löschen?',
            buttons: [
                {
                    text: 'Benutzername und Passwort',
                    handler: function () {
                        localStorage.removeItem("benutzer");
                        localStorage.removeItem("passwort");
                        _this.toasts("Benutzerdaten gelöscht!");
                    }
                },
                {
                    text: 'Markierte Räume',
                    handler: function () {
                        localStorage.removeItem("markiert");
                        _this.toasts("Markierte Räume gelöscht!");
                    }
                },
                {
                    text: 'Alles',
                    handler: function () {
                        alert = null;
                        _this.dialog();
                    }
                },
                {
                    text: 'Nichts',
                    role: 'cancel',
                    handler: function () {
                        alert = null;
                    }
                },
                {
                    text: 'Infos zum Datenschutz',
                    handler: function () {
                        alert = null;
                        _this.infos();
                    }
                }
            ]
        });
        alert.present();
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion erstellt einen Alert, über den alle Daten gelöscht werden können.              *
    *                                                                                           *
    ********************************************************************************************/
    HomePage.prototype.dialog = function () {
        var _this = this;
        var raum = [
            "D01", "D02", "D11", "D12", "D13", "D14", "D15", "D17", "D18",
            "C001", "C007", "C035", "C037", "C113", "C213", "C237", "C305", "C313", "C361", "C375", "C377", "C405", "C407", "C413"
        ];
        var alert = this.alertCtrl.create({
            title: 'Warnung!',
            message: 'Alle Daten löschen und die App schließen?',
            buttons: [
                {
                    text: 'Nein',
                    role: 'cancel',
                    handler: function () {
                        alert = null;
                    }
                },
                {
                    text: 'Ja',
                    handler: function () {
                        localStorage.removeItem("benutzer");
                        localStorage.removeItem("passwort");
                        localStorage.removeItem("markiert");
                        localStorage.removeItem("page");
                        localStorage.removeItem("from");
                        localStorage.removeItem("aktuell");
                        localStorage.removeItem("markiert");
                        for (var i = 0; i < raum.length; i++) {
                            localStorage.removeItem(raum[i]);
                        }
                        _this.toasts("Alle Daten wurden gelöscht!");
                        _this.platform.exitApp();
                    }
                }
            ]
        });
        alert.present();
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion öffnet Infos zum Datenschutz                                                   *
    *                                                                                           *
    ********************************************************************************************/
    HomePage.prototype.infos = function () {
        var message = "<p>Durch diese App werden keine personenbezogenen Daten erhoben.</p>";
        message += "<p>Alle Daten werden lokal gespeichert und können jederzeit gelöscht werden.</p>";
        message += "<p>Folgende Daten werden von der App gespeichert:<br>";
        message += "<span>- Benutzername und Passwort (sofern gewünscht)</span><br>";
        message += "<span>- Raumpläne aus dem AoR (Admin on Rails)</span><br>";
        message += "<span>- Markierte Räume</span></p>";
        message += "<p>Wir weisen darauf hin, dass die Datenübertragung im Internet Sicherheitslücken aufweisen kann. ";
        message += "Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.</p>";
        message += "Quelle: <a href='http://www.e-recht24.de'>http://www.e-recht24.de</a>";
        var alert = this.alertCtrl.create({
            title: 'Datenschutz',
            message: message,
            buttons: [
                {
                    text: 'Ok',
                    role: 'cancel',
                    handler: function () {
                        alert = null;
                    }
                }
            ]
        });
        alert.present();
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion erstellt eine Meldung                                                          *
    *   message -> String mit der Nachricht, die die Meldung enthalten soll                     *
    *                                                                                           *
    ********************************************************************************************/
    HomePage.prototype.toasts = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: 'middle',
            cssClass: "my-toast"
        });
        toast.present();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/patrick/Schreibtisch/WahlprojektSS18/src/pages/home/home.html"*/'<!--\nDer Header der Seite mit dem Titel der Seite, einer Lupe für die Suche und dem Menü/Backbutton\n-->\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title style="float: left;">Campusplan</ion-title>\n    <ion-icon (click)="search()" style="float: right; position: relative; font-size: 2em; margin-right: 5px;" name="search"></ion-icon>\n  </ion-navbar>\n</ion-header>\n\n<!--\nDer Inhalt der Seite\n-->\n<ion-content padding>\n  <ion-grid>\n    <ion-row>\n      <h5>Herzlich Willkommen!</h5>\n    </ion-row>\n    <ion-row>\n      <!--\n      Falls Räume markiert wurden, stehen hier die freien\n      -->\n      <ng-container *ngFor="let temp of temp; let i = index" [attr.data-index]="i">\n        <span *ngIf="i == 0"><b>Folgende markierte Räume sind gerade frei:</b></span>\n        <span style="width: 100%;">\n          <ion-item style="float: left; width: 85%;" (click)="onTip(temp)">\n            {{temp}}\n          </ion-item>\n          <ion-icon style="height: 100%; font-size: 2em; padding-top: 15px; margin-left: 5%; padding-left: 5px; width: 10%; float: right;" name="arrow-dropright" (click)="onTip(temp)"></ion-icon>\n        </span>\n      </ng-container>\n    </ion-row>\n    <!--\n    Der Campusplan besteht aus 9 Bildern, die teilweise zum Anklicken sind\n    -->\n    <ion-row style="margin-top: 20px;">\n      Bitte wähle dein Gebäude:\n    </ion-row>\n    <ion-row style="text-align:center;">\n      <img id="img1" style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_01.jpg"/>\n    </ion-row>\n    <ion-row style="text-align:center">\n      <img id="img2" style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_02.jpg"/>\n    	<img id="img3" style="cursor: pointer; margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_03.jpg" (click)="nextD()"/>\n    	<img id="img4" style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_04.jpg"/>\n    </ion-row>\n    <ion-row style="text-align:center">\n      <img id="img5" style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_05.jpg"/>\n    </ion-row>\n    <ion-row style="text-align:center">\n      <img id="img6" style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_06.jpg"/>\n    	<img id="img7" style="cursor: pointer; margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_07.jpg" (click)="nextC()"/>\n    	<img id="img8" style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_08.jpg"/>\n    </ion-row>\n    <ion-row style="text-align:center">\n      <img id="img9" style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_09.jpg"/>\n    </ion-row>\n  </ion-grid>\n\n</ion-content>\n'/*ion-inline-end:"/home/patrick/Schreibtisch/WahlprojektSS18/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Gebaude; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search_search__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_Darstellung__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/********************************************************************************************
*                                                                                           *
*   ueberschrift -> Array für die Überschrift der Seite                                     *
*                                                                                           *
********************************************************************************************/
var ueberschrift = [];
var Gebaude = /** @class */ (function () {
    function Gebaude(platform, toastCtrl, navCtrl, navParams) {
        var _this = this;
        this.platform = platform;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        /********************************************************************************************
        *                                                                                           *
        *   ueberschrift -> Array für die Überschriften der Seite                                   *
        *   freeRooms -> Array mit den freien Räumen                                                *
        *   zugang -> Array mit den Räumen, die eine Zugangsbeschränkung haben                      *
        *   markiert -> Array mit allen markierten Räumen                                           *
        *   entmarkiert -> Array mit allen nicht markierten Räumen                                  *
        *                                                                                           *
        ********************************************************************************************/
        this.ueberschrift = ueberschrift;
        this.freeRooms = [];
        this.zugang = [];
        this.markiert = [];
        this.entmarkiert = [
            "D01", "D02", "D12", "D13", "D14", "D15", "D17", "D18",
            "C001", "C007", "C035", "C037", "C113", "C213", "C237", "C305", "C313", "C361", "C375", "C377", "C405", "C407", "C413"
        ];
        //Der Hardware-Backbutton des Handys bekommt eine Aktion:
        platform.registerBackButtonAction(function () {
            var page;
            if (null != localStorage.getItem("page")) {
                page = localStorage.getItem("page");
                switch (page) {
                    case "room":
                        _this.backClicked();
                        return;
                }
            }
            _this.nav.pop();
        }, 1);
    }
    /********************************************************************************************
    *                                                                                           *
    *   Funktion wird nach dem Laden der View ausgeführt.                                       *
    *                                                                                           *
    ********************************************************************************************/
    Gebaude.prototype.ionViewDidLoad = function () {
        var page = this.navParams.get('item');
        var show = document.getElementById('Lehraussen');
        show.style.display = "none";
        var innen = document.getElementById('Lehrinnen');
        innen.style.display = "none";
        var span1 = document.getElementById('span1');
        span1.style.display = "none";
        var span2 = document.getElementById('span2');
        span2.style.display = "none";
        var button = document.getElementById('button');
        button.style.display = "none";
        var tmp = "";
        if (page.length > 1) {
            tmp = page;
            page = page.substring(0, 1);
        }
        //Unterscheide Seiten:
        switch (page) {
            case "C":
                this.darstellung = new __WEBPACK_IMPORTED_MODULE_4__model_Darstellung__["a" /* Darstellung */](0);
                ueberschrift[0] = "C-Gebäude";
                ueberschrift[1] = "Folgende Räume sind zur Zeit im C-Gebäude frei:";
                break;
            case "D":
                this.darstellung = new __WEBPACK_IMPORTED_MODULE_4__model_Darstellung__["a" /* Darstellung */](1);
                ueberschrift[0] = "D-Gebäude";
                ueberschrift[1] = "Folgende Räume sind zur Zeit im D-Gebäude frei:";
                break;
        }
        this.darstellung.parseToCampus();
        this.freeRooms = this.darstellung.freeRooms;
        this.zugang = this.darstellung.zugang;
        //Favoriten laden:
        this.getMarkierung();
        //Raumplan anzeigen, falls gefordert durch Startseite:
        if (tmp != "") {
            this.getL(tmp);
        }
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion zeigt Meldung für Räume mit Zugangsbeschränkung                                *
    *   raum -> String mit dem Namen des Raums                                                  *
    *                                                                                           *
    ********************************************************************************************/
    Gebaude.prototype.onTip = function (raum) {
        this.toasts("Für den Raum " + raum + " brauchst du eine Zugangsberechtigung.");
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion markiert bzw. entmarkiert Räume                                                *
    *   item -> Raumname                                                                        *
    *                                                                                           *
    ********************************************************************************************/
    Gebaude.prototype.makeFav = function (item) {
        //Gehe alle Räume durch
        var isDelete = 0;
        var tmp = this.markiert;
        //Gehe über alle Favoriten druch
        for (var i = 0; i < tmp.length; i++) {
            //Ist der angeklickte Raum in den Favoriten? Lösche ihn
            if (tmp[i] == item) {
                tmp.splice(i, 1);
                this.toasts('Raum ' + item + ' wurde aus der Liste \"Markiert\" entfernt.');
                isDelete = -1;
                //Der gelöschte Eintrag wird aus den markierten entfernt:
                this.entferneEntmarkiertAusMarkiert(item);
            }
        }
        //Wenn der Raum nicht in den Favoriten ist, füge ihn hinzu
        if (isDelete == 0) {
            tmp.push(item);
            this.toasts('Raum ' + item + ' wurde markiert.');
            //Der hinzugefügte Eintrag wird aus den entmarkierten gelöscht:
            this.entferneMarkiertAusEntmarkiert();
        }
        localStorage.setItem("markiert", tmp.join(","));
        this.markiert = tmp;
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion füllt den Array markiert mit allen markierten Räumen                           *
    *                                                                                           *
    ********************************************************************************************/
    Gebaude.prototype.getMarkierung = function () {
        if (localStorage.getItem("markiert") != null) {
            this.markiert = localStorage.getItem("markiert").split(",");
        }
        this.entferneMarkiertAusEntmarkiert();
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion entfernt alle markierten Räume aus den entmarkierten                           *
    *                                                                                           *
    ********************************************************************************************/
    Gebaude.prototype.entferneMarkiertAusEntmarkiert = function () {
        //tmp ist nun der Array mit den entmarkierten Räumen.
        var tmp = this.entmarkiert;
        //die markierten Räume werden durchlaufen
        for (var i = 0; i < this.markiert.length; i++) {
            var index = tmp.indexOf(this.markiert[i]);
            //Wenn ein markierter Raum in den entmarkierten vorkommt...
            if (index != -1) {
                //...wird der Raum entfernt
                for (var j = index; j < tmp.length - 1; j++) {
                    tmp[j] = tmp[j + 1];
                }
                tmp.pop();
            }
        }
        this.entmarkiert = tmp;
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion entfernt alle entmarkierten Räume aus den markierten                           *
    *                                                                                           *
    ********************************************************************************************/
    Gebaude.prototype.entferneEntmarkiertAusMarkiert = function (raum) {
        //tmp ist nun der Array mit den markierten Räumen.
        var tmp = this.markiert;
        if (tmp.length == 1 && tmp[0] == raum) {
            tmp.pop();
            this.markiert = tmp;
            this.entmarkiert.push(raum);
            return;
        }
        var index = tmp.indexOf(raum);
        //Wenn ein entmarkierter Raum in den markierten vorkommt...
        if (index != -1) {
            //...wird der Raum entfernt
            for (var i = index; i < tmp.length - 1; i++) {
                tmp[i] = tmp[i + 1];
                tmp.pop();
            }
        }
        this.markiert = tmp;
        this.entmarkiert.push(raum);
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion leitet ruft die Seite home.html auf                                            *
    *                                                                                           *
    ********************************************************************************************/
    Gebaude.prototype.BackToCampus = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion ruft die Seite search.html auf                                                 *
    *                                                                                           *
    ********************************************************************************************/
    Gebaude.prototype.search = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__search_search__["a" /* Search */]);
        var page = this.navParams.get('item');
        localStorage.setItem("from", page);
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion zeigt den Raumplan eines Raumes an                                             *
    *                                                                                           *
    ********************************************************************************************/
    Gebaude.prototype.getL = function (raumname) {
        var show2 = document.getElementById('Lehrinnen');
        //Entfernen der Lehrveranstaltungen:
        var remove = show2.firstChild;
        while (remove) {
            show2.removeChild(remove);
            remove = show2.firstChild;
        }
        //Raumplan-Popup einblenden:
        var show = document.getElementById('Lehraussen');
        show.style.display = "block";
        show2.style.display = "block";
        var span1 = document.getElementById('span1');
        span1.style.display = "block";
        var span2 = document.getElementById('span2');
        span2.style.display = "block";
        var button = document.getElementById('button');
        button.style.display = "block";
        //Freie Räume ausblenden:
        var notShow = document.getElementById('anzeige');
        notShow.style.display = "none";
        var header = document.getElementById('header');
        header.style.display = "none";
        show2.appendChild(this.darstellung.getLehrveranstaltungen(raumname));
        localStorage.setItem("page", "room");
        this.scrollTop();
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion blendet den Raumplan eines Raumes aus                                          *
    *                                                                                           *
    ********************************************************************************************/
    Gebaude.prototype.backClicked = function () {
        //Freie Räume einblenden:
        var show = document.getElementById('anzeige');
        show.style.display = "block";
        var header = document.getElementById('header');
        header.style.display = "block";
        //Raumplan-Popup ausblenden:
        var notShow = document.getElementById('Lehraussen');
        notShow.style.display = "none";
        var notShow2 = document.getElementById('Lehrinnen');
        notShow2.style.display = "none";
        var span1 = document.getElementById('span1');
        span1.style.display = "none";
        var span2 = document.getElementById('span2');
        span2.style.display = "none";
        var button = document.getElementById('button');
        button.style.display = "none";
        var page = this.navParams.get('item');
        if (page.length > 1) {
            page = page.substring(0, 1);
        }
        localStorage.setItem("page", page);
        this.scrollTop();
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion scrollt nach oben                                                              *
    *                                                                                           *
    ********************************************************************************************/
    Gebaude.prototype.scrollTop = function () {
        this.content.scrollToTop();
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion erstellt eine Meldung                                                          *
    *   message -> String mit der Nachricht, die die Meldung enthalten soll                     *
    *                                                                                           *
    ********************************************************************************************/
    Gebaude.prototype.toasts = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: 'middle',
            cssClass: "my-toast"
        });
        toast.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], Gebaude.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */])
    ], Gebaude.prototype, "nav", void 0);
    Gebaude = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'gebaude',template:/*ion-inline-start:"/home/patrick/Schreibtisch/WahlprojektSS18/src/pages/page/page.html"*/'<!--\nDer Header der Seite mit dem Titel der Seite, einer Lupe für die Suche und dem Menü/Backbutton\n-->\n<span id="header">\n  <ion-header>\n    <ion-navbar>\n      <button ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n      <ion-title style="float: left;">\n        <!--\n        Der Titel der Seite wird eingefügt\n        -->\n        <span *ngFor="let headTitle of ueberschrift; let i = index" [attr.data-index]="i">\n          <ng-container *ngIf="i == 0">{{ headTitle }}</ng-container>\n        </span>\n      </ion-title>\n      <ion-icon (click)="search()" style="float: right; position: relative; font-size: 2em; margin-right: 5px;" name="search"></ion-icon>\n    </ion-navbar>\n  </ion-header>\n</span>\n\n<!--\nDer Inhalt der Seite\n-->\n<ion-content padding>\n  <!--\n  Der Inhalt der Seite für den Fall, dass ein Raumplan angezeigt wird.\n  Wird erst nach Klick auf einen Raum eingeblendet\n  -->\n  <div id="Lehraussen" style="display: none; margin: -15px; width: 100%;height:100%;background:rgba(255,255,255,1);z-index:100;position:absolute;">\n    <!--\n    Der Header mit Backbutton\n    -->\n    <span id="span1" style="display: none; float: left; width: 100%; text-align:left;">\n      <ion-icon id="button" (click)="backClicked()" style="float: left; display: none; cursor: pointer; font-size: 2em; color: rgb(66, 134, 244); margin: 13px; margin-left: 20px;" name="arrow-back"></ion-icon>\n      <ion-title style="float: left; margin-top: 13px;">\n        &nbsp;Zurück zur Raumübersicht\n      </ion-title>\n    </span>\n    <!--\n    Der Raumplan\n    -->\n    <span id="span2" style="display: none; float: right; width: 100%;">\n      <div id="Lehrinnen" style="display: none; background :rgba(255,255,255,1); z-index:101;border:1px solid #FFFFFF;border-radius:3px;position:relative;margin:0px 0px;padding:10px;text-align:left;">\n\n      </div>\n    </span>\n  </div>\n\n  <!--\n  Die Auflistung aller freien Räume\n  -->\n  <div id="anzeige" style="margin-top: 85px;">\n    <b>\n      <div style="margin-bottom: -30px;" *ngFor="let ueberschrift of ueberschrift; let i = index" [attr.data-index]="i">\n        <!--\n        Die Überschrift "... im C/D-Gebäude frei:"\n        -->\n        <ng-container *ngIf="i == 1">{{ ueberschrift }}</ng-container>\n      </div>\n    </b>\n    <ion-list style="margin-bottom: 170px;">\n      <ng-container *ngFor="let item of freeRooms">\n        <!--\n        Die Uhrzeiten der Slots\n        -->\n        <div style="clear: both;">\n          <h3 style="clear: both; margin-top: 70px;" *ngIf="item == \'08:15 bis 09:45:\'">08:15 bis 09:45:</h3>\n          <h3 style="clear: both; margin-top: 70px;" *ngIf="item == \'10:00 bis 11:30:\'">10:00 bis 11:30:</h3>\n          <h3 style="clear: both; margin-top: 70px;" *ngIf="item == \'11:45 bis 13:15:\'">11:45 bis 13:15:</h3>\n          <h3 style="clear: both; margin-top: 70px;" *ngIf="item == \'14:15 bis 15:45:\'">14:15 bis 15:45:</h3>\n          <h3 style="clear: both; margin-top: 70px;" *ngIf="item == \'16:00 bis 17:30:\'">16:00 bis 17:30:</h3>\n          <h3 style="clear: both; margin-top: 70px;" *ngIf="item == \'17:45 bis 19:15:\'">17:45 bis 19:15:</h3>\n          <h3 style="clear: both; margin-top: 70px;" *ngIf="item == \'19:30 bis 21:00:\'">19:30 bis 21:00:</h3>\n          <h3 style="clear: both; margin-top: 70px;" *ngIf="item == \'ab 21:00:\'">ab 21:00:</h3>\n        </div>\n\n        <!--\n        Die freien Räume\n        -->\n        <ng-container *ngIf="item != \'08:15 bis 09:45:\' && item != \'10:00 bis 11:30:\' && item != \'11:45 bis 13:15:\' && item != \'14:15 bis 15:45:\' && item != \'16:00 bis 17:30:\' && item != \'17:45 bis 19:15:\' && item != \'19:30 bis 21:00:\' && item != \'ab 21:00:\'">\n          <span style="width: 100%; margin-bottom: 20px;">\n            <ion-item (click)="getL(item)" [color]="primary" style="float: left; width: 75%;">\n              <!--\n              Wenn ein Raum markiert wurde wird der Raumname hervorgehoben:\n              -->\n              <ng-container *ngFor="let markierte of markiert">\n                <span *ngIf="item == markierte" style="float: left; color: rgb(66, 134, 244);"><b>{{ item }}</b></span>\n              </ng-container>\n\n              <ng-container *ngFor="let entmarkierte of entmarkiert">\n                <span *ngIf="item == entmarkierte" style="float: left;">{{ item }}</span>\n              </ng-container>\n            </ion-item>\n\n            <!--\n            Wenn ein Raum markiert wurde wird der Stern farbig:\n            -->\n            <ng-container *ngFor="let markierte of markiert">\n              <ion-icon style="height: 100%; padding-top: 15px; width: 10%; float: right; font-size: 1.5em; color: rgb(66, 134, 244);" name="star" *ngIf="item == markierte" (click)="makeFav(item)"></ion-icon>\n            </ng-container>\n\n            <ng-container *ngFor="let entmarkierte of entmarkiert">\n              <ion-icon style="height: 100%; padding-top: 15px; width: 10%; float: right; font-size: 1.5em; color: rgb(120, 120, 120);" name="star" *ngIf="item == entmarkierte" (click)="makeFav(item)"></ion-icon>\n            </ng-container>\n\n            <!--\n            Falls Zugangsbeschränkung vorliegt wird ein Schlüssel angezeigt:\n            -->\n            <ng-container *ngFor="let keys of zugang">\n              <ion-icon style="height: 100%; padding-top: 17px; margin-left: 5%; padding-left: 5px; width: 10%; float: right;" name="key" *ngIf="item == keys" (click)="onTip(item)"></ion-icon>\n            </ng-container>\n          </span>\n        </ng-container>\n      </ng-container>\n    </ion-list>\n\n    <!--\n    Button zurück zum Campusplan\n    -->\n    <button ion-button style="left: 50%; position: fixed; bottom: 20px;" (click)="BackToCampus()">Zum Campusplan</button>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/home/patrick/Schreibtisch/WahlprojektSS18/src/pages/page/page.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], Gebaude);
    return Gebaude;
}());

//# sourceMappingURL=page.js.map

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Search; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_GebaudeModel__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_Darstellung__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_page__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/********************************************************************************************
*                                                                                           *
*   freeTimeSlot -> Array für die freien Slots eines Raums                                  *
*   freeUeberschrift -> Array für die Überschrift des Ergebnisses der Raumsuche             *
*   StundenSlot -> Array mit den Slots                                                      *
*                                                                                           *
********************************************************************************************/
var freeTimeSlot = [];
var freeUeberschrift = [];
var StundenSlot = [
    '08:15:00', '10:00:00', '11:45:00', '14:15:00', '16:00:00', '17:45:00', '19:30:00', '21:00:00'
];
var Search = /** @class */ (function () {
    function Search(platform, toastCtrl, navCtrl, navParams) {
        var _this = this;
        this.platform = platform;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.gebaude = new __WEBPACK_IMPORTED_MODULE_2__model_GebaudeModel__["a" /* GebaudeModel */]("C");
        this.freeTimeSlot = freeTimeSlot;
        this.freeUeberschrift = freeUeberschrift;
        platform.registerBackButtonAction(function () {
            var page;
            if (null != localStorage.getItem("from")) {
                page = localStorage.getItem("from");
                localStorage.setItem("from", "Search");
                switch (page) {
                    case "Home":
                        _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
                        return;
                    case "C":
                        _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__page_page__["a" /* Gebaude */], { item: "C" });
                        return;
                    case "D":
                        _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__page_page__["a" /* Gebaude */], { item: "D" });
                        return;
                }
            }
        }, 1);
    }
    /********************************************************************************************
    *                                                                                           *
    *   Funktion wird nach dem Laden der View ausgeführt.                                       *
    *                                                                                           *
    ********************************************************************************************/
    Search.prototype.ionViewDidLoad = function () {
        this.darstellung = new __WEBPACK_IMPORTED_MODULE_3__model_Darstellung__["a" /* Darstellung */](0);
        localStorage.setItem("page", "Search");
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion ermittelt den Raum, der gesucht werden soll.                                   *
    *   searchbar -> die Suchmaske                                                              *
    *                                                                                           *
    ********************************************************************************************/
    Search.prototype.searchRoom = function (searchbar) {
        var room = searchbar.target.value;
        this.searchRoom2(room);
        //this.items = [];
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion ermittelt für einen Raum die freien Slots                                      *
    *   room -> die Raum                                                                        *
    *                                                                                           *
    ********************************************************************************************/
    Search.prototype.searchRoom2 = function (room) {
        freeTimeSlot = [];
        var raume = [];
        var zahl = 0;
        var lieblingsraum = "Der Raum";
        var liste = document.getElementById('liste');
        //Raumliste wird gefüllt:
        if (room.indexOf("C") == 0) {
            for (var i = 0; i < this.darstellung.CampusConfig[0].raumnamen.length; i++) {
                raume.push(this.darstellung.CampusConfig[0].raumnamen[i]);
            }
        }
        else if (room.indexOf("D") == 0) {
            for (var j = 0; j < this.darstellung.CampusConfig[1].raumnamen.length; j++) {
                raume.push(this.darstellung.CampusConfig[1].raumnamen[j]);
            }
        }
        //Fehlerbehandlung:
        if (raume.indexOf(room) == -1) {
            liste.style.display = "none";
            this.filterItems(room);
            return;
        }
        //Die einzelnen Timeslots werden überprüft:
        for (var y = 0; y < StundenSlot.length; y++) {
            if (this.darstellung.parseToRaum(room).isFree(StundenSlot[y], this.darstellung.giveWochentag())) {
                freeTimeSlot.push(y);
            }
            else {
                freeTimeSlot.push(99);
                zahl++;
            }
        }
        //Zugangsbeschränkung?:
        var zugang = this.gebaude.zugangsberechtigung;
        if (zugang.indexOf(room) != -1) {
            this.toasts("Für den Raum " + room + " brauchst du eine Zugangsberechtigung!");
        }
        liste.style.display = "block";
        //Markiert?
        var markiert = [];
        if (localStorage.getItem("markiert") != null) {
            markiert = localStorage.getItem("markiert").split(",");
        }
        if (markiert.indexOf(room) != -1) {
            lieblingsraum = "Dein Lieblingsraum ";
        }
        //Überschrift anpassen:
        if (zahl == StundenSlot.length) {
            freeUeberschrift[0] = lieblingsraum + " \"" + room + "\" ist heute leider nicht frei!";
        }
        else {
            freeUeberschrift[0] = lieblingsraum + " \"" + room + "\" ist heute zu folgenden Uhrzeiten frei:";
        }
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion füllt Array mit Räumen                                                         *
    *                                                                                           *
    ********************************************************************************************/
    Search.prototype.setItems = function () {
        var raume = [];
        for (var i = 0; i < this.darstellung.CampusConfig[0].raumnamen.length; i++) {
            raume.push(this.darstellung.CampusConfig[0].raumnamen[i]);
        }
        for (var j = 0; j < this.darstellung.CampusConfig[1].raumnamen.length; j++) {
            raume.push(this.darstellung.CampusConfig[1].raumnamen[j]);
        }
        this.items = raume;
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion ruft die Filterfunktion mit dem Inhalt der Searchbar auf.                      *
    *   event -> die Searchbar                                                                  *
    *                                                                                           *
    ********************************************************************************************/
    Search.prototype.filterItems2 = function (event) {
        var liste = document.getElementById('liste');
        liste.style.display = "none";
        this.filterItems(event.target.value);
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion filtert die Räume                                                              *
    *   value -> String, nach dem in den Raumnamen gesucht werden soll                          *
    *                                                                                           *
    ********************************************************************************************/
    Search.prototype.filterItems = function (value) {
        this.setItems();
        var val = value;
        if (val && val.trim() !== '') {
            this.items = this.items.filter(function (item) {
                return item.toLowerCase().includes(val.toLowerCase());
            });
            if (this.items.length == 0) {
                this.items.unshift("Dieser Raum existiert leider nicht!");
            }
            else {
                this.items.unshift("Dieser Raum existiert leider nicht! Vielleicht hilft dir diese Liste:");
            }
        }
        else {
            this.items.unshift("Dieser Raum existiert leider nicht! Vielleicht hilft dir diese Liste:");
        }
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion erstellt eine Meldung                                                          *
    *   message -> String mit der Nachricht, die die Meldung enthalten soll                     *
    *                                                                                           *
    ********************************************************************************************/
    Search.prototype.toasts = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: 'middle',
            cssClass: "my-toast"
        });
        toast.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */])
    ], Search.prototype, "nav", void 0);
    Search = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search',template:/*ion-inline-start:"/home/patrick/Schreibtisch/WahlprojektSS18/src/pages/search/search.html"*/'<!--\nDer Header der Seite mit dem Titel der Seite und dem Menü/Backbutton\n-->\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Raumsuche</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<!--\nDer Inhalt der Seite\n-->\n<ion-content padding>\n  <b>Suche nach deinem Lieblingsraum:</b>\n  <!--\n  Die Searchbar\n  -->\n  <ion-searchbar (ionCancel)="onCancel($event)" (change)="searchRoom($event)" (input)="filterItems2($event)" placeholder="Lieblingsraum" [attr.autofocus]="shouldFocus"></ion-searchbar>\n\n  <!--\n  Eine Liste mit Suchvorschlägen\n  -->\n  <ion-list>\n    <ng-container *ngFor="let item of items; let i = index" [attr.data-index]="i">\n      <div style="margin: 15px; padding: 5px; border: thin solid red; border-radius: 3px; color: red;" *ngIf="i == 0">{{ item }}</div>\n      <ion-item (click)="searchRoom2(item)" *ngIf="i != 0">\n        {{ item }}\n      </ion-item>\n    </ng-container>\n  </ion-list>\n\n  <!--\n  Die Uhrzeiten, zu denen der Raum frei ist\n  -->\n  <ion-list>\n    <span id="liste">\n      <ng-container *ngFor="let item of freeTimeSlot; let i = index" [attr.data-index]="i">\n        <ng-container *ngFor="let head of freeUeberschrift">\n          <!--\n          Überschrift mit Raumnamen:\n          -->\n          <h5 *ngIf="i == 0" style="margin-top: 30px;"> {{ head }} </h5>\n        </ng-container>\n        <!--\n        Uhrzeiten\n        -->\n        <ion-item style="margin-top: 20px;" *ngIf="item == 0">08:15 bis 09:45</ion-item>\n        <ion-item style="margin-top: 20px;" *ngIf="item == 1">10:00 bis 11:30</ion-item>\n        <ion-item style="margin-top: 20px;" *ngIf="item == 2">11:45 bis 13:15</ion-item>\n        <ion-item style="margin-top: 20px;" *ngIf="item == 3">14:15 bis 15:45</ion-item>\n        <ion-item style="margin-top: 20px;" *ngIf="item == 4">16:00 bis 17:30</ion-item>\n        <ion-item style="margin-top: 20px;" *ngIf="item == 5">17:45 bis 19:15</ion-item>\n        <ion-item style="margin-top: 20px;" *ngIf="item == 6">19:30 bis 21:00</ion-item>\n        <ion-item style="margin-top: 20px; margin-bottom: 50px;" *ngIf="item == 7">ab 21:00</ion-item>\n      </ng-container>\n    </span>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/patrick/Schreibtisch/WahlprojektSS18/src/pages/search/search.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], Search);
    return Search;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Darstellung; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RaumModel_1__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ical_js__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ical_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ical_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Veranstaltung__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__GebaudeModel__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__CampusModel__ = __webpack_require__(252);





var Darstellung = /** @class */ (function () {
    /********************************************************************************************
    *                                                                                           *
    *   Konstruktor setzt das Gebäude.                                                             *
    *                                                                                           *
    *   wahl -> Nummer des Gebäude (0 -> C-Gebäude, 1 -> D-Gebäude)                             *
    *                                                                                           *
    ********************************************************************************************/
    function Darstellung(wahl) {
        /********************************************************************************************
        *                                                                                           *
        *   Enthält alle Gebäude und Räume in den Gebäuden                                          *
        *                                                                                           *
        ********************************************************************************************/
        this.CampusConfig = [
            {
                gebaudename: "C",
                raumnamen: [
                    "C001",
                    "C007",
                    "C035",
                    "C037",
                    "C113",
                    "C213",
                    "C237",
                    "C305",
                    "C313",
                    "C361",
                    "C375",
                    "C377",
                    "C405",
                    "C407",
                    "C413",
                ]
            },
            {
                gebaudename: "D",
                raumnamen: [
                    "D01",
                    "D02",
                    "D12",
                    "D13",
                    "D14",
                    "D15",
                    "D17",
                    "D18",
                ]
            }
        ];
        this.freeRooms = [];
        this.zugang = [];
        this.GebaudeAuswahl = wahl;
    }
    /********************************************************************************************
    *                                                                                           *
    *   Funktion gibt den aktuellen Wochentag zurück                                            *
    *                                                                                           *
    *   RETURN-Wert: Der aktuelle Wochentag als String                                          *
    *                                                                                           *
    ********************************************************************************************/
    Darstellung.prototype.giveWochentag = function () {
        var jetzt = new Date();
        switch (jetzt.getDay()) {
            case 1: return "Montag";
            case 2: return "Dienstag";
            case 3: return "Mittwoch";
            case 4: return "Donnerstag";
            case 5: return "Freitag";
            case 6: return "Samstag";
            case 0: return "Sonntag";
            default: break;
        }
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion parst ein Datum aus dem Raumplan (Format: HH:MM:SSTJahr-Monat-Tag)             *
    *   und ermittelt dessen Wochentag.                                                         *
    *                                                                                           *
    *   text -> Datum                                                                           *
    *                                                                                           *
    *   RETURN-Wert: Der Wochentag eines Datums                                                 *
    *                                                                                           *
    ********************************************************************************************/
    Darstellung.prototype.parseDateToWochentag = function (text) {
        var datum = text.split("T");
        datum.pop();
        datum = datum[0].split("-");
        var datum2 = new Date(datum[0], datum[1] - 1, datum[2]);
        var tag = datum2.getDay();
        var wochentag = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
        return wochentag[tag];
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion parst ein Datum aus dem Raumplan (Format: HH:MM:SSTJahr-Monat-Tag)             *
    *   und ermittelt dessen Uhrzeit.                                                           *
    *                                                                                           *
    *   text -> Uhrzeit, die geparst werden soll                                                *
    *                                                                                           *
    *   RETURN-Wert: Die Uhrzeit eines Datums                                                   *
    *                                                                                           *
    ********************************************************************************************/
    Darstellung.prototype.parseUhrZeit = function (text) {
        var datum = text.split("T");
        var tmp = datum[1];
        return tmp;
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion fügt in die Gebäude einen Raum hinzu                                           *
    *                                                                                           *
    *   raumnamen -> Array mit Namen der Räume                                                  *
    *   name -> Name des Gebäudes                                                               *
    *                                                                                           *
    *   RETURN-Wert: Das erstellte Gebäude                                                      *
    *                                                                                           *
    ********************************************************************************************/
    Darstellung.prototype.parseGebaude = function (raumnamen, name) {
        var _this = this;
        var gebaude = new __WEBPACK_IMPORTED_MODULE_3__GebaudeModel__["a" /* GebaudeModel */](name);
        raumnamen.forEach(function (raumname) {
            var raum = _this.parseToRaum(raumname);
            gebaude.addRaum(raum);
        });
        return gebaude;
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion parst die Raumpläne und fügt Veranstaltungen einem Raum hinzu.                 *
    *                                                                                           *
    *   raumname -> Name des Raums für den der Raumplan ermittelt werden soll                   *
    *                                                                                           *
    *   RETURN-Wert: Der erstellte Raum                                                         *
    *                                                                                           *
    ********************************************************************************************/
    Darstellung.prototype.parseToRaum = function (raumname) {
        var raum = new __WEBPACK_IMPORTED_MODULE_0__RaumModel_1__["a" /* RaumModel */](raumname);
        var ics = raum.getICS(localStorage.getItem(raumname));
        ics.pop();
        var jcalData = __WEBPACK_IMPORTED_MODULE_1_ical_js___default.a.parse(ics.join("\r\n"));
        var vcalendar = new __WEBPACK_IMPORTED_MODULE_1_ical_js___default.a.Component(jcalData);
        var vevent = vcalendar.getAllSubcomponents('vevent');
        for (var i = 0; i < vevent.length; i++) {
            var start = vevent[i].getFirstPropertyValue('dtstart');
            var end = vevent[i].getFirstPropertyValue('dtend');
            var startZeit = this.parseUhrZeit(start.toString());
            var endZeit = this.parseUhrZeit(end.toString());
            var name = vevent[i].getFirstPropertyValue('description');
            var wochentag = this.parseDateToWochentag(start.toString());
            this.neueVeranstaltung(name, wochentag, startZeit, endZeit, raum);
            this.laengereVeranstaltungen(name, wochentag, startZeit, endZeit, raum);
        }
        return raum;
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion erstellt eine neue Veranstaltung.                                              *
    *                                                                                           *
    *   name -> Name der Veranstaltung                                                          *
    *   wochentag -> Wochtag der Veranstaltung                                                  *
    *   startZeit -> Beginn der Veranstaltung                                                   *
    *   endZeit -> Ende der Veranstaltung                                                       *
    *   raum -> Raum, zu dem die Veranstaltung hinzugefügt werden soll                          *
    *                                                                                           *
    ********************************************************************************************/
    Darstellung.prototype.neueVeranstaltung = function (name, wochentag, startZeit, endZeit, raum) {
        var veranstaltung = new __WEBPACK_IMPORTED_MODULE_2__Veranstaltung__["a" /* Veranstaltung */](name, wochentag, startZeit, endZeit);
        raum.addVeranstaltung(veranstaltung);
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion erstellt eine neue Veranstaltung.                                              *
    *                                                                                           *
    *   name -> Name der Veranstaltung                                                          *
    *   wochentag -> Wochtag der Veranstaltung                                                  *
    *   startZeit -> Beginn der Veranstaltung                                                   *
    *   endZeit -> Ende der Veranstaltung                                                       *
    *   raum -> Raum, in der die Veranstaltung stattfindet                                      *
    *                                                                                           *
    ********************************************************************************************/
    Darstellung.prototype.laengereVeranstaltungen = function (name, wochentag, startZeit, endZeit, raum) {
        switch (startZeit) {
            case "08:15:00":
                if (endZeit == "11:30:00") {
                    this.neueVeranstaltung(name, wochentag, "10:00:00", endZeit, raum);
                }
                else if (endZeit == "13:15:00") {
                    this.neueVeranstaltung(name, wochentag, "10:00:00", endZeit, raum);
                    this.neueVeranstaltung(name, wochentag, "11:45:00", endZeit, raum);
                }
                break;
            case "10:00:00":
                if (endZeit == "13:15:00") {
                    this.neueVeranstaltung(name, wochentag, "11:45:00", endZeit, raum);
                }
                else if (endZeit == "15:45:00") {
                    this.neueVeranstaltung(name, wochentag, "11:45:00", endZeit, raum);
                    this.neueVeranstaltung(name, wochentag, "14:15:00", endZeit, raum);
                }
                break;
            case "11:45:00":
                if (endZeit == "15:45:00") {
                    this.neueVeranstaltung(name, wochentag, "14:15:00", endZeit, raum);
                }
                else if (endZeit == "17:30:00") {
                    this.neueVeranstaltung(name, wochentag, "14:15:00", endZeit, raum);
                    this.neueVeranstaltung(name, wochentag, "16:00:00", endZeit, raum);
                }
                break;
            case "14:15:00":
                if (endZeit == "17:30:00") {
                    this.neueVeranstaltung(name, wochentag, "16:00:00", endZeit, raum);
                }
                else if (endZeit == "19:15:00") {
                    this.neueVeranstaltung(name, wochentag, "16:00:00", endZeit, raum);
                    this.neueVeranstaltung(name, wochentag, "17:45:00", endZeit, raum);
                }
                break;
            case "16:00:00":
                if (endZeit == "19:15:00") {
                    this.neueVeranstaltung(name, wochentag, "17:45:00", endZeit, raum);
                }
                else if (endZeit == "21:00:00") {
                    this.neueVeranstaltung(name, wochentag, "17:45:00", endZeit, raum);
                    this.neueVeranstaltung(name, wochentag, "19:30:00", endZeit, raum);
                }
                break;
            case "17:45:00":
                if (endZeit == "21:00:00") {
                    this.neueVeranstaltung(name, wochentag, "19:30:00", endZeit, raum);
                }
        }
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion erstellt den Campus und füllt den Array freeRooms mit den freien Räumen.       *
    *                                                                                           *
    *   RETURN-Wert: Der erstellte Campus                                                       *
    *                                                                                           *
    ********************************************************************************************/
    Darstellung.prototype.parseToCampus = function () {
        var campus = new __WEBPACK_IMPORTED_MODULE_4__CampusModel__["a" /* CampusModel */]("HSRM");
        for (var _i = 0, _a = this.CampusConfig; _i < _a.length; _i++) {
            var gebaudeConfig = _a[_i];
            var gebaude = this.parseGebaude(gebaudeConfig.raumnamen, gebaudeConfig.gebaudename);
            campus.addGebaude(gebaude);
        }
        for (var i = 0; i < campus.gebaude[this.GebaudeAuswahl].getFreeRooms().length; i++) {
            this.freeRooms.push(campus.gebaude[this.GebaudeAuswahl].getFreeRooms()[i]);
        }
        for (var j = 0; j < campus.gebaude[this.GebaudeAuswahl].zugangsberechtigung.length; j++) {
            this.zugang.push(campus.gebaude[this.GebaudeAuswahl].zugangsberechtigung[j]);
        }
        return campus;
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion entfernt die Sekunden in der Uhrzeit                                           *
    *                                                                                           *
    *   zeit -> Uhrzeit, die bearbeitet werden soll                                             *
    *                                                                                           *
    *   RETURN-Wert: Die geänderte Uhrzeit                                                      *
    *                                                                                           *
    ********************************************************************************************/
    Darstellung.prototype.changeZeit = function (zeit) {
        switch (zeit) {
            case "08:15:00": return "08:15";
            case "09:45:00": return "09:45";
            case "10:00:00": return "10:00";
            case "11:30:00": return "11:30";
            case "11:45:00": return "11:45";
            case "13:15:00": return "13:15";
            case "14:15:00": return "14:15";
            case "15:45:00": return "15:45";
            case "16:00:00": return "16:00";
            case "17:30:00": return "17:30";
            case "17:45:00": return "17:45";
            case "19:15:00": return "19:15";
            case "19:30:00": return "19:30";
            case "21:00:00": return "21:00";
        }
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion erstellt ein HTML-Element.                                                     *
    *                                                                                           *
    *   text -> Text der in das HTML-Element gefüllt werden soll.                               *
    *   tag -> Tag des HTML-Elements                                                            *
    *                                                                                           *
    *   RETURN-Wert: Das erstellte HTML-Element                                                 *
    *                                                                                           *
    ********************************************************************************************/
    Darstellung.prototype.erstelleElement = function (text, tag) {
        var element = document.createElement(tag);
        var texte = text.split(",");
        for (var i = 0; i < texte.length; i++) {
            var breaks = document.createElement("div");
            var text2 = document.createTextNode(texte[i]);
            breaks.appendChild(text2);
            element.appendChild(breaks);
        }
        if (texte.length > 1) {
            element.style.borderRadius = "6px";
            element.style.width = "100%";
            element.style.padding = "3px";
        }
        return element;
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion erstellt eine optische Darstellung                                             *
    *   der in getLehrveranstaltungen() ermittelten                                             *
    *   Lehrveranstaltungen für einen Raum                                                      *
    *                                                                                           *
    *   lehrveranstaltungen -> ein Array mit den Lehrveranstaltungen, Uhrzeiten und Wochentagen *
    *   raumname -> Name des Raums für den der Raumplan dargestellt werden soll                 *
    *                                                                                           *
    *   Aufbau des DOM-Trees:                                                                   *
    *   <show2> //in page.ts                                                                    *
    *     <inhalt>                              #                                               *
    *       <ueberschrift>                        #                                             *
    *       ...Kann mehrere Ueberschriften         # werden in dieser Funktion erstellt         *
    *       <veranstaltung>                        # und dann zurückgegeben                     *
    *       ...und Veranstaltungen enthalten      #                                             *
    *     </inhalt>                             #                                               *
    *   </show2>                                                                                *
    *                                                                                           *
    *   RETURN-Wert: Der erstellte Raumplan                                                     *
    *                                                                                           *
    ********************************************************************************************/
    Darstellung.prototype.zeigeLehrveranstaltungen = function (lehrveranstaltungen, raumname) {
        var inhalt = document.createElement("div");
        var ueberschrift = this.erstelleElement(raumname, "h3");
        inhalt.appendChild(ueberschrift);
        var veranstaltung;
        var lehrvtmp = "";
        if (lehrveranstaltungen.length == 0) {
            veranstaltung = this.erstelleElement("In diesem Raum finden keine Veranstaltungen statt.,Studentischer Arbeitsraum.", "p");
            veranstaltung.style.backgroundColor = "rgba(140, 140, 140, 0.3)";
            veranstaltung.style.border = "2px solid rgb(140, 140, 140)";
            inhalt.appendChild(veranstaltung);
            return inhalt;
        }
        for (var j = 0; j < lehrveranstaltungen.length; j++) {
            //Wenn im Array ein Wochentag steht, dann wird eine Wochentagsüberschrift erstellt:
            switch (lehrveranstaltungen[j]) {
                case "Montag":
                    this.erstelleUeberschrift("Montag", inhalt);
                    continue;
                case "Dienstag":
                    this.erstelleUeberschrift("Dienstag", inhalt);
                    continue;
                case "Mittwoch":
                    this.erstelleUeberschrift("Mittwoch", inhalt);
                    continue;
                case "Donnerstag":
                    this.erstelleUeberschrift("Donnerstag", inhalt);
                    continue;
                case "Freitag":
                    this.erstelleUeberschrift("Freitag", inhalt);
                    continue;
                case "Samstag":
                    this.erstelleUeberschrift("Samstag", inhalt);
                    continue;
                case "Sonntag":
                    this.erstelleUeberschrift("Sonntag", inhalt);
                    continue;
            }
            if (lehrveranstaltungen[j] != lehrvtmp) {
                //Ermitteln welcher Veranstaltungstyp es ist:
                var vl = lehrveranstaltungen[j].indexOf("Vorlesung");
                var se = lehrveranstaltungen[j].indexOf("Seminar");
                var pr = lehrveranstaltungen[j].indexOf("Praktikum");
                var ue = lehrveranstaltungen[j].indexOf("Übung");
                veranstaltung = this.erstelleElement("" + lehrveranstaltungen[j] + "," + lehrveranstaltungen[j + 1], "p");
                if (vl != -1) {
                    //Farben für Vorlesungen festlegen:
                    veranstaltung.style.backgroundColor = "rgba(74, 106, 255, 0.5)";
                    veranstaltung.style.border = "2px solid rgb(74, 106, 255)";
                }
                else if (se != -1) {
                    //Farben für Seminar festlegen:
                    veranstaltung = this.erstelleElement("" + lehrveranstaltungen[j] + "," + lehrveranstaltungen[j + 1], "p");
                    veranstaltung.style.backgroundColor = "rgba(26, 123, 81, 0.5)";
                    veranstaltung.style.border = "2px solid rgb(26, 123, 81)";
                }
                else if (pr != -1) {
                    //Farben für Praktikum festlegen:
                    veranstaltung = this.erstelleElement("" + lehrveranstaltungen[j] + "," + lehrveranstaltungen[j + 1], "p");
                    veranstaltung.style.backgroundColor = "rgba(255, 146, 63, 0.5)";
                    veranstaltung.style.border = "2px solid rgb(255, 146, 63)";
                }
                else if (ue != -1) {
                    //Farben für Uebung festlegen:
                    veranstaltung = this.erstelleElement("" + lehrveranstaltungen[j] + "," + lehrveranstaltungen[j + 1], "p");
                    veranstaltung.style.backgroundColor = "rgba(44, 250, 40, 0.4)";
                    veranstaltung.style.border = "2px solid rgb(44, 250, 40)";
                }
                else {
                    //Farben für Sonstige Veranstaltung festlegen:
                    veranstaltung = this.erstelleElement("" + lehrveranstaltungen[j] + "," + lehrveranstaltungen[j + 1], "p");
                    veranstaltung.style.backgroundColor = "rgba(140, 140, 140, 0.3)";
                    veranstaltung.style.border = "2px solid rgb(140, 140, 140)";
                }
                inhalt.appendChild(veranstaltung);
                lehrvtmp = lehrveranstaltungen[j + 1];
            }
        }
        return inhalt;
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion erstellt eine Wochentags-Überschrift für den Raumplan.                         *
    *                                                                                           *
    *   wochentag -> Name des Wochentags                                                        *
    *   inhalt -> HTML-Element, zu dem die Überschrift hinzugefügt wird                         *
    *                                                                                           *
    ********************************************************************************************/
    Darstellung.prototype.erstelleUeberschrift = function (wochentag, inhalt) {
        var ueberschrift = this.erstelleElement(wochentag, "h5");
        inhalt.appendChild(ueberschrift);
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion ermittelt Lehrveranstaltungen für einen Raum                                   *
    *                                                                                           *
    *   raumname -> Name des Raums für den der Raumplan ermittelt werden soll                   *
    *                                                                                           *
    *   RETURN-Wert: Der erstellte Raumplan                                                     *
    *                                                                                           *
    ********************************************************************************************/
    Darstellung.prototype.getLehrveranstaltungen = function (raumname) {
        var LehrveranstaltungoffreeRooms = [];
        var Wochentag = "";
        var uhrzeit;
        var uhrzeittmp = "";
        var name;
        var enduhrzeit;
        var enduhrzeittmp = "";
        var raum = this.parseToRaum(raumname);
        for (var i = 0; i < raum.veranstaltungen.length; i++) {
            name = raum.veranstaltungen[i].name;
            //Der Wochentag wird ermittelt und in den Array geschrieben
            //Damit der Wochentag nur einmal vorkommt:
            if (raum.veranstaltungen[i].wochentag != Wochentag) {
                Wochentag = raum.veranstaltungen[i].wochentag;
                LehrveranstaltungoffreeRooms.push(Wochentag);
                enduhrzeittmp = "";
                uhrzeittmp = "";
            }
            uhrzeit = this.changeZeit(raum.veranstaltungen[i].uhrzeit);
            enduhrzeit = this.changeZeit(raum.veranstaltungen[i].enduhrzeit);
            //Die Uhrzeit wird überprüft, damit parallele Veranstaltungen nicht vorkommen:
            if (uhrzeit != uhrzeittmp && enduhrzeit != enduhrzeittmp) {
                name = name.replace("\\", "");
                name = name.replace(",", "");
                LehrveranstaltungoffreeRooms.push(name);
                if (uhrzeit === undefined) {
                    LehrveranstaltungoffreeRooms.push("Keine Uhrzeit vorhanden!");
                }
                else {
                    LehrveranstaltungoffreeRooms.push(uhrzeit + " bis " + enduhrzeit);
                }
                uhrzeittmp = uhrzeit;
                enduhrzeittmp = enduhrzeit;
            }
        }
        return this.zeigeLehrveranstaltungen(LehrveranstaltungoffreeRooms, raumname);
    };
    return Darstellung;
}());

//# sourceMappingURL=Darstellung.js.map

/***/ })

},[203]);
//# sourceMappingURL=main.js.map