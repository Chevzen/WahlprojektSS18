webpackJsonp([4],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
<<<<<<< HEAD
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(160);
=======
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(162);
>>>>>>> 0cbab921ca933a0c9d99c539f92fa554583e655d
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
    //console.log("text.indexOf(authenticity_token, 600): "+text.indexOf("authenticity_token", 600));
    return text.substring(text.indexOf("authenticity_token", 600) + 29, text.indexOf("authenticity_token", 600) + 117);
}
function get_Semester(text) {
    //console.log("text.indexOf(option selected): "+text.indexOf("option selected"));
    return text.substring(text.indexOf("option selected") + 37, text.indexOf("option selected") + 46);
}
function get_Header(text) {
    //console.log("text.indexOf(Ihre Anmeldung war leider nicht erfolgreich, bitte überprüfen Sie ihre Login-Daten): "+text.indexOf("Ihre Anmeldung war leider nicht erfolgreich, bitte überprüfen Sie ihre Login-Daten"));
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
    for (var i = 0; i < 20; i++) {
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
                if (zahl >= 20) {
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
<<<<<<< HEAD
            loginFunction(this);
            var ladeicon = document.getElementById('laden');
            ladeicon.style.display = "block";
=======
            var loader = this.loadingCtrl.create({
                content: "Daten werden geladen..."
            });
            var body = 'utf8=%E2%9C%93&' +
                // TOKEN ÄNDERN
                'authenticity_token=%2BToF7JE%2BQ8HDAkMJ8LzJDRZcg%2F2SyQDxd6wnYgaw3JlqWEM3yd36daKKLqYCDI918Xu206UdvWol55eMHDpObw%3D%3D' +
                '&login%5Baccount%5D=' + this.benutzername +
                '&login%5Bpassword%5D=' + this.password +
                '&login%5Bterm_id%5D=343737466' +
                '&commit=Anmeldung';
            //let body = new URLSearchParams();
            //body.set('login[account]', this.benutzername);
            //body.set('login[password]', this.password);
            console.log("Body: " + body);
            //var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
            //      var headers = new Headers();
            //    headers.append('Content-Type','text/html; charset=utf-8');
            //headers.append('Content-Type','application/x-www-form-urlencoded');
            //let options = new RequestOptions({headers: headers, withCredentials:true});
            var options = {
                headers: new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/x-www-form-urlencoded' }),
                withCredentials: true
            };
            this.http.get('https://aor.cs.hs-rm.de/login').subscribe(function (result) {
                console.log('login API success');
                console.log("Result: " + result);
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
            }, function (error) {
                console.log("Error: " + JSON.stringify(error.json()));
            });
            this.http.post('https://aor.cs.hs-rm.de/login', body, options).subscribe(function (result) {
                console.log("POST: " + result);
            }, function (error) {
                console.log("Error: POST: " + error);
            });
>>>>>>> 0cbab921ca933a0c9d99c539f92fa554583e655d
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
<<<<<<< HEAD
<<<<<<< HEAD
            selector: 'page-login',template:/*ion-inline-start:"/home/semih/Schreibtisch/WahlprojektSS18/src/pages/login/login.html"*/'<ion-header id="header" hide-nav-bar="true">\n\n  <ion-navbar>\n    <ion-title><img class="logo" style="margin-right: 10px; float: left;" src="assets/imgs/FreiRaumLogo.png" width="30px"/> Login</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<!--<ion-content id="content" padding>\n  <span style="margin-left: 15px;">Bitte mit deinem HDS-Account anmelden.</span><br>\n  <span id="Fehler" style="display: none; margin: 20px; margin-bottom: 10px; padding: 5px; border: thin solid red; border-radius: 3px; color: red;">\n  </span>\n  <div *ngIf="showLogin" style="margin-top: 10px;">\n    <ion-item>\n      <ion-input (click)="clicked()" type="benutzername" placeholder="Benutzername" [(ngModel)]="benutzername" [attr.autofocus]="shouldFocus"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-input (click)="clicked()" type="password" placeholder="Password" [(ngModel)]="password"></ion-input>\n    </ion-item>\n  </div>\n  <span style="width: 100%; text-align: center;">\n    <button ion-button style="margin: 20px; width: 200px;" (click)="doLogin()">Login</button>\n    <span id="Feld2" style="margin-top: 25px; width: 100%; text-align: center;"></span><br>\n  </span>\n</ion-content>-->\n\n<ion-content id="content" padding>\n  <div id="laden" style="display:none; margin: -15px; width: 100%;height:100%;background: rgba(0,0,0,.5);display:block;z-index:100;position:absolute;">\n    <div id="ladeimage" style="background: rgba(255,255,255,1); display:block; z-index:101;border:1px solid #FFFFFF;border-radius:3px;position:relative;margin:150px 50px;padding:10px;text-align:center;">\n      <img class="logo" src="assets/imgs/Ladeicon.gif" width="100"/><br><br>\n      Login wird durchgeführt.\n    </div>\n  </div>\n  <ion-grid style="height: 50%">\n    <ion-row style="height: 100%">\n      <span style="margin-left: 10px;">Bitte mit deinem HDS-Account anmelden.</span><br>\n      <span id="Fehler" style="display: none; margin: 15px; padding: 5px; border: thin solid red; border-radius: 3px; color: red;">\n      </span>\n      <div *ngIf="showLogin" style="margin-left: -5px; text-align:center; width: 100%;">\n        <ion-item>\n          <ion-input (click)="clicked()" type="benutzername" placeholder="Benutzername" [(ngModel)]="benutzername" [attr.autofocus]="shouldFocus"></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-input (click)="clicked()" type="password" placeholder="Password" [(ngModel)]="password"></ion-input>\n        </ion-item>\n      </div>\n      <span style="width: 100%; text-align: center;">\n        <button ion-button style="margin: 20px; width: 200px;" (click)="doLogin()">Login</button>\n      </span>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n\n<ion-content id="login" padding style="display:none;">\n  <ion-grid style="height: 60%">\n    <ion-row justify-content-center align-items-center style="text-align: center; height: 100%">\n      <img class="logo" src="assets/imgs/Ladeicon.gif" width="250"/>\n      <span id="Fehler2" style="margin-top: 15px;">Login wird durchgeführt.</span><br>\n      <h1>Finde deinen freien Raum!</h1>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/home/semih/Schreibtisch/WahlprojektSS18/src/pages/login/login.html"*/,
=======
            selector: 'page-login',template:/*ion-inline-start:"/home/patrick/Schreibtisch/WahlprojektSS18/src/pages/login/login.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="background">\n<ion-card>\n	<ion-card-header>\n		Login\n	</ion-card-header>\n	<ion-card-content>\n		<ion-list no-line>\n			<ion-item>\n				<ion-input type="text" placeholder="Username"></ion-input>\n			</ion-item>\n			<ion-item>\n				<ion-input type="password" placeholder="Password"></ion-input>\n			</ion-item>\n			<button ion-button>Login</button>\n		</ion-list>\n	</ion-card-content>\n</ion-card>\n</ion-content>\n\n'/*ion-inline-end:"/home/patrick/Schreibtisch/WahlprojektSS18/src/pages/login/login.html"*/,
>>>>>>> origin
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]])
=======
            selector: 'page-login',template:/*ion-inline-start:"/home/felix/Schreibtisch/WahlprojektSS18/src/pages/login/login.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <span id="Fehler" style="display: none; margin: 20px; margin-bottom: 10px; padding: 5px; border: thin solid red; border-radius: 3px; color: red;">\n  </span>\n  <div *ngIf="showLogin" style="margin-top: 10px;">\n    <ion-item>\n      <ion-input (click)="clicked()" type="benutzername" placeholder="Benutzername" [(ngModel)]="benutzername"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-input (click)="clicked()" type="password" placeholder="Password" [(ngModel)]="password"></ion-input>\n    </ion-item>\n  </div>\n\n  <button ion-button style="margin: 20px; width: 200px;" (click)="doLogin()">Login</button>\n</ion-content>\n'/*ion-inline-end:"/home/felix/Schreibtisch/WahlprojektSS18/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]) === "function" && _d || Object])
>>>>>>> 0cbab921ca933a0c9d99c539f92fa554583e655d
    ], LoginPage);
    return LoginPage;
    var _a, _b, _c, _d;
}());

;
//# sourceMappingURL=login.js.map

/***/ }),

<<<<<<< HEAD
<<<<<<< HEAD
/***/ 115:
=======
/***/ 103:
=======
/***/ 104:
>>>>>>> 0cbab921ca933a0c9d99c539f92fa554583e655d
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Search; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
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
<<<<<<< HEAD
            selector: 'page-search',template:/*ion-inline-start:"/home/patrick/Schreibtisch/WahlprojektSS18/src/pages/search/search.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Raumsuche</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <b>Suche nach deinem Lieblingsraum:</b>\n  <ion-searchbar (ionCancel)="onCancel($event)" placeholder="Raumsuche"></ion-searchbar>\n\n\n</ion-content>\n'/*ion-inline-end:"/home/patrick/Schreibtisch/WahlprojektSS18/src/pages/search/search.html"*/,
=======
            selector: 'page-search',template:/*ion-inline-start:"/home/felix/Schreibtisch/WahlprojektSS18/src/pages/search/search.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Raumsuche</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <b>Suche nach deinem Lieblingsraum:</b>\n  <ion-searchbar (ionCancel)="onCancel($event)" placeholder="Raumsuche"></ion-searchbar>\n\n\n</ion-content>\n'/*ion-inline-end:"/home/felix/Schreibtisch/WahlprojektSS18/src/pages/search/search.html"*/,
>>>>>>> 0cbab921ca933a0c9d99c539f92fa554583e655d
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], Search);
    return Search;
}());

//# sourceMappingURL=search.js.map

/***/ }),

<<<<<<< HEAD
/***/ 113:
>>>>>>> origin
=======
/***/ 116:
>>>>>>> 0cbab921ca933a0c9d99c539f92fa554583e655d
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
webpackEmptyAsyncContext.id = 116;

/***/ }),

/***/ 158:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/c/c.module": [
<<<<<<< HEAD
		283,
		3
	],
	"../pages/d/d.module": [
		284,
		2
	],
	"../pages/login/login.module": [
		285,
		1
	],
	"../pages/search/search.module": [
		282,
=======
		282,
		3
	],
	"../pages/d/d.module": [
		283,
		2
	],
	"../pages/login/login.module": [
		284,
		1
	],
	"../pages/search/search.module": [
		285,
>>>>>>> 0cbab921ca933a0c9d99c539f92fa554583e655d
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
webpackAsyncContext.id = 158;
module.exports = webpackAsyncContext;

/***/ }),

<<<<<<< HEAD
/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RaumModel; });
var RaumModel = /** @class */ (function () {
    function RaumModel(raumname) {
        this.wochentag = [];
        this.uhrzeit = [];
        this.veranstaltung = [];
        this.raumname = raumname;
    }
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
    RaumModel.prototype.getwochenTag = function (text) {
        var datum = text.split("T");
        datum.pop();
        datum = datum[0].split("-");
        var datum2 = new Date(datum[0], datum[1] - 1, datum[2]);
        var tag = datum2.getDay();
        var wochentag = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
        return wochentag[tag];
    };
    return RaumModel;
}());

//# sourceMappingURL=RaumModel.js.map

/***/ }),

=======
>>>>>>> 0cbab921ca933a0c9d99c539f92fa554583e655d
/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(225);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(26);
<<<<<<< HEAD
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_c_c__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_d_d__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_search_search__ = __webpack_require__(33);
=======
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_c_c__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_d_d__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_search_search__ = __webpack_require__(104);
>>>>>>> 0cbab921ca933a0c9d99c539f92fa554583e655d
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

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
<<<<<<< HEAD
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_c_c__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_d_d__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_search_search__ = __webpack_require__(33);
=======
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_c_c__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_d_d__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_search_search__ = __webpack_require__(104);
>>>>>>> 0cbab921ca933a0c9d99c539f92fa554583e655d
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
<<<<<<< HEAD
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/patrick/Schreibtisch/WahlprojektSS18/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <img class="logo" style="margin-left: 10px; float: left;" src="assets/imgs/FreiRaumLogo.png" width="40px"/>\n      <div style="padding-left: 20px; float: left; height: 40px; text-align: center; font-size: 12pt; vertical-align: middle;">\n        &nbsp;Finde deinen<br>&nbsp;freien Raum!\n      </div>\n      <ion-title>\n      </ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content padding>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/home/patrick/Schreibtisch/WahlprojektSS18/src/app/app.html"*/
=======
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/felix/Schreibtisch/WahlprojektSS18/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <img class="logo" style="margin-left: 10px; float: left;" src="assets/imgs/FreiRaumLogo.png" width="40px"/>\n      <div style="padding-left: 20px; float: left; height: 40px; text-align: center; font-size: 12pt; vertical-align: middle;">\n        &nbsp;Finde deinen<br>&nbsp;freien Raum!\n      </div>\n      <ion-title>\n      </ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content padding>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/home/felix/Schreibtisch/WahlprojektSS18/src/app/app.html"*/
>>>>>>> 0cbab921ca933a0c9d99c539f92fa554583e655d
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

<<<<<<< HEAD
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
=======
/***/ 41:
>>>>>>> 0cbab921ca933a0c9d99c539f92fa554583e655d
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__c_c__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__d_d__ = __webpack_require__(53);
<<<<<<< HEAD
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_search__ = __webpack_require__(33);
=======
>>>>>>> 0cbab921ca933a0c9d99c539f92fa554583e655d
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
<<<<<<< HEAD
<<<<<<< HEAD
            selector: 'page-home',template:/*ion-inline-start:"/home/semih/Schreibtisch/WahlprojektSS18/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title style="float: left;">Campusplan</ion-title>\n    <ion-icon (click)="search()" style="float: right; position: relative; font-size: 2em; margin-right: 5px;" name="search"></ion-icon>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	<b>Herzlich Willkommen!<br></b>Bitte wähle dein Gebäude:\n\n	<img style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_01.jpg"/><br>\n	<img style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_02.jpg"/>\n	<img style="cursor: pointer; margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_03.jpg" (click)="nextD()"/>\n	<img style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_04.jpg"/><br>\n	<img style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_05.jpg"/><br>\n	<img style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_06.jpg"/>\n	<img style="cursor: pointer; margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_07.jpg" (click)="nextC()"/>\n	<img style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_08.jpg"/><br>\n	<img style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_09.jpg"/>\n\n  <button ion-button block style="margin-bottom: 20px;" (click)="deleteDaten()">Benutzerdaten löschen</button>\n\n\n</ion-content>\n'/*ion-inline-end:"/home/semih/Schreibtisch/WahlprojektSS18/src/pages/home/home.html"*/
=======
            selector: 'page-home',template:/*ion-inline-start:"/home/patrick/Schreibtisch/WahlprojektSS18/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Campusplan</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	<b>Bitte wähle dein Gebäude!</b>\n\n	<img style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_01.jpg"/><br>\n	<img style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_02.jpg"/>\n	<img style="cursor: pointer; margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_03.jpg" (click)="nextD()"/>\n	<img style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_04.jpg"/><br>\n	<img style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_05.jpg"/><br>\n	<img style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_06.jpg"/>\n	<img style="cursor: pointer; margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_07.jpg" (click)="nextC()"/>\n	<img style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_08.jpg"/><br>\n	<img style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_09.jpg"/>\n\n\n</ion-content>\n'/*ion-inline-end:"/home/patrick/Schreibtisch/WahlprojektSS18/src/pages/home/home.html"*/
>>>>>>> origin
=======
            selector: 'page-home',template:/*ion-inline-start:"/home/felix/Schreibtisch/WahlprojektSS18/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Campusplan</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	<b>Bitte wähle dein Gebäude!</b>\n\n	<img style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_01.jpg"/><br>\n	<img style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_02.jpg"/>\n	<img style="cursor: pointer; margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_03.jpg" (click)="nextD()"/>\n	<img style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_04.jpg"/><br>\n	<img style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_05.jpg"/><br>\n	<img style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_06.jpg"/>\n	<img style="cursor: pointer; margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_07.jpg" (click)="nextC()"/>\n	<img style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_08.jpg"/><br>\n	<img style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_09.jpg"/>\n\n\n</ion-content>\n'/*ion-inline-end:"/home/felix/Schreibtisch/WahlprojektSS18/src/pages/home/home.html"*/
>>>>>>> 0cbab921ca933a0c9d99c539f92fa554583e655d
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
<<<<<<< HEAD
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search_search__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_RaumModel__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ical_js__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ical_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ical_js__);
=======
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(41);
>>>>>>> 0cbab921ca933a0c9d99c539f92fa554583e655d
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
 * Generated class for the CPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var Cgebaude = /** @class */ (function () {
    function Cgebaude(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    Cgebaude.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CPage');
        //Raum C001:
        var C001 = new __WEBPACK_IMPORTED_MODULE_4__model_RaumModel__["a" /* RaumModel */]("C001");
        var ics = C001.getICS(window.localStorage.getItem("C001"));
        ics.pop();
        var jcalData = __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.parse(ics.join("\r\n"));
        var vcalendar = new __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.Component(jcalData);
        var vevent = vcalendar.getAllSubcomponents('vevent');
        for (var i = 0; i < vevent.length; i++) {
            var description = vevent[i].getFirstPropertyValue('description');
            console.log('description: ' + description);
            C001.veranstaltung[i] = description;
            var start = vevent[i].getFirstPropertyValue('dtstart');
            console.log('Wochentag: ' + C001.getwochenTag(start.toString()));
            C001.wochentag[i] = C001.getwochenTag(start.toString());
            console.log('start Uhrzeit: ' + C001.getUhrZeit(start.toString()));
            C001.uhrzeit[i] = C001.getUhrZeit(start.toString());
            //var ende = vevent[i].getFirstPropertyValue('dtend');
            //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
        }
        console.log(C001);
        //Raum C007:
        var C007 = new __WEBPACK_IMPORTED_MODULE_4__model_RaumModel__["a" /* RaumModel */]("C007");
        var ics = C007.getICS(window.localStorage.getItem("C007"));
        ics.pop();
        var jcalData = __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.parse(ics.join("\r\n"));
        var vcalendar = new __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.Component(jcalData);
        var vevent = vcalendar.getAllSubcomponents('vevent');
        for (var i = 0; i < vevent.length; i++) {
            var description = vevent[i].getFirstPropertyValue('description');
            console.log('description: ' + description);
            C007.veranstaltung[i] = description;
            var start = vevent[i].getFirstPropertyValue('dtstart');
            console.log('Wochentag: ' + C007.getwochenTag(start.toString()));
            C007.wochentag[i] = C007.getwochenTag(start.toString());
            console.log('start Uhrzeit: ' + C007.getUhrZeit(start.toString()));
            C007.uhrzeit[i] = C007.getUhrZeit(start.toString());
            //var ende = vevent[i].getFirstPropertyValue('dtend');
            //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
        }
        console.log(C007);
        //Raum C035:
        var C035 = new __WEBPACK_IMPORTED_MODULE_4__model_RaumModel__["a" /* RaumModel */]("C035");
        var ics = C035.getICS(window.localStorage.getItem("C035"));
        ics.pop();
        var jcalData = __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.parse(ics.join("\r\n"));
        var vcalendar = new __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.Component(jcalData);
        var vevent = vcalendar.getAllSubcomponents('vevent');
        for (var i = 0; i < vevent.length; i++) {
            var description = vevent[i].getFirstPropertyValue('description');
            console.log('description: ' + description);
            C035.veranstaltung[i] = description;
            var start = vevent[i].getFirstPropertyValue('dtstart');
            console.log('Wochentag: ' + C035.getwochenTag(start.toString()));
            C035.wochentag[i] = C035.getwochenTag(start.toString());
            console.log('start Uhrzeit: ' + C035.getUhrZeit(start.toString()));
            C035.uhrzeit[i] = C035.getUhrZeit(start.toString());
            //var ende = vevent[i].getFirstPropertyValue('dtend');
            //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
        }
        console.log(C035);
        //Raum C037:
        var C037 = new __WEBPACK_IMPORTED_MODULE_4__model_RaumModel__["a" /* RaumModel */]("C037");
        var ics = C037.getICS(window.localStorage.getItem("C037"));
        ics.pop();
        var jcalData = __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.parse(ics.join("\r\n"));
        var vcalendar = new __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.Component(jcalData);
        var vevent = vcalendar.getAllSubcomponents('vevent');
        for (var i = 0; i < vevent.length; i++) {
            var description = vevent[i].getFirstPropertyValue('description');
            console.log('description: ' + description);
            C037.veranstaltung[i] = description;
            var start = vevent[i].getFirstPropertyValue('dtstart');
            console.log('Wochentag: ' + C037.getwochenTag(start.toString()));
            C037.wochentag[i] = C037.getwochenTag(start.toString());
            console.log('start Uhrzeit: ' + C037.getUhrZeit(start.toString()));
            C037.uhrzeit[i] = C037.getUhrZeit(start.toString());
            //var ende = vevent[i].getFirstPropertyValue('dtend');
            //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
        }
        console.log(C037);
        //Raum C113:
        var C113 = new __WEBPACK_IMPORTED_MODULE_4__model_RaumModel__["a" /* RaumModel */]("C113");
        var ics = C113.getICS(window.localStorage.getItem("C113"));
        ics.pop();
        var jcalData = __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.parse(ics.join("\r\n"));
        var vcalendar = new __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.Component(jcalData);
        var vevent = vcalendar.getAllSubcomponents('vevent');
        for (var i = 0; i < vevent.length; i++) {
            var description = vevent[i].getFirstPropertyValue('description');
            console.log('description: ' + description);
            C113.veranstaltung[i] = description;
            var start = vevent[i].getFirstPropertyValue('dtstart');
            console.log('Wochentag: ' + C113.getwochenTag(start.toString()));
            C113.wochentag[i] = C113.getwochenTag(start.toString());
            console.log('start Uhrzeit: ' + C113.getUhrZeit(start.toString()));
            C113.uhrzeit[i] = C113.getUhrZeit(start.toString());
            //var ende = vevent[i].getFirstPropertyValue('dtend');
            //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
        }
        console.log(C113);
        //Raum C213:
        var C213 = new __WEBPACK_IMPORTED_MODULE_4__model_RaumModel__["a" /* RaumModel */]("C213");
        var ics = C213.getICS(window.localStorage.getItem("C213"));
        ics.pop();
        var jcalData = __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.parse(ics.join("\r\n"));
        var vcalendar = new __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.Component(jcalData);
        var vevent = vcalendar.getAllSubcomponents('vevent');
        for (var i = 0; i < vevent.length; i++) {
            var description = vevent[i].getFirstPropertyValue('description');
            console.log('description: ' + description);
            C213.veranstaltung[i] = description;
            var start = vevent[i].getFirstPropertyValue('dtstart');
            console.log('Wochentag: ' + C213.getwochenTag(start.toString()));
            C213.wochentag[i] = C213.getwochenTag(start.toString());
            console.log('start Uhrzeit: ' + C213.getUhrZeit(start.toString()));
            C213.uhrzeit[i] = C213.getUhrZeit(start.toString());
            //var ende = vevent[i].getFirstPropertyValue('dtend');
            //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
        }
        console.log(C213);
        //Raum C237:
        var C237 = new __WEBPACK_IMPORTED_MODULE_4__model_RaumModel__["a" /* RaumModel */]("C237");
        var ics = C237.getICS(window.localStorage.getItem("C237"));
        ics.pop();
        var jcalData = __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.parse(ics.join("\r\n"));
        var vcalendar = new __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.Component(jcalData);
        var vevent = vcalendar.getAllSubcomponents('vevent');
        for (var i = 0; i < vevent.length; i++) {
            var description = vevent[i].getFirstPropertyValue('description');
            console.log('description: ' + description);
            C237.veranstaltung[i] = description;
            var start = vevent[i].getFirstPropertyValue('dtstart');
            console.log('Wochentag: ' + C237.getwochenTag(start.toString()));
            C237.wochentag[i] = C237.getwochenTag(start.toString());
            console.log('start Uhrzeit: ' + C237.getUhrZeit(start.toString()));
            C237.uhrzeit[i] = C237.getUhrZeit(start.toString());
            //var ende = vevent[i].getFirstPropertyValue('dtend');
            //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
        }
        console.log(C237);
        //Raum C305:
        var C305 = new __WEBPACK_IMPORTED_MODULE_4__model_RaumModel__["a" /* RaumModel */]("C305");
        var ics = C305.getICS(window.localStorage.getItem("C305"));
        ics.pop();
        var jcalData = __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.parse(ics.join("\r\n"));
        var vcalendar = new __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.Component(jcalData);
        var vevent = vcalendar.getAllSubcomponents('vevent');
        for (var i = 0; i < vevent.length; i++) {
            var description = vevent[i].getFirstPropertyValue('description');
            console.log('description: ' + description);
            C305.veranstaltung[i] = description;
            var start = vevent[i].getFirstPropertyValue('dtstart');
            console.log('Wochentag: ' + C305.getwochenTag(start.toString()));
            C305.wochentag[i] = C305.getwochenTag(start.toString());
            console.log('start Uhrzeit: ' + C305.getUhrZeit(start.toString()));
            C305.uhrzeit[i] = C305.getUhrZeit(start.toString());
            //var ende = vevent[i].getFirstPropertyValue('dtend');
            //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
        }
        console.log(C305);
        //Raum C313:
        var C313 = new __WEBPACK_IMPORTED_MODULE_4__model_RaumModel__["a" /* RaumModel */]("C313");
        var ics = C313.getICS(window.localStorage.getItem("C313"));
        ics.pop();
        var jcalData = __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.parse(ics.join("\r\n"));
        var vcalendar = new __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.Component(jcalData);
        var vevent = vcalendar.getAllSubcomponents('vevent');
        for (var i = 0; i < vevent.length; i++) {
            var description = vevent[i].getFirstPropertyValue('description');
            console.log('description: ' + description);
            C313.veranstaltung[i] = description;
            var start = vevent[i].getFirstPropertyValue('dtstart');
            console.log('Wochentag: ' + C313.getwochenTag(start.toString()));
            C313.wochentag[i] = C313.getwochenTag(start.toString());
            console.log('start Uhrzeit: ' + C313.getUhrZeit(start.toString()));
            C313.uhrzeit[i] = C313.getUhrZeit(start.toString());
            //var ende = vevent[i].getFirstPropertyValue('dtend');
            //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
        }
        console.log(C313);
        //Raum C361:
        var C361 = new __WEBPACK_IMPORTED_MODULE_4__model_RaumModel__["a" /* RaumModel */]("C361");
        var ics = C361.getICS(window.localStorage.getItem("C361"));
        ics.pop();
        var jcalData = __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.parse(ics.join("\r\n"));
        var vcalendar = new __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.Component(jcalData);
        var vevent = vcalendar.getAllSubcomponents('vevent');
        for (var i = 0; i < vevent.length; i++) {
            var description = vevent[i].getFirstPropertyValue('description');
            console.log('description: ' + description);
            C361.veranstaltung[i] = description;
            var start = vevent[i].getFirstPropertyValue('dtstart');
            console.log('Wochentag: ' + C361.getwochenTag(start.toString()));
            C361.wochentag[i] = C361.getwochenTag(start.toString());
            console.log('start Uhrzeit: ' + C361.getUhrZeit(start.toString()));
            C361.uhrzeit[i] = C361.getUhrZeit(start.toString());
            //var ende = vevent[i].getFirstPropertyValue('dtend');
            //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
        }
        console.log(C361);
        //Raum C375:
        var C375 = new __WEBPACK_IMPORTED_MODULE_4__model_RaumModel__["a" /* RaumModel */]("C375");
        var ics = C375.getICS(window.localStorage.getItem("C375"));
        ics.pop();
        var jcalData = __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.parse(ics.join("\r\n"));
        var vcalendar = new __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.Component(jcalData);
        var vevent = vcalendar.getAllSubcomponents('vevent');
        for (var i = 0; i < vevent.length; i++) {
            var description = vevent[i].getFirstPropertyValue('description');
            console.log('description: ' + description);
            C375.veranstaltung[i] = description;
            var start = vevent[i].getFirstPropertyValue('dtstart');
            console.log('Wochentag: ' + C375.getwochenTag(start.toString()));
            C375.wochentag[i] = C375.getwochenTag(start.toString());
            console.log('start Uhrzeit: ' + C375.getUhrZeit(start.toString()));
            C375.uhrzeit[i] = C375.getUhrZeit(start.toString());
            //var ende = vevent[i].getFirstPropertyValue('dtend');
            //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
        }
        console.log(C375);
        //Raum C377:
        var C377 = new __WEBPACK_IMPORTED_MODULE_4__model_RaumModel__["a" /* RaumModel */]("C377");
        var ics = C377.getICS(window.localStorage.getItem("C377"));
        ics.pop();
        var jcalData = __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.parse(ics.join("\r\n"));
        var vcalendar = new __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.Component(jcalData);
        var vevent = vcalendar.getAllSubcomponents('vevent');
        for (var i = 0; i < vevent.length; i++) {
            var description = vevent[i].getFirstPropertyValue('description');
            console.log('description: ' + description);
            C377.veranstaltung[i] = description;
            var start = vevent[i].getFirstPropertyValue('dtstart');
            console.log('Wochentag: ' + C377.getwochenTag(start.toString()));
            C377.wochentag[i] = C377.getwochenTag(start.toString());
            console.log('start Uhrzeit: ' + C377.getUhrZeit(start.toString()));
            C377.uhrzeit[i] = C377.getUhrZeit(start.toString());
            //var ende = vevent[i].getFirstPropertyValue('dtend');
            //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
        }
        console.log(C377);
        //Raum C405:
        var C405 = new __WEBPACK_IMPORTED_MODULE_4__model_RaumModel__["a" /* RaumModel */]("C405");
        var ics = C405.getICS(window.localStorage.getItem("C405"));
        ics.pop();
        var jcalData = __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.parse(ics.join("\r\n"));
        var vcalendar = new __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.Component(jcalData);
        var vevent = vcalendar.getAllSubcomponents('vevent');
        for (var i = 0; i < vevent.length; i++) {
            var description = vevent[i].getFirstPropertyValue('description');
            console.log('description: ' + description);
            C405.veranstaltung[i] = description;
            var start = vevent[i].getFirstPropertyValue('dtstart');
            console.log('Wochentag: ' + C405.getwochenTag(start.toString()));
            C405.wochentag[i] = C405.getwochenTag(start.toString());
            console.log('start Uhrzeit: ' + C405.getUhrZeit(start.toString()));
            C405.uhrzeit[i] = C405.getUhrZeit(start.toString());
            //var ende = vevent[i].getFirstPropertyValue('dtend');
            //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
        }
        console.log(C405);
        //Raum C407:
        var C407 = new __WEBPACK_IMPORTED_MODULE_4__model_RaumModel__["a" /* RaumModel */]("C407");
        var ics = C407.getICS(window.localStorage.getItem("C407"));
        ics.pop();
        var jcalData = __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.parse(ics.join("\r\n"));
        var vcalendar = new __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.Component(jcalData);
        var vevent = vcalendar.getAllSubcomponents('vevent');
        for (var i = 0; i < vevent.length; i++) {
            var description = vevent[i].getFirstPropertyValue('description');
            console.log('description: ' + description);
            C407.veranstaltung[i] = description;
            var start = vevent[i].getFirstPropertyValue('dtstart');
            console.log('Wochentag: ' + C407.getwochenTag(start.toString()));
            C407.wochentag[i] = C407.getwochenTag(start.toString());
            console.log('start Uhrzeit: ' + C407.getUhrZeit(start.toString()));
            C407.uhrzeit[i] = C407.getUhrZeit(start.toString());
            //var ende = vevent[i].getFirstPropertyValue('dtend');
            //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
        }
        console.log(C407);
        //Raum C413:
        var C413 = new __WEBPACK_IMPORTED_MODULE_4__model_RaumModel__["a" /* RaumModel */]("C413");
        var ics = C413.getICS(window.localStorage.getItem("C413"));
        ics.pop();
        var jcalData = __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.parse(ics.join("\r\n"));
        var vcalendar = new __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.Component(jcalData);
        var vevent = vcalendar.getAllSubcomponents('vevent');
        for (var i = 0; i < vevent.length; i++) {
            var description = vevent[i].getFirstPropertyValue('description');
            console.log('description: ' + description);
            C413.veranstaltung[i] = description;
            var start = vevent[i].getFirstPropertyValue('dtstart');
            console.log('Wochentag: ' + C413.getwochenTag(start.toString()));
            C413.wochentag[i] = C413.getwochenTag(start.toString());
            console.log('start Uhrzeit: ' + C413.getUhrZeit(start.toString()));
            C413.uhrzeit[i] = C413.getUhrZeit(start.toString());
            //var ende = vevent[i].getFirstPropertyValue('dtend');
            //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
        }
        console.log(C413);
    };
    Cgebaude.prototype.BackToCampus = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    Cgebaude.prototype.search = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__search_search__["a" /* Search */]);
    };
    Cgebaude = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
<<<<<<< HEAD
<<<<<<< HEAD
            selector: 'page-c',template:/*ion-inline-start:"/home/semih/Schreibtisch/WahlprojektSS18/src/pages/c/c.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title style="float: left;">C-Gebäude</ion-title>\n    <ion-icon (click)="search()" style="float: right; position: relative; font-size: 2em; margin-right: 5px;" name="search"></ion-icon>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n	<b>Folgende Räume sind zur Zeit im C-Gebäude frei:</b><br><br>\n  <ion-list>\n    <h3>08:15 - 09:45</h3>\n    <ion-item>\n      C001\n    </ion-item>\n    <ion-item>\n      C035\n    </ion-item>\n    <ion-item>\n      C037\n    </ion-item>\n    <ion-item>\n      C007\n    </ion-item>\n    <ion-item>\n      C313\n    </ion-item>\n    <ion-item>\n      C377\n    </ion-item><br>\n    <h3>10:00 - 11:30</h3>\n    <ion-item>\n      C035\n    </ion-item>\n    <ion-item>\n      C037\n    </ion-item>\n    <ion-item>\n      C213\n    </ion-item>\n    <ion-item>\n      C313\n    </ion-item>\n    <ion-item>\n      C377\n    </ion-item>\n    <ion-item>\n      C405\n    </ion-item>\n  </ion-list><br><br>\n\n  <button ion-button block style="margin-bottom: 20px;" (click)="BackToCampus()">Zum Campusplan</button>\n\n\n</ion-content>\n'/*ion-inline-end:"/home/semih/Schreibtisch/WahlprojektSS18/src/pages/c/c.html"*/,
=======
            selector: 'page-c',template:/*ion-inline-start:"/home/patrick/Schreibtisch/WahlprojektSS18/src/pages/c/c.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>C-Gebäude</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n	<b>Folgende Räume sind zur Zeit im C-Gebäude frei:</b><br><br>\n  <ion-list>\n    <h3>08:15 - 09:45</h3>\n    <ion-item>\n      C001\n    </ion-item>\n    <ion-item>\n      C035\n    </ion-item>\n    <ion-item>\n      C037\n    </ion-item>\n    <ion-item>\n      C007\n    </ion-item>\n    <ion-item>\n      C313\n    </ion-item>\n    <ion-item>\n      C377\n    </ion-item><br>\n    <h3>10:00 - 11:30</h3>\n    <ion-item>\n      C035\n    </ion-item>\n    <ion-item>\n      C037\n    </ion-item>\n    <ion-item>\n      C213\n    </ion-item>\n    <ion-item>\n      C313\n    </ion-item>\n    <ion-item>\n      C377\n    </ion-item>\n    <ion-item>\n      C405\n    </ion-item>\n  </ion-list><br><br>\n\n  <button ion-button block style="margin-bottom: 20px;" (click)="BackToCampus()">Zum Campusplan</button>\n\n\n</ion-content>\n'/*ion-inline-end:"/home/patrick/Schreibtisch/WahlprojektSS18/src/pages/c/c.html"*/,
>>>>>>> origin
=======
            selector: 'page-c',template:/*ion-inline-start:"/home/felix/Schreibtisch/WahlprojektSS18/src/pages/c/c.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>C-Gebäude</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n	<b>Folgende Räume sind zur Zeit im C-Gebäude frei:</b><br><br>\n  <ion-list>\n    <h3>08:15 - 09:45</h3>\n    <ion-item>\n      C001\n    </ion-item>\n    <ion-item>\n      C035\n    </ion-item>\n    <ion-item>\n      C037\n    </ion-item>\n    <ion-item>\n      C007\n    </ion-item>\n    <ion-item>\n      C313\n    </ion-item>\n    <ion-item>\n      C377\n    </ion-item><br>\n    <h3>10:00 - 11:30</h3>\n    <ion-item>\n      C035\n    </ion-item>\n    <ion-item>\n      C037\n    </ion-item>\n    <ion-item>\n      C213\n    </ion-item>\n    <ion-item>\n      C313\n    </ion-item>\n    <ion-item>\n      C377\n    </ion-item>\n    <ion-item>\n      C405\n    </ion-item>\n  </ion-list><br><br>\n\n  <button ion-button block style="margin-bottom: 20px;" (click)="BackToCampus()">Zum Campusplan</button>\n\n\n</ion-content>\n'/*ion-inline-end:"/home/felix/Schreibtisch/WahlprojektSS18/src/pages/c/c.html"*/,
>>>>>>> 0cbab921ca933a0c9d99c539f92fa554583e655d
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
<<<<<<< HEAD
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search_search__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_RaumModel__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ical_js__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ical_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ical_js__);
=======
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(41);
>>>>>>> 0cbab921ca933a0c9d99c539f92fa554583e655d
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
 * Generated class for the DPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var Dgebaude = /** @class */ (function () {
    function Dgebaude(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    Dgebaude.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DPage');
        //Raum D01:
        var D01 = new __WEBPACK_IMPORTED_MODULE_4__model_RaumModel__["a" /* RaumModel */]("D01");
        var ics = D01.getICS(window.localStorage.getItem("D01"));
        ics.pop();
        var jcalData = __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.parse(ics.join("\r\n"));
        var vcalendar = new __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.Component(jcalData);
        var vevent = vcalendar.getAllSubcomponents('vevent');
        for (var i = 0; i < vevent.length; i++) {
            var description = vevent[i].getFirstPropertyValue('description');
            console.log('description: ' + description);
            D01.veranstaltung[i] = description;
            var start = vevent[i].getFirstPropertyValue('dtstart');
            console.log('Wochentag: ' + D01.getwochenTag(start.toString()));
            D01.wochentag[i] = D01.getwochenTag(start.toString());
            console.log('start Uhrzeit: ' + D01.getUhrZeit(start.toString()));
            D01.uhrzeit[i] = D01.getUhrZeit(start.toString());
            //var ende = vevent[i].getFirstPropertyValue('dtend');
            //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
        }
        console.log(D01);
        //Raum D02:
        var D02 = new __WEBPACK_IMPORTED_MODULE_4__model_RaumModel__["a" /* RaumModel */]("D02");
        var ics = D02.getICS(window.localStorage.getItem("D02"));
        ics.pop();
        var jcalData = __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.parse(ics.join("\r\n"));
        var vcalendar = new __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.Component(jcalData);
        var vevent = vcalendar.getAllSubcomponents('vevent');
        for (var i = 0; i < vevent.length; i++) {
            var description = vevent[i].getFirstPropertyValue('description');
            console.log('description: ' + description);
            D02.veranstaltung[i] = description;
            var start = vevent[i].getFirstPropertyValue('dtstart');
            console.log('Wochentag: ' + D02.getwochenTag(start.toString()));
            D02.wochentag[i] = D02.getwochenTag(start.toString());
            console.log('start Uhrzeit: ' + D02.getUhrZeit(start.toString()));
            D02.uhrzeit[i] = D02.getUhrZeit(start.toString());
            //var ende = vevent[i].getFirstPropertyValue('dtend');
            //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
        }
        console.log(D02);
        //Raum D11:
        var D11 = new __WEBPACK_IMPORTED_MODULE_4__model_RaumModel__["a" /* RaumModel */]("D11");
        var ics = D11.getICS(window.localStorage.getItem("D11"));
        ics.pop();
        var jcalData = __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.parse(ics.join("\r\n"));
        var vcalendar = new __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.Component(jcalData);
        var vevent = vcalendar.getAllSubcomponents('vevent');
        for (var i = 0; i < vevent.length; i++) {
            var description = vevent[i].getFirstPropertyValue('description');
            console.log('description: ' + description);
            D11.veranstaltung[i] = description;
            var start = vevent[i].getFirstPropertyValue('dtstart');
            console.log('Wochentag: ' + D11.getwochenTag(start.toString()));
            D11.wochentag[i] = D11.getwochenTag(start.toString());
            console.log('start Uhrzeit: ' + D11.getUhrZeit(start.toString()));
            D11.uhrzeit[i] = D11.getUhrZeit(start.toString());
            //var ende = vevent[i].getFirstPropertyValue('dtend');
            //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
        }
        console.log(D11);
        //Raum D12:
        var D12 = new __WEBPACK_IMPORTED_MODULE_4__model_RaumModel__["a" /* RaumModel */]("D12");
        var ics = D12.getICS(window.localStorage.getItem("D12"));
        ics.pop();
        var jcalData = __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.parse(ics.join("\r\n"));
        var vcalendar = new __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.Component(jcalData);
        var vevent = vcalendar.getAllSubcomponents('vevent');
        for (var i = 0; i < vevent.length; i++) {
            var description = vevent[i].getFirstPropertyValue('description');
            console.log('description: ' + description);
            D12.veranstaltung[i] = description;
            var start = vevent[i].getFirstPropertyValue('dtstart');
            console.log('Wochentag: ' + D12.getwochenTag(start.toString()));
            D12.wochentag[i] = D12.getwochenTag(start.toString());
            console.log('start Uhrzeit: ' + D12.getUhrZeit(start.toString()));
            D12.uhrzeit[i] = D12.getUhrZeit(start.toString());
            //var ende = vevent[i].getFirstPropertyValue('dtend');
            //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
        }
        console.log(D12);
        //Raum D01:
        var D13 = new __WEBPACK_IMPORTED_MODULE_4__model_RaumModel__["a" /* RaumModel */]("D13");
        var ics = D13.getICS(window.localStorage.getItem("D13"));
        ics.pop();
        var jcalData = __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.parse(ics.join("\r\n"));
        var vcalendar = new __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.Component(jcalData);
        var vevent = vcalendar.getAllSubcomponents('vevent');
        for (var i = 0; i < vevent.length; i++) {
            var description = vevent[i].getFirstPropertyValue('description');
            console.log('description: ' + description);
            D13.veranstaltung[i] = description;
            var start = vevent[i].getFirstPropertyValue('dtstart');
            console.log('Wochentag: ' + D13.getwochenTag(start.toString()));
            D13.wochentag[i] = D13.getwochenTag(start.toString());
            console.log('start Uhrzeit: ' + D13.getUhrZeit(start.toString()));
            D13.uhrzeit[i] = D13.getUhrZeit(start.toString());
            //var ende = vevent[i].getFirstPropertyValue('dtend');
            //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
        }
        console.log(D13);
        //Raum D14:
        var D14 = new __WEBPACK_IMPORTED_MODULE_4__model_RaumModel__["a" /* RaumModel */]("D14");
        var ics = D14.getICS(window.localStorage.getItem("D14"));
        ics.pop();
        var jcalData = __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.parse(ics.join("\r\n"));
        var vcalendar = new __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.Component(jcalData);
        var vevent = vcalendar.getAllSubcomponents('vevent');
        for (var i = 0; i < vevent.length; i++) {
            var description = vevent[i].getFirstPropertyValue('description');
            console.log('description: ' + description);
            D14.veranstaltung[i] = description;
            var start = vevent[i].getFirstPropertyValue('dtstart');
            console.log('Wochentag: ' + D14.getwochenTag(start.toString()));
            D14.wochentag[i] = D14.getwochenTag(start.toString());
            console.log('start Uhrzeit: ' + D14.getUhrZeit(start.toString()));
            D14.uhrzeit[i] = D14.getUhrZeit(start.toString());
            //var ende = vevent[i].getFirstPropertyValue('dtend');
            //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
        }
        console.log(D14);
        //Raum D15:
        var D15 = new __WEBPACK_IMPORTED_MODULE_4__model_RaumModel__["a" /* RaumModel */]("D15");
        var ics = D15.getICS(window.localStorage.getItem("D15"));
        ics.pop();
        var jcalData = __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.parse(ics.join("\r\n"));
        var vcalendar = new __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.Component(jcalData);
        var vevent = vcalendar.getAllSubcomponents('vevent');
        for (var i = 0; i < vevent.length; i++) {
            var description = vevent[i].getFirstPropertyValue('description');
            console.log('description: ' + description);
            D15.veranstaltung[i] = description;
            var start = vevent[i].getFirstPropertyValue('dtstart');
            console.log('Wochentag: ' + D15.getwochenTag(start.toString()));
            D15.wochentag[i] = D15.getwochenTag(start.toString());
            console.log('start Uhrzeit: ' + D15.getUhrZeit(start.toString()));
            D15.uhrzeit[i] = D15.getUhrZeit(start.toString());
            //var ende = vevent[i].getFirstPropertyValue('dtend');
            //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
        }
        console.log(D15);
        //Raum D17:
        var D17 = new __WEBPACK_IMPORTED_MODULE_4__model_RaumModel__["a" /* RaumModel */]("D17");
        var ics = D17.getICS(window.localStorage.getItem("D17"));
        ics.pop();
        var jcalData = __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.parse(ics.join("\r\n"));
        var vcalendar = new __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.Component(jcalData);
        var vevent = vcalendar.getAllSubcomponents('vevent');
        for (var i = 0; i < vevent.length; i++) {
            var description = vevent[i].getFirstPropertyValue('description');
            console.log('description: ' + description);
            D17.veranstaltung[i] = description;
            var start = vevent[i].getFirstPropertyValue('dtstart');
            console.log('Wochentag: ' + D17.getwochenTag(start.toString()));
            D17.wochentag[i] = D17.getwochenTag(start.toString());
            console.log('start Uhrzeit: ' + D17.getUhrZeit(start.toString()));
            D17.uhrzeit[i] = D17.getUhrZeit(start.toString());
            //var ende = vevent[i].getFirstPropertyValue('dtend');
            //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
        }
        console.log(D17);
        //Raum D18:
        var D18 = new __WEBPACK_IMPORTED_MODULE_4__model_RaumModel__["a" /* RaumModel */]("D18");
        var ics = D18.getICS(window.localStorage.getItem("D18"));
        ics.pop();
        var jcalData = __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.parse(ics.join("\r\n"));
        var vcalendar = new __WEBPACK_IMPORTED_MODULE_5_ical_js___default.a.Component(jcalData);
        var vevent = vcalendar.getAllSubcomponents('vevent');
        for (var i = 0; i < vevent.length; i++) {
            var description = vevent[i].getFirstPropertyValue('description');
            console.log('description: ' + description);
            D18.veranstaltung[i] = description;
            var start = vevent[i].getFirstPropertyValue('dtstart');
            console.log('Wochentag: ' + D18.getwochenTag(start.toString()));
            D18.wochentag[i] = D18.getwochenTag(start.toString());
            console.log('start Uhrzeit: ' + D18.getUhrZeit(start.toString()));
            D18.uhrzeit[i] = D18.getUhrZeit(start.toString());
            //var ende = vevent[i].getFirstPropertyValue('dtend');
            //console.log('ende Uhrzeit: '+ uhrZeit(ende.toString()));
        }
        console.log(D18);
    };
    Dgebaude.prototype.BackToCampus = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    Dgebaude.prototype.search = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__search_search__["a" /* Search */]);
    };
    Dgebaude = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
<<<<<<< HEAD
<<<<<<< HEAD
            selector: 'page-d',template:/*ion-inline-start:"/home/semih/Schreibtisch/WahlprojektSS18/src/pages/d/d.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title style="float: left;">D-Gebäude</ion-title>\n    <ion-icon (click)="search()" style="float: right; position: relative; font-size: 2em; margin-right: 5px;" name="search"></ion-icon>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n	<b>Folgende Räume sind zur Zeit im D-Gebäude frei:</b><br><br>\n  <ion-list>\n    <h3>08:15 - 09:45</h3>\n    <ion-item>\n      D01\n    </ion-item>\n    <ion-item>\n      D11\n    </ion-item>\n    <ion-item>\n      D12\n    </ion-item>\n    <ion-item>\n      D13\n    </ion-item>\n    <ion-item>\n      D15\n    </ion-item>\n    <ion-item>\n      D17\n    </ion-item><br>\n    <h3>10:00 - 11:30</h3>\n    <ion-item>\n      D02\n    </ion-item>\n    <ion-item>\n      D12\n    </ion-item>\n    <ion-item>\n      D13\n    </ion-item>\n    <ion-item>\n      D14\n    </ion-item>\n    <ion-item>\n      D15\n    </ion-item>\n    <ion-item>\n      D17\n    </ion-item>\n  </ion-list><br><br>\n\n  <button ion-button block style="margin-bottom: 20px;" (click)="BackToCampus()">Zum Campusplan</button>\n\n</ion-content>\n'/*ion-inline-end:"/home/semih/Schreibtisch/WahlprojektSS18/src/pages/d/d.html"*/,
=======
            selector: 'page-d',template:/*ion-inline-start:"/home/patrick/Schreibtisch/WahlprojektSS18/src/pages/d/d.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>D-Gebäude</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n	<b>Folgende Räume sind zur Zeit im D-Gebäude frei:</b><br><br>\n  <ion-list>\n    <h3>08:15 - 09:45</h3>\n    <ion-item>\n      D01\n    </ion-item>\n    <ion-item>\n      D11\n    </ion-item>\n    <ion-item>\n      D12\n    </ion-item>\n    <ion-item>\n      D13\n    </ion-item>\n    <ion-item>\n      D15\n    </ion-item>\n    <ion-item>\n      D17\n    </ion-item><br>\n    <h3>10:00 - 11:30</h3>\n    <ion-item>\n      D02\n    </ion-item>\n    <ion-item>\n      D12\n    </ion-item>\n    <ion-item>\n      D13\n    </ion-item>\n    <ion-item>\n      D14\n    </ion-item>\n    <ion-item>\n      D15\n    </ion-item>\n    <ion-item>\n      D17\n    </ion-item>\n  </ion-list><br><br>\n\n  <button ion-button block style="margin-bottom: 20px;" (click)="BackToCampus()">Zum Campusplan</button>\n\n</ion-content>\n'/*ion-inline-end:"/home/patrick/Schreibtisch/WahlprojektSS18/src/pages/d/d.html"*/,
>>>>>>> origin
=======
            selector: 'page-d',template:/*ion-inline-start:"/home/felix/Schreibtisch/WahlprojektSS18/src/pages/d/d.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>D-Gebäude</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n	<b>Folgende Räume sind zur Zeit im D-Gebäude frei:</b><br><br>\n  <ion-list>\n    <h3>08:15 - 09:45</h3>\n    <ion-item>\n      D01\n    </ion-item>\n    <ion-item>\n      D11\n    </ion-item>\n    <ion-item>\n      D12\n    </ion-item>\n    <ion-item>\n      D13\n    </ion-item>\n    <ion-item>\n      D15\n    </ion-item>\n    <ion-item>\n      D17\n    </ion-item><br>\n    <h3>10:00 - 11:30</h3>\n    <ion-item>\n      D02\n    </ion-item>\n    <ion-item>\n      D12\n    </ion-item>\n    <ion-item>\n      D13\n    </ion-item>\n    <ion-item>\n      D14\n    </ion-item>\n    <ion-item>\n      D15\n    </ion-item>\n    <ion-item>\n      D17\n    </ion-item>\n  </ion-list><br><br>\n\n  <button ion-button block style="margin-bottom: 20px;" (click)="BackToCampus()">Zum Campusplan</button>\n\n</ion-content>\n'/*ion-inline-end:"/home/felix/Schreibtisch/WahlprojektSS18/src/pages/d/d.html"*/,
>>>>>>> 0cbab921ca933a0c9d99c539f92fa554583e655d
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], Dgebaude);
    return Dgebaude;
}());

//# sourceMappingURL=d.js.map

/***/ })

},[204]);
//# sourceMappingURL=main.js.map