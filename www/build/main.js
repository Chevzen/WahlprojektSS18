webpackJsonp([4],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(163);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




function get_Token(text) {
    return text.substring(text.indexOf("authenticity_token", 600) + 29, text.indexOf("authenticity_token", 600) + 117);
}
function get_Semester(text) {
    return text.substring(text.indexOf("option selected") + 37, text.indexOf("option selected") + 46);
}
function get_Header(text) {
    return text.indexOf("Ihre Anmeldung war leider nicht erfolgreich, bitte überprüfen Sie ihre Login-Daten");
}
function get_Plan(text) {
    return text.substring(text.indexOf("_body") + 9, text.indexOf("Cache-Control") - 78);
}
function timeout(zahl) {
    var start = new Date().getTime();
    var i;
    for (i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > zahl * 1000) {
            break;
        }
    }
}
function loginFunction(element) {
    var options = {
        headers: new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/x-www-form-urlencoded' }),
        withCredentials: true
    };
    var zahl = 0;
    for (var i = 0; i < 1; i++) {
        element.http.get('https://aor.cs.hs-rm.de/login', options).subscribe(function (result) {
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
            element.http.post('https://aor.cs.hs-rm.de/login', body, options).subscribe(function (result) {
                //console.log("POST: "+ JSON.stringify(result, null, 2));
                //console.log("Header: "+ get_Header(JSON.stringify(result, null, 2)));
                if (-1 == get_Header(JSON.stringify(result, null, 2))) {
                    var loader = element.loadingCtrl.create({
                        content: "Daten werden geladen..."
                    });
                    loader.present();
                    //Falls vorhanden auch die Reservierungspläne herunterladen
                    //Raum D01:
                    element.http.get('https://aor.cs.hs-rm.de/rooms/1001264429/plans.ics', options).subscribe(function (result) {
                        console.log('login API success');
                        element.x = JSON.stringify(result, null, 2);
                        element.x = get_Plan(element.x);
                        window.localStorage.setItem("D01", element.x);
                        //console.log("D01: "+window.localStorage.getItem("D01"));
                    }, function (error) {
                        //console.log("Error: "+ JSON.stringify(error, null, 2));
                    });
                    //Raum D02:
                    element.http.get('https://aor.cs.hs-rm.de/rooms/1001264431/plans.ics', options).subscribe(function (result) {
                        //console.log('login API success');
                        element.x = JSON.stringify(result, null, 2);
                        element.x = get_Plan(element.x);
                        window.localStorage.setItem("D02", element.x);
                        //console.log("D02: "+window.localStorage.getItem("D02"));
                    }, function (error) {
                        console.log("Error: " + JSON.stringify(error, null, 2));
                    });
                    //Raum D11:
                    element.http.get('https://aor.cs.hs-rm.de/rooms/454131924/plans.ics', options).subscribe(function (result) {
                        //console.log('login API success');
                        element.x = JSON.stringify(result, null, 2);
                        element.x = get_Plan(element.x);
                        window.localStorage.setItem("D11", element.x);
                        //console.log("D11: "+window.localStorage.getItem("D11"));
                    }, function (error) {
                        console.log("Error: " + JSON.stringify(error, null, 2));
                    });
                    //Raum D12:
                    element.http.get('https://aor.cs.hs-rm.de/rooms/454131925/plans.ics', options).subscribe(function (result) {
                        //console.log('login API success');
                        element.x = JSON.stringify(result, null, 2);
                        element.x = get_Plan(element.x);
                        window.localStorage.setItem("D12", element.x);
                        //console.log("D12: "+window.localStorage.getItem("D12"));
                    }, function (error) {
                        console.log("Error: " + JSON.stringify(error, null, 2));
                    });
                    //Raum D13:
                    element.http.get('https://aor.cs.hs-rm.de/rooms/454131926/plans.ics', options).subscribe(function (result) {
                        //console.log('login API success');
                        element.x = JSON.stringify(result, null, 2);
                        element.x = get_Plan(element.x);
                        window.localStorage.setItem("D13", element.x);
                        //console.log("D13: "+window.localStorage.getItem("D13"));
                    }, function (error) {
                        console.log("Error: " + JSON.stringify(error, null, 2));
                    });
                    //Raum D14:
                    element.http.get('https://aor.cs.hs-rm.de/rooms/454131927/plans.ics', options).subscribe(function (result) {
                        //console.log('login API success');
                        element.x = JSON.stringify(result, null, 2);
                        element.x = get_Plan(element.x);
                        window.localStorage.setItem("D14", element.x);
                        //console.log("D14: "+window.localStorage.getItem("D14"));
                    }, function (error) {
                        console.log("Error: " + JSON.stringify(error, null, 2));
                    });
                    //Raum D15:
                    element.http.get('https://aor.cs.hs-rm.de/rooms/454131928/plans.ics', options).subscribe(function (result) {
                        //console.log('login API success');
                        element.x = JSON.stringify(result, null, 2);
                        element.x = get_Plan(element.x);
                        window.localStorage.setItem("D15", element.x);
                        //console.log("D15: "+window.localStorage.getItem("D15"));
                    }, function (error) {
                        console.log("Error: " + JSON.stringify(error, null, 2));
                    });
                    //Raum D17:
                    element.http.get('https://aor.cs.hs-rm.de/rooms/454131930/plans.ics', options).subscribe(function (result) {
                        //console.log('login API success');
                        element.x = JSON.stringify(result, null, 2);
                        element.x = get_Plan(element.x);
                        window.localStorage.setItem("D17", element.x);
                        //console.log("D17: "+window.localStorage.getItem("D17"));
                    }, function (error) {
                        console.log("Error: " + JSON.stringify(error, null, 2));
                    });
                    //Raum D18:
                    element.http.get('https://aor.cs.hs-rm.de/rooms/454131931/plans.ics', options).subscribe(function (result) {
                        //console.log('login API success');
                        element.x = JSON.stringify(result, null, 2);
                        element.x = get_Plan(element.x);
                        window.localStorage.setItem("D18", element.x);
                        //console.log("D18: "+window.localStorage.getItem("D18"));
                    }, function (error) {
                        console.log("Error: " + JSON.stringify(error, null, 2));
                    });
                    //Raum C001:
                    element.http.get('https://aor.cs.hs-rm.de/rooms/967118069/plans.ics', options).subscribe(function (result) {
                        //console.log('login API success');
                        element.x = JSON.stringify(result, null, 2);
                        element.x = get_Plan(element.x);
                        window.localStorage.setItem("C001", element.x);
                        //console.log("C001: "+window.localStorage.getItem("C001"));
                    }, function (error) {
                        console.log("Error: " + JSON.stringify(error, null, 2));
                    });
                    //Raum C007:
                    element.http.get('https://aor.cs.hs-rm.de/rooms/967118075/plans.ics', options).subscribe(function (result) {
                        //console.log('login API success');
                        element.x = JSON.stringify(result, null, 2);
                        element.x = get_Plan(element.x);
                        window.localStorage.setItem("C007", element.x);
                        //console.log("C007: "+window.localStorage.getItem("C007"));
                    }, function (error) {
                        console.log("Error: " + JSON.stringify(error, null, 2));
                    });
                    //Raum C035:
                    element.http.get('https://aor.cs.hs-rm.de/rooms/967321020/plans.ics', options).subscribe(function (result) {
                        //console.log('login API success');
                        element.x = JSON.stringify(result, null, 2);
                        element.x = get_Plan(element.x);
                        window.localStorage.setItem("C035", element.x);
                        //console.log("C035: "+window.localStorage.getItem("C035"));
                    }, function (error) {
                        console.log("Error: " + JSON.stringify(error, null, 2));
                    });
                    //Raum C037:
                    element.http.get('https://aor.cs.hs-rm.de/rooms/967321022/plans.ics', options).subscribe(function (result) {
                        //console.log('login API success');
                        element.x = JSON.stringify(result, null, 2);
                        element.x = get_Plan(element.x);
                        window.localStorage.setItem("C037", element.x);
                        //console.log("C037: "+window.localStorage.getItem("C037"));
                    }, function (error) {
                        console.log("Error: " + JSON.stringify(error, null, 2));
                    });
                    //Raum C113:
                    element.http.get('https://aor.cs.hs-rm.de/rooms/975705394/plans.ics', options).subscribe(function (result) {
                        //console.log('login API success');
                        element.x = JSON.stringify(result, null, 2);
                        element.x = get_Plan(element.x);
                        window.localStorage.setItem("C113", element.x);
                        //console.log("C113: "+window.localStorage.getItem("C113"));
                    }, function (error) {
                        console.log("Error: " + JSON.stringify(error, null, 2));
                    });
                    //Raum C213:
                    element.http.get('https://aor.cs.hs-rm.de/rooms/984225074/plans.ics', options).subscribe(function (result) {
                        //console.log('login API success');
                        element.x = JSON.stringify(result, null, 2);
                        element.x = get_Plan(element.x);
                        window.localStorage.setItem("C213", element.x);
                        //console.log("C213: "+window.localStorage.getItem("C213"));
                    }, function (error) {
                        console.log("Error: " + JSON.stringify(error, null, 2));
                    });
                    //Raum C237:
                    element.http.get('https://aor.cs.hs-rm.de/rooms/984360376/plans.ics', options).subscribe(function (result) {
                        //console.log('login API success');
                        element.x = JSON.stringify(result, null, 2);
                        element.x = get_Plan(element.x);
                        window.localStorage.setItem("C237", element.x);
                        //console.log("C237: "+window.localStorage.getItem("C237"));
                    }, function (error) {
                        console.log("Error: " + JSON.stringify(error, null, 2));
                    });
                    //Raum C305:
                    element.http.get('https://aor.cs.hs-rm.de/rooms/992677104/plans.ics', options).subscribe(function (result) {
                        //console.log('login API success');
                        element.x = JSON.stringify(result, null, 2);
                        element.x = get_Plan(element.x);
                        window.localStorage.setItem("C305", element.x);
                        //console.log("C305: "+window.localStorage.getItem("C305"));
                    }, function (error) {
                        console.log("Error: " + JSON.stringify(error, null, 2));
                    });
                    //Raum C313:
                    element.http.get('https://aor.cs.hs-rm.de/rooms/992744751/plans.ics', options).subscribe(function (result) {
                        //console.log('login API success');
                        element.x = JSON.stringify(result, null, 2);
                        element.x = get_Plan(element.x);
                        window.localStorage.setItem("C313", element.x);
                        //console.log("C313: "+window.localStorage.getItem("C313"));
                    }, function (error) {
                        console.log("Error: " + JSON.stringify(error, null, 2));
                    });
                    //Raum C361:
                    element.http.get('https://aor.cs.hs-rm.de/rooms/1001264469/plans.ics', options).subscribe(function (result) {
                        //console.log('login API success');
                        element.x = JSON.stringify(result, null, 2);
                        element.x = get_Plan(element.x);
                        window.localStorage.setItem("C361", element.x);
                        //console.log("C361: "+window.localStorage.getItem("C361"));
                    }, function (error) {
                        console.log("Error: " + JSON.stringify(error, null, 2));
                    });
                    //Raum C375:
                    element.http.get('https://aor.cs.hs-rm.de/rooms/1001264470/plans.ics', options).subscribe(function (result) {
                        //console.log('login API success');
                        element.x = JSON.stringify(result, null, 2);
                        element.x = get_Plan(element.x);
                        window.localStorage.setItem("C375", element.x);
                        //console.log("C375: "+window.localStorage.getItem("C375"));
                    }, function (error) {
                        console.log("Error: " + JSON.stringify(error, null, 2));
                    });
                    //Raum C377:
                    element.http.get('https://aor.cs.hs-rm.de/rooms/1001264471/plans.ics', options).subscribe(function (result) {
                        //console.log('login API success');
                        element.x = JSON.stringify(result, null, 2);
                        element.x = get_Plan(element.x);
                        window.localStorage.setItem("C377", element.x);
                        //console.log("C377: "+window.localStorage.getItem("C377"));
                    }, function (error) {
                        console.log("Error: " + JSON.stringify(error, null, 2));
                    });
                    //Raum C405:
                    element.http.get('https://aor.cs.hs-rm.de/rooms/1001196781/plans.ics', options).subscribe(function (result) {
                        //console.log('login API success');
                        element.x = JSON.stringify(result, null, 2);
                        element.x = get_Plan(element.x);
                        window.localStorage.setItem("C405", element.x);
                        //console.log("C405: "+window.localStorage.getItem("C405"));
                    }, function (error) {
                        console.log("Error: " + JSON.stringify(error, null, 2));
                    });
                    //Raum C407:
                    element.http.get('https://aor.cs.hs-rm.de/rooms/1001196783/plans.ics', options).subscribe(function (result) {
                        //console.log('login API success');
                        element.x = JSON.stringify(result, null, 2);
                        element.x = get_Plan(element.x);
                        window.localStorage.setItem("C407", element.x);
                        //console.log("C407: "+window.localStorage.getItem("C407"));
                    }, function (error) {
                        console.log("Error: " + JSON.stringify(error, null, 2));
                    });
                    //Raum C413:
                    element.http.get('https://aor.cs.hs-rm.de/rooms/1001264428/plans.ics', options).subscribe(function (result) {
                        //console.log('login API success');
                        element.x = JSON.stringify(result, null, 2);
                        element.x = get_Plan(element.x);
                        window.localStorage.setItem("C413", element.x);
                        //console.log("C413: "+window.localStorage.getItem("C413"));
                    }, function (error) {
                        console.log("Error: " + JSON.stringify(error, null, 2));
                    });
                    timeout(4);
                    loader.dismiss();
                    window.localStorage.setItem("benutzer", element.benutzername);
                    window.localStorage.setItem("passwort", element.password);
                    console.log("Benutzername und Passwort gespeichert.");
                    console.log(window.localStorage.getItem("benutzer"));
                    element.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
                }
                else {
                    var fehlerFeld = document.getElementById('Fehler');
                    fehlerFeld.innerText = "Benutzername oder Passwort falsch.";
                    fehlerFeld.style.display = "block";
                    var fehlerFeldZwei = document.getElementById('Fehler2');
                    fehlerFeldZwei.innerText = "Login fehlgeschlagen. Bitte die App erneut starten.";
                    fehlerFeldZwei.style.display = "block";
                    var ladeicon = document.getElementById('laden');
                    ladeicon.style.display = "none";
                    return;
                }
            }, function (error) {
                console.log("Error: POST: " + JSON.stringify(error, null, 2));
                console.log("Fehler " + zahl);
                zahl++;
                //Überprüfen ob alle Versuche gescheitert sind:
                if (zahl >= 1) {
                    var fehlerFeld = document.getElementById('Fehler');
                    fehlerFeld.innerText = "Benutzername oder Passwort falsch.";
                    fehlerFeld.style.display = "block";
                    var fehlerFeldZwei = document.getElementById('Fehler2');
                    fehlerFeldZwei.innerText = "Login fehlgeschlagen. Bitte starte die App erneut.";
                    fehlerFeldZwei.style.display = "block";
                    var ladeicon = document.getElementById('laden');
                    ladeicon.style.display = "none";
                    return;
                }
            }); //post
        }, function (error) {
            console.log("Error: " + JSON.stringify(error, null, 2));
        }); //get
    } //for
}
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, menuCtrl, alertCtrl, loadingCtrl, http) {
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.http = http;
        //Variablen anlegen
        this.showLogin = true;
        this.benutzername = '';
        this.password = '';
        this.token = '';
        this.x = '';
        this.i = 0;
        this.semester = '';
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('Dat is die LoginPage');
        //Hier überprüfen:
        //-ob schon Benutzerdaten vorhanden sind.
        //Wenn ja, dann Login-formular ausblenden und Login durchführen.
        var FehlerFeld = document.getElementById('Fehler');
        FehlerFeld.style.display = "none";
        var ladeicon = document.getElementById('laden');
        ladeicon.style.display = "none";
        //Nachfolgenden Abschnitt einkommentieren um automatisch angemeldet zu werden:
        if (window.localStorage.getItem("benutzer") != null && window.localStorage.getItem("passwort") != null) {
            this.benutzername = window.localStorage.getItem("benutzer");
            this.password = window.localStorage.getItem("passwort");
            timeout(3);
            var formular = document.getElementById('content');
            formular.style.display = "none";
            var header = document.getElementById('header');
            header.style.display = "none";
            var login = document.getElementById('login');
            login.style.display = "block";
            loginFunction(this);
            //Falls man beim Starten der App nicht den Login machen möchte einfach die loginFunction auskommentieren und diese Zeile einkommentieren:
            //this.navCtrl.setRoot(HomePage);
        }
    };
    LoginPage.prototype.clicked = function () {
        var fehlerFeld = document.getElementById('Fehler');
        fehlerFeld.style.display = "none";
    };
    LoginPage.prototype.doLogin = function () {
        if (this.showLogin) {
            console.log('login im gange');
            if (this.benutzername.length != 8 || this.password === '') {
                var fehlerFeld = document.getElementById('Fehler');
                fehlerFeld.innerText = "Benutzername oder Passwort falsch.";
                fehlerFeld.style.display = "block";
                return;
            }
            loginFunction(this);
            var ladeicon = document.getElementById('laden');
            ladeicon.style.display = "block";
        }
        else {
            this.showLogin = true;
        }
    };
    LoginPage.prototype.testLogin = function () {
        //Um einfach ohne Login auf die Startseite zu kommen diese Funktion verwenden:
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    LoginPage.prototype.ionViewWillEnter = function () {
        this.menuCtrl.swipeEnable(false);
    };
    LoginPage.prototype.ionViewDidLeave = function () {
        this.menuCtrl.swipeEnable(true);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/home/semih/Schreibtisch/WahlprojektSS18/src/pages/login/login.html"*/'<ion-header id="header" hide-nav-bar="true">\n\n  <ion-navbar>\n    <ion-title><img class="logo" style="margin-right: 10px; float: left;" src="assets/imgs/FreiRaumLogo.png" width="30px"/> Login</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<!--<ion-content id="content" padding>\n  <span style="margin-left: 15px;">Bitte mit deinem HDS-Account anmelden.</span><br>\n  <span id="Fehler" style="display: none; margin: 20px; margin-bottom: 10px; padding: 5px; border: thin solid red; border-radius: 3px; color: red;">\n  </span>\n  <div *ngIf="showLogin" style="margin-top: 10px;">\n    <ion-item>\n      <ion-input (click)="clicked()" type="benutzername" placeholder="Benutzername" [(ngModel)]="benutzername" [attr.autofocus]="shouldFocus"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-input (click)="clicked()" type="password" placeholder="Password" [(ngModel)]="password"></ion-input>\n    </ion-item>\n  </div>\n  <span style="width: 100%; text-align: center;">\n    <button ion-button style="margin: 20px; width: 200px;" (click)="doLogin()">Login</button>\n    <span id="Feld2" style="margin-top: 25px; width: 100%; text-align: center;"></span><br>\n  </span>\n</ion-content>-->\n\n<ion-content id="content" padding>\n  <div id="laden" style="display:none; margin: -15px; width: 100%;height:100%;background: rgba(0,0,0,.5);display:block;z-index:100;position:absolute;">\n    <div id="ladeimage" style="background: rgba(255,255,255,1); display:block; z-index:101;border:1px solid #FFFFFF;border-radius:3px;position:relative;margin:150px 50px;padding:10px;text-align:center;">\n      <img class="logo" src="assets/imgs/Ladeicon.gif" width="100"/><br><br>\n      Login wird durchgeführt.\n    </div>\n  </div>\n  <ion-grid style="height: 50%">\n    <ion-row style="height: 100%">\n      <span style="margin-left: 10px;">Bitte mit deinem HDS-Account anmelden.</span><br>\n      <span id="Fehler" style="display: none; margin: 15px; padding: 5px; border: thin solid red; border-radius: 3px; color: red;">\n      </span>\n      <div *ngIf="showLogin" style="margin-left: -5px; text-align:center; width: 100%;">\n        <ion-item>\n          <ion-input (click)="clicked()" type="benutzername" placeholder="Benutzername" [(ngModel)]="benutzername" [attr.autofocus]="shouldFocus"></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-input (click)="clicked()" type="password" placeholder="Password" [(ngModel)]="password"></ion-input>\n        </ion-item>\n      </div>\n      <span style="width: 100%; text-align: center;">\n        <button ion-button style="margin: 20px; width: 200px;" (click)="doLogin()">Login</button>\n      </span>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n\n<ion-content id="login" padding style="display:none;">\n  <ion-grid style="height: 60%">\n    <ion-row justify-content-center align-items-center style="text-align: center; height: 100%">\n      <img class="logo" src="assets/imgs/Ladeicon.gif" width="250"/>\n      <span id="Fehler2" style="margin-top: 15px;">Login wird durchgeführt.</span><br>\n      <h1>Finde deinen freien Raum!</h1>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/home/semih/Schreibtisch/WahlprojektSS18/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]])
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
	"../pages/c/c.module": [
		286,
		3
	],
	"../pages/d/d.module": [
		287,
		2
	],
	"../pages/login/login.module": [
		288,
		1
	],
	"../pages/search/search.module": [
		285,
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RaumModel; });
var RaumModel = /** @class */ (function () {
    function RaumModel(raumname) {
        this.raumname = "";
        this.veranstaltungen = [];
        this.raumname = raumname;
    }
    RaumModel.prototype.addVeranstaltung = function (veranstaltung) {
        this.veranstaltungen.push(veranstaltung);
    };
    //Hilfsfunktion
    RaumModel.prototype.getICS = function (text) {
        text.trim();
        //console.log("text.split(\\r\\n): "+text.split("\\r\\n"));
        return text.split("\\r\\n");
    };
    RaumModel.prototype.getUhrZeit = function (text) {
        var datum = text.split("T");
        var tmp = datum[1];
        return tmp;
    };
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

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Veranstaltung; });
var Veranstaltung = /** @class */ (function () {
    function Veranstaltung(name, wochentag, uhrzeit, enduhrzeit) {
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

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GebaudeModel; });
var GebaudeModel = /** @class */ (function () {
    function GebaudeModel(gebaudename) {
        this.gebaudename = "";
        this.raume = [];
        this.gebaudename = gebaudename;
    }
    GebaudeModel.prototype.addRaum = function (raum) {
        this.raume.push(raum);
    };
    GebaudeModel.prototype.getFreeRooms = function () {
        var _this = this;
        var result = []; // RaumModel[] = [];
        var slots = this.giveSlots();
        for (var i = 0; i < slots.length; i++) {
            result.push(slots[i]);
            this.raume.forEach(function (raum) {
                if (raum.isFree(slots[i], _this.giveWochentag())) {
                    result.push(raum.raumname);
                }
            });
        }
        return result;
    };
    GebaudeModel.prototype.giveSlots = function () {
        var jetzt = new Date();
        var stunden = jetzt.getHours();
        var minuten = jetzt.getMinutes();
        switch (true) {
            case this.giveUhrzeit() == "8:15:00": return ["8:15:00", "10:00:00", "11:45:00", "14:15:00", "16:00:00", "17:45:00", "19:30:00"];
            case this.giveUhrzeit() == "10:00:00": return ["10:00:00", "11:45:00", "14:15:00", "16:00:00", "17:45:00", "19:30:00"];
            case this.giveUhrzeit() == "11:45:00": return ["11:45:00", "14:15:00", "16:00:00", "17:45:00", "19:30:00"];
            case this.giveUhrzeit() == "14:15:00": return ["14:15:00", "16:00:00", "17:45:00", "19:30:00"];
            case this.giveUhrzeit() == "16:00:00": return ["16:00:00", "17:45:00", "19:30:00"];
            case this.giveUhrzeit() == "17:45:00": return ["17:45:00", "19:30:00"];
            case this.giveUhrzeit() == "19:30:00": return ["19:30:00"];
            default: break;
        }
    };
    GebaudeModel.prototype.giveUhrzeit = function () {
        var jetzt = new Date();
        var stunden = jetzt.getHours();
        var minuten = jetzt.getMinutes();
        switch (true) {
            case ((stunden == 8 && minuten >= 15 || stunden == 9 && minuten <= 45)): return "8:15:00";
            case (stunden == 9 && minuten >= 45 || stunden == 10 || stunden == 11 && minuten <= 30): return "10:00:00";
            case (stunden == 11 && minuten >= 30 || stunden == 12 || stunden == 13 && minuten <= 15): return "11:45:00";
            case (stunden == 13 && minuten >= 15 || stunden == 14 && minuten <= 15): return "13:15:00";
            case (stunden == 14 && minuten >= 15 || stunden == 15 && minuten <= 45): return "14:15:00";
            case (stunden == 16 || stunden == 17 && minuten <= 30): return "16:00:00";
            case (stunden == 17 && minuten >= 45 || stunden == 18 || stunden == 19 && minuten <= 15): return "17:45:00";
            case (stunden == 19 && minuten >= 30 || stunden == 20 || stunden == 21): return "19:30:00";
            default: break;
        }
    };
    GebaudeModel.prototype.giveWochentag = function () {
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
    return GebaudeModel;
}());

//# sourceMappingURL=GebaudeModel.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CampusModel; });
var CampusModel = /** @class */ (function () {
    function CampusModel(name) {
        this.campusname = "";
        this.gebaude = [];
        this.campusname = name;
    }
    CampusModel.prototype.addGebaude = function (gebaude) {
        this.gebaude.push(gebaude);
    };
    return CampusModel;
}());

//# sourceMappingURL=CampusModel.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(228);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_c_c__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_d_d__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_search_search__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_login_login__ = __webpack_require__(103);
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
                __WEBPACK_IMPORTED_MODULE_9__pages_c_c__["a" /* Cgebaude */],
                __WEBPACK_IMPORTED_MODULE_10__pages_d_d__["a" /* Dgebaude */],
                __WEBPACK_IMPORTED_MODULE_11__pages_search_search__["a" /* Search */],
                __WEBPACK_IMPORTED_MODULE_12__pages_login_login__["a" /* LoginPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/search/search.module#SearchPageModule', name: 'Search', segment: 'search', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/c/c.module#CPageModule', name: 'Cgebaude', segment: 'c', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/d/d.module#DPageModule', name: 'Dgebaude', segment: 'd', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_http__["c" /* HttpModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_c_c__["a" /* Cgebaude */],
                __WEBPACK_IMPORTED_MODULE_10__pages_d_d__["a" /* Dgebaude */],
                __WEBPACK_IMPORTED_MODULE_11__pages_search_search__["a" /* Search */],
                __WEBPACK_IMPORTED_MODULE_12__pages_login_login__["a" /* LoginPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_c_c__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_d_d__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_search_search__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(103);
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
        this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */];
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
        this.pages = [
            { title: 'Campusplan', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Gebäude C', component: __WEBPACK_IMPORTED_MODULE_5__pages_c_c__["a" /* Cgebaude */] },
            { title: 'Gebäude D', component: __WEBPACK_IMPORTED_MODULE_6__pages_d_d__["a" /* Dgebaude */] },
            { title: 'Raumsuche', component: __WEBPACK_IMPORTED_MODULE_7__pages_search_search__["a" /* Search */] }
        ];
    }
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/semih/Schreibtisch/WahlprojektSS18/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <img class="logo" style="margin-left: 10px; float: left;" src="assets/imgs/FreiRaumLogo.png" width="40px"/>\n      <div style="padding-left: 20px; float: left; height: 40px; text-align: center; font-size: 12pt; vertical-align: middle;">\n        &nbsp;Finde deinen<br>&nbsp;freien Raum!\n      </div>\n      <ion-title>\n      </ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content padding>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/home/semih/Schreibtisch/WahlprojektSS18/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Search; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var Search = /** @class */ (function () {
    function Search(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    Search.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SearchPage');
    };
    Search = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search',template:/*ion-inline-start:"/home/semih/Schreibtisch/WahlprojektSS18/src/pages/search/search.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Raumsuche</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <b>Suche nach deinem Lieblingsraum:</b>\n  <ion-searchbar (ionCancel)="onCancel($event)" placeholder="Lieblingsraum" [attr.autofocus]="shouldFocus"></ion-searchbar>\n\n\n</ion-content>\n'/*ion-inline-end:"/home/semih/Schreibtisch/WahlprojektSS18/src/pages/search/search.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], Search);
    return Search;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__c_c__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__d_d__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_search__ = __webpack_require__(33);
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
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    HomePage.prototype.nextC = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__c_c__["a" /* Cgebaude */]);
    };
    HomePage.prototype.nextD = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__d_d__["a" /* Dgebaude */]);
    };
    HomePage.prototype.search = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__search_search__["a" /* Search */]);
    };
    HomePage.prototype.deleteDaten = function () {
        window.localStorage.removeItem("benutzer");
        window.localStorage.removeItem("passwort");
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/semih/Schreibtisch/WahlprojektSS18/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title style="float: left;">Campusplan</ion-title>\n    <ion-icon (click)="search()" style="float: right; position: relative; font-size: 2em; margin-right: 5px;" name="search"></ion-icon>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	<b>Herzlich Willkommen!<br></b>Bitte wähle dein Gebäude:\n\n	<img style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_01.jpg"/><br>\n	<img style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_02.jpg"/>\n	<img style="cursor: pointer; margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_03.jpg" (click)="nextD()"/>\n	<img style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_04.jpg"/><br>\n	<img style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_05.jpg"/><br>\n	<img style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_06.jpg"/>\n	<img style="cursor: pointer; margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_07.jpg" (click)="nextC()"/>\n	<img style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_08.jpg"/><br>\n	<img style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_09.jpg"/>\n\n  <button ion-button block style="margin-bottom: 20px;" (click)="deleteDaten()">Benutzerdaten löschen</button>\n\n\n</ion-content>\n'/*ion-inline-end:"/home/semih/Schreibtisch/WahlprojektSS18/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Cgebaude; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search_search__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_RaumModel_1__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ical_js__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ical_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ical_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__model_GebaudeModel__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__model_CampusModel__ = __webpack_require__(162);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









// Die Konfigurationsvariable für die Räume und Gebäudenamen, diese wird in den späteren Funktionen verwendet
var CampusConfig = [
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
var GebaudeAuswahl = 0;
var freeRooms = [];
function setGebaude(wahl) {
    GebaudeAuswahl = wahl;
}
function parseDateToWochentag(text) {
    var datum = text.split("T");
    datum.pop();
    datum = datum[0].split("-");
    var datum2 = new Date(datum[0], datum[1] - 1, datum[2]);
    var tag = datum2.getDay();
    var wochentag = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    return wochentag[tag];
}
function parseUhrZeit(text) {
    var datum = text.split("T");
    var tmp = datum[1];
    return tmp;
}
function parseGebaude(raumnamen, name) {
    var gebaude = new __WEBPACK_IMPORTED_MODULE_7__model_GebaudeModel__["a" /* GebaudeModel */](name);
    console.log("parseGebaude");
    console.log(name);
    raumnamen.forEach(function (raumname) {
        var raum = parseToRaum(raumname);
        console.log(raumname);
        gebaude.addRaum(raum);
    });
    return gebaude;
}
function parseToRaum(raumname) {
    var raum = new __WEBPACK_IMPORTED_MODULE_4__model_RaumModel_1__["a" /* RaumModel */](raumname);
    console.log("parseToRaum");
    console.log(raumname);
    var ics = raum.getICS(window.localStorage.getItem(raumname));
    ics.pop();
    var jcalData = __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.parse(ics.join("\r\n"));
    var vcalendar = new __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for (var i = 0; i < vevent.length; i++) {
        var start = vevent[i].getFirstPropertyValue('dtstart');
        var end = vevent[i].getFirstPropertyValue('dtend');
        var startZeit = parseUhrZeit(start.toString());
        var endZeit = parseUhrZeit(end.toString());
        var name = vevent[i].getFirstPropertyValue('description');
        var wochentag = parseDateToWochentag(start.toString());
        console.log("start:" + startZeit, "name" + name, "Wochentag " + wochentag, "end:" + endZeit);
        var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, startZeit, endZeit);
        raum.addVeranstaltung(veranstaltung);
        switch (startZeit) {
            case "08:15:00":
                if (endZeit == "11:30:00") {
                    console.log("hallo case 8 -11.30");
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "10:00:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                }
                else if (endZeit == "13:15:00") {
                    console.log("hallo case 8 -13");
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "10:00:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "11:45:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                }
                break;
            case "10:00:00":
                if (endZeit == "13:15:00") {
                    console.log("hallo case 10 -13.15");
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "11:45:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                }
                else if (endZeit == "14:15:00") {
                    console.log("hallo case 11.45-14.15");
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "11:45:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "13:15:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                }
                else if (endZeit == "15:45:00") {
                    console.log("hallo case 10 -15.45");
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "11:45:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "14:15:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                }
                break;
            case "11:30:00":
                if (endZeit == "14:15:00") {
                    console.log("hallo case 11.30-14.15");
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "13:15:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                }
                else if (endZeit == "15:45:00") {
                    console.log("hallo case 11.45-15.45");
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "14:15:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                }
                else if (endZeit == "17:30:00") {
                    console.log("hallo case 11.45-17.35");
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "14:15:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "16:00:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                }
                break;
            case "11:45:00":
                if (endZeit == "14:15:00") {
                    console.log("hallo case 11.45-14.15");
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "13:15:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                }
                else if (endZeit == "15:45:00") {
                    console.log("hallo case 11.45-15.45");
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "14:15:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                }
                else if (endZeit == "17:30:00") {
                    console.log("hallo case 11.45-17.35");
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "14:15:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "16:00:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                }
                break;
            case "14:15:00":
                if (endZeit == "17:30:00") {
                    console.log("hallo case 14.15-17.30");
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "16:00:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                }
                else if (endZeit == "19:15:00") {
                    console.log("hallo case 14.15-19.15");
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "16:00:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "17:45:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                }
                break;
            case "16:00:00":
                if (endZeit == "19:15:00") {
                    console.log("hallo case 16.00-19.15");
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "17:45:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                }
                else if (endZeit == "21:00:00") {
                    console.log("hallo case 16.00-21.00");
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "17:45:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "19:30:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                }
                break;
            case "17:45:00":
                if (endZeit == "21:00:00") {
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "19:30:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                }
            default:
        }
    }
    return raum;
}
function parseToCampus() {
    var campus = new __WEBPACK_IMPORTED_MODULE_8__model_CampusModel__["a" /* CampusModel */]("HSRM");
    console.log(CampusConfig);
    for (var _i = 0, CampusConfig_1 = CampusConfig; _i < CampusConfig_1.length; _i++) {
        var gebaudeConfig = CampusConfig_1[_i];
        var gebaude = parseGebaude(gebaudeConfig.raumnamen, gebaudeConfig.gebaudename);
        campus.addGebaude(gebaude);
        console.log(CampusConfig);
    }
    for (var i = 0; i < campus.gebaude[GebaudeAuswahl].getFreeRooms().length; i++) {
        freeRooms.push(campus.gebaude[GebaudeAuswahl].getFreeRooms()[i]);
    }
    console.log("test" + campus.gebaude[0].getFreeRooms()[0]);
    return campus;
}
var Cgebaude = /** @class */ (function () {
    function Cgebaude(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.freeRooms = freeRooms;
    }
    Cgebaude.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CPage');
        console.log(parseToCampus());
        console.log(freeRooms);
    };
    Cgebaude.prototype.BackToCampus = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    Cgebaude.prototype.search = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__search_search__["a" /* Search */]);
    };
    Cgebaude = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-c',template:/*ion-inline-start:"/home/semih/Schreibtisch/WahlprojektSS18/src/pages/c/c.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title style="float: left;">C-Gebäude</ion-title>\n    <ion-icon (click)="search()" style="float: right; position: relative; font-size: 2em; margin-right: 5px;" name="search"></ion-icon>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <b>Folgende Räume sind zur Zeit im Gebäude frei:</b><br><br>\n    <ion-list>\n      <ion-item *ngFor="let item of freeRooms">\n        {{ item }}\n      </ion-item>\n    </ion-list>\n\n  <button ion-button block style="margin-bottom: 20px;" (click)="BackToCampus()">Zum Campusplan</button>\n\n\n</ion-content>\n'/*ion-inline-end:"/home/semih/Schreibtisch/WahlprojektSS18/src/pages/c/c.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], Cgebaude);
    return Cgebaude;
}());

//# sourceMappingURL=c.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Dgebaude; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search_search__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_RaumModel_1__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ical_js__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ical_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ical_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__model_GebaudeModel__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__model_CampusModel__ = __webpack_require__(162);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









// Die Konfigurationsvariable für die Räume und Gebäudenamen, diese wird in den späteren Funktionen verwendet
var CampusConfig = [
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
var GebaudeAuswahl = 0;
var freeRooms = [];
function setGebaude(wahl) {
    GebaudeAuswahl = wahl;
}
function parseDateToWochentag(text) {
    var datum = text.split("T");
    datum.pop();
    datum = datum[0].split("-");
    var datum2 = new Date(datum[0], datum[1] - 1, datum[2]);
    var tag = datum2.getDay();
    var wochentag = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    return wochentag[tag];
}
function parseUhrZeit(text) {
    var datum = text.split("T");
    var tmp = datum[1];
    return tmp;
}
function parseGebaude(raumnamen, name) {
    var gebaude = new __WEBPACK_IMPORTED_MODULE_7__model_GebaudeModel__["a" /* GebaudeModel */](name);
    console.log("parseGebaude");
    console.log(name);
    raumnamen.forEach(function (raumname) {
        var raum = parseToRaum(raumname);
        console.log(raumname);
        gebaude.addRaum(raum);
    });
    return gebaude;
}
function parseToRaum(raumname) {
    var raum = new __WEBPACK_IMPORTED_MODULE_4__model_RaumModel_1__["a" /* RaumModel */](raumname);
    console.log("parseToRaum");
    console.log(raumname);
    var ics = raum.getICS(window.localStorage.getItem(raumname));
    ics.pop();
    var jcalData = __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.parse(ics.join("\r\n"));
    var vcalendar = new __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.Component(jcalData);
    var vevent = vcalendar.getAllSubcomponents('vevent');
    for (var i = 0; i < vevent.length; i++) {
        var start = vevent[i].getFirstPropertyValue('dtstart');
        var end = vevent[i].getFirstPropertyValue('dtend');
        var startZeit = parseUhrZeit(start.toString());
        var endZeit = parseUhrZeit(end.toString());
        var name = vevent[i].getFirstPropertyValue('description');
        var wochentag = parseDateToWochentag(start.toString());
        console.log("start:" + startZeit, "name" + name, "Wochentag " + wochentag, "end:" + endZeit);
        var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, startZeit, endZeit);
        raum.addVeranstaltung(veranstaltung);
        switch (startZeit) {
            case "08:15:00":
                if (endZeit == "11:30:00") {
                    console.log("hallo case 8 -11.30");
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "10:00:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                }
                else if (endZeit == "13:15:00") {
                    console.log("hallo case 8 -13");
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "10:00:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "11:45:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                }
                break;
            case "10:00:00":
                if (endZeit == "13:15:00") {
                    console.log("hallo case 10 -13.15");
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "11:45:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                }
                else if (endZeit == "14:15:00") {
                    console.log("hallo case 11.45-14.15");
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "11:45:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "13:15:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                }
                else if (endZeit == "15:45:00") {
                    console.log("hallo case 10 -15.45");
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "11:45:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "14:15:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                }
                break;
            case "11:30:00":
                if (endZeit == "14:15:00") {
                    console.log("hallo case 11.30-14.15");
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "13:15:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                }
                else if (endZeit == "15:45:00") {
                    console.log("hallo case 11.45-15.45");
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "14:15:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                }
                else if (endZeit == "17:30:00") {
                    console.log("hallo case 11.45-17.35");
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "14:15:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "16:00:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                }
                break;
            case "11:45:00":
                if (endZeit == "14:15:00") {
                    console.log("hallo case 11.45-14.15");
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "13:15:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                }
                else if (endZeit == "15:45:00") {
                    console.log("hallo case 11.45-15.45");
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "14:15:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                }
                else if (endZeit == "17:30:00") {
                    console.log("hallo case 11.45-17.35");
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "14:15:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "16:00:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                }
                break;
            case "14:15:00":
                if (endZeit == "17:30:00") {
                    console.log("hallo case 14.15-17.30");
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "16:00:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                }
                else if (endZeit == "19:15:00") {
                    console.log("hallo case 14.15-19.15");
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "16:00:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "17:45:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                }
                break;
            case "16:00:00":
                if (endZeit == "19:15:00") {
                    console.log("hallo case 16.00-19.15");
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "17:45:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                }
                else if (endZeit == "21:00:00") {
                    console.log("hallo case 16.00-21.00");
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "17:45:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "19:30:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                }
                break;
            case "17:45:00":
                if (endZeit == "21:00:00") {
                    var veranstaltung = new __WEBPACK_IMPORTED_MODULE_6__model_Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "19:30:00", endZeit);
                    raum.addVeranstaltung(veranstaltung);
                }
            default:
        }
    }
    return raum;
}
function parseToCampus() {
    var campus = new __WEBPACK_IMPORTED_MODULE_8__model_CampusModel__["a" /* CampusModel */]("HSRM");
    console.log(CampusConfig);
    for (var _i = 0, CampusConfig_1 = CampusConfig; _i < CampusConfig_1.length; _i++) {
        var gebaudeConfig = CampusConfig_1[_i];
        var gebaude = parseGebaude(gebaudeConfig.raumnamen, gebaudeConfig.gebaudename);
        campus.addGebaude(gebaude);
        console.log(CampusConfig);
    }
    for (var i = 0; i < campus.gebaude[GebaudeAuswahl].getFreeRooms().length; i++) {
        freeRooms.push(campus.gebaude[GebaudeAuswahl].getFreeRooms()[i]);
    }
    console.log("test" + campus.gebaude[0].getFreeRooms()[0]);
    return campus;
}
var Dgebaude = /** @class */ (function () {
    function Dgebaude(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.freeRooms = freeRooms;
    }
    Dgebaude.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DPage');
        console.log('ionViewDidLoad CPage');
        setGebaude(1);
        console.log(parseToCampus());
        console.log(freeRooms);
    };
    Dgebaude.prototype.BackToCampus = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    Dgebaude.prototype.search = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__search_search__["a" /* Search */]);
    };
    Dgebaude = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-d',template:/*ion-inline-start:"/home/semih/Schreibtisch/WahlprojektSS18/src/pages/d/d.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title style="float: left;">D-Gebäude</ion-title>\n    <ion-icon (click)="search()" style="float: right; position: relative; font-size: 2em; margin-right: 5px;" name="search"></ion-icon>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n	<b>Folgende Räume sind zur Zeit im D-Gebäude frei:</b><br><br>\n  <ion-list>\n    <ion-item *ngFor="let item of freeRooms">\n      {{ item }}\n    </ion-item>\n  </ion-list>\n\n  <button ion-button block style="margin-bottom: 20px;" (click)="BackToCampus()">Zum Campusplan</button>\n\n</ion-content>\n'/*ion-inline-end:"/home/semih/Schreibtisch/WahlprojektSS18/src/pages/d/d.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], Dgebaude);
    return Dgebaude;
}());

//# sourceMappingURL=d.js.map

/***/ })

},[207]);
//# sourceMappingURL=main.js.map