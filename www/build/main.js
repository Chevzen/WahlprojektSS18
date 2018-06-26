webpackJsonp([4],{

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(160);
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
    return text.substring(text.indexOf("csrf-token") + 23, text.indexOf("csrf-token") + 111);
}
function get_Semester(text) {
    return text.substring(text.indexOf("option selected") + 37, text.indexOf("option selected") + 46);
}
function get_Header(text) {
    return text.indexOf("Ihre Anmeldung war leider nicht erfolgreich, bitte überprüfen Sie ihre Login-Daten");
}
function get_Plan(text) {
    if (-1 == text.indexOf("DOCTYPE")) {
        return text.substring(text.indexOf("_body") + 9, text.indexOf("status") - 6);
    }
    var fehlerFeld = document.getElementById('Fehler');
    fehlerFeld.innerText = "Fehler beim Herunterladen der Daten. Bitte versuche es erneut";
    fehlerFeld.style.display = "block";
    var fehlerFeldZwei = document.getElementById('Fehler2');
    fehlerFeldZwei.innerText = "Fehler beim Herunterladen der Daten. Bitte App neu starten";
    fehlerFeldZwei.style.display = "block";
    var ladeicon = document.getElementById('laden');
    ladeicon.style.display = "none";
    return -1;
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
    //for(var i:number = 0; i < 40; i++){
    element.http.get('https://aor.cs.hs-rm.de/login', options).subscribe(function (result) {
        console.log('login API success');
        element.x = JSON.stringify(result, null, 2);
        //console.log('X: '+ element.x);
        element.token = get_Token(element.x);
        element.semester = get_Semester(element.x);
        //console.log('Semester: '+ element.semester);
        //console.log('Token: '+ element.token);
        element.token = encodeURIComponent(element.token);
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
                    console.log("first " + element.x);
                    element.x = get_Plan(element.x);
                    if (-1 == element.x) {
                        return;
                    }
                    console.log("second  " + element.x);
                    console.log(result);
                    localStorage.setItem("D01", element.x);
                    console.log("D01: " + localStorage.getItem("D01"));
                }, function (error) {
                    console.log("Error: " + JSON.stringify(error, null, 2));
                });
                //Raum D02:
                element.http.get('https://aor.cs.hs-rm.de/rooms/1001264431/plans.ics', options).subscribe(function (result) {
                    console.log('login API success');
                    element.x = JSON.stringify(result, null, 2);
                    element.x = get_Plan(element.x);
                    if (-1 == element.x) {
                        return;
                    }
                    localStorage.setItem("D02", element.x);
                    console.log("D02: " + localStorage.getItem("D02"));
                }, function (error) {
                    console.log("Error: " + JSON.stringify(error, null, 2));
                });
                //Raum D11:
                element.http.get('https://aor.cs.hs-rm.de/rooms/454131924/plans.ics', options).subscribe(function (result) {
                    //console.log('login API success');
                    element.x = JSON.stringify(result, null, 2);
                    element.x = get_Plan(element.x);
                    if (-1 == element.x) {
                        return;
                    }
                    localStorage.setItem("D11", element.x);
                    //console.log("D11: "+localStorage.getItem("D11"));
                }, function (error) {
                    console.log("Error: " + JSON.stringify(error, null, 2));
                });
                //Raum D12:
                element.http.get('https://aor.cs.hs-rm.de/rooms/454131925/plans.ics', options).subscribe(function (result) {
                    //console.log('login API success');
                    element.x = JSON.stringify(result, null, 2);
                    element.x = get_Plan(element.x);
                    if (-1 == element.x) {
                        return;
                    }
                    localStorage.setItem("D12", element.x);
                    //console.log("D12: "+localStorage.getItem("D12"));
                }, function (error) {
                    console.log("Error: " + JSON.stringify(error, null, 2));
                });
                //Raum D13:
                element.http.get('https://aor.cs.hs-rm.de/rooms/454131926/plans.ics', options).subscribe(function (result) {
                    //console.log('login API success');
                    element.x = JSON.stringify(result, null, 2);
                    element.x = get_Plan(element.x);
                    if (-1 == element.x) {
                        return;
                    }
                    localStorage.setItem("D13", element.x);
                    //console.log("D13: "+localStorage.getItem("D13"));
                }, function (error) {
                    console.log("Error: " + JSON.stringify(error, null, 2));
                });
                //Raum D14:
                element.http.get('https://aor.cs.hs-rm.de/rooms/454131927/plans.ics', options).subscribe(function (result) {
                    //console.log('login API success');
                    element.x = JSON.stringify(result, null, 2);
                    element.x = get_Plan(element.x);
                    if (-1 == element.x) {
                        return;
                    }
                    localStorage.setItem("D14", element.x);
                    //console.log("D14: "+localStorage.getItem("D14"));
                }, function (error) {
                    console.log("Error: " + JSON.stringify(error, null, 2));
                });
                //Raum D15:
                element.http.get('https://aor.cs.hs-rm.de/rooms/454131928/plans.ics', options).subscribe(function (result) {
                    //console.log('login API success');
                    element.x = JSON.stringify(result, null, 2);
                    element.x = get_Plan(element.x);
                    if (-1 == element.x) {
                        return;
                    }
                    localStorage.setItem("D15", element.x);
                    //console.log("D15: "+localStorage.getItem("D15"));
                }, function (error) {
                    console.log("Error: " + JSON.stringify(error, null, 2));
                });
                //Raum D17:
                element.http.get('https://aor.cs.hs-rm.de/rooms/454131930/plans.ics', options).subscribe(function (result) {
                    //console.log('login API success');
                    element.x = JSON.stringify(result, null, 2);
                    element.x = get_Plan(element.x);
                    if (-1 == element.x) {
                        return;
                    }
                    localStorage.setItem("D17", element.x);
                    //console.log("D17: "+localStorage.getItem("D17"));
                }, function (error) {
                    console.log("Error: " + JSON.stringify(error, null, 2));
                });
                //Raum D18:
                element.http.get('https://aor.cs.hs-rm.de/rooms/454131931/plans.ics', options).subscribe(function (result) {
                    //console.log('login API success');
                    element.x = JSON.stringify(result, null, 2);
                    element.x = get_Plan(element.x);
                    if (-1 == element.x) {
                        return;
                    }
                    localStorage.setItem("D18", element.x);
                    //console.log("D18: "+localStorage.getItem("D18"));
                }, function (error) {
                    console.log("Error: " + JSON.stringify(error, null, 2));
                });
                //Raum C001:
                element.http.get('https://aor.cs.hs-rm.de/rooms/967118069/plans.ics', options).subscribe(function (result) {
                    //console.log('login API success');
                    element.x = JSON.stringify(result, null, 2);
                    element.x = get_Plan(element.x);
                    if (-1 == element.x) {
                        return;
                    }
                    localStorage.setItem("C001", element.x);
                    //console.log("C001: "+localStorage.getItem("C001"));
                }, function (error) {
                    console.log("Error: " + JSON.stringify(error, null, 2));
                });
                //Raum C007:
                element.http.get('https://aor.cs.hs-rm.de/rooms/967118075/plans.ics', options).subscribe(function (result) {
                    //console.log('login API success');
                    element.x = JSON.stringify(result, null, 2);
                    element.x = get_Plan(element.x);
                    if (-1 == element.x) {
                        return;
                    }
                    localStorage.setItem("C007", element.x);
                    //console.log("C007: "+localStorage.getItem("C007"));
                }, function (error) {
                    console.log("Error: " + JSON.stringify(error, null, 2));
                });
                //Raum C035:
                element.http.get('https://aor.cs.hs-rm.de/rooms/967321020/plans.ics', options).subscribe(function (result) {
                    //console.log('login API success');
                    element.x = JSON.stringify(result, null, 2);
                    element.x = get_Plan(element.x);
                    if (-1 == element.x) {
                        return;
                    }
                    localStorage.setItem("C035", element.x);
                    //console.log("C035: "+localStorage.getItem("C035"));
                }, function (error) {
                    console.log("Error: " + JSON.stringify(error, null, 2));
                });
                //Raum C037:
                element.http.get('https://aor.cs.hs-rm.de/rooms/967321022/plans.ics', options).subscribe(function (result) {
                    //console.log('login API success');
                    element.x = JSON.stringify(result, null, 2);
                    element.x = get_Plan(element.x);
                    if (-1 == element.x) {
                        return;
                    }
                    localStorage.setItem("C037", element.x);
                    //console.log("C037: "+localStorage.getItem("C037"));
                }, function (error) {
                    console.log("Error: " + JSON.stringify(error, null, 2));
                });
                //Raum C113:
                element.http.get('https://aor.cs.hs-rm.de/rooms/975705394/plans.ics', options).subscribe(function (result) {
                    //console.log('login API success');
                    element.x = JSON.stringify(result, null, 2);
                    element.x = get_Plan(element.x);
                    if (-1 == element.x) {
                        return;
                    }
                    localStorage.setItem("C113", element.x);
                    //console.log("C113: "+localStorage.getItem("C113"));
                }, function (error) {
                    console.log("Error: " + JSON.stringify(error, null, 2));
                });
                //Raum C213:
                element.http.get('https://aor.cs.hs-rm.de/rooms/984225074/plans.ics', options).subscribe(function (result) {
                    //console.log('login API success');
                    element.x = JSON.stringify(result, null, 2);
                    element.x = get_Plan(element.x);
                    if (-1 == element.x) {
                        return;
                    }
                    localStorage.setItem("C213", element.x);
                    //console.log("C213: "+localStorage.getItem("C213"));
                }, function (error) {
                    console.log("Error: " + JSON.stringify(error, null, 2));
                });
                //Raum C237:
                element.http.get('https://aor.cs.hs-rm.de/rooms/984360376/plans.ics', options).subscribe(function (result) {
                    //console.log('login API success');
                    element.x = JSON.stringify(result, null, 2);
                    element.x = get_Plan(element.x);
                    if (-1 == element.x) {
                        return;
                    }
                    localStorage.setItem("C237", element.x);
                    //console.log("C237: "+localStorage.getItem("C237"));
                }, function (error) {
                    console.log("Error: " + JSON.stringify(error, null, 2));
                });
                //Raum C305:
                element.http.get('https://aor.cs.hs-rm.de/rooms/992677104/plans.ics', options).subscribe(function (result) {
                    //console.log('login API success');
                    element.x = JSON.stringify(result, null, 2);
                    element.x = get_Plan(element.x);
                    if (-1 == element.x) {
                        return;
                    }
                    localStorage.setItem("C305", element.x);
                    //console.log("C305: "+localStorage.getItem("C305"));
                }, function (error) {
                    console.log("Error: " + JSON.stringify(error, null, 2));
                });
                //Raum C313:
                element.http.get('https://aor.cs.hs-rm.de/rooms/992744751/plans.ics', options).subscribe(function (result) {
                    //console.log('login API success');
                    element.x = JSON.stringify(result, null, 2);
                    element.x = get_Plan(element.x);
                    if (-1 == element.x) {
                        return;
                    }
                    localStorage.setItem("C313", element.x);
                    //console.log("C313: "+localStorage.getItem("C313"));
                }, function (error) {
                    console.log("Error: " + JSON.stringify(error, null, 2));
                });
                //Raum C361:
                element.http.get('https://aor.cs.hs-rm.de/rooms/1001264469/plans.ics', options).subscribe(function (result) {
                    //console.log('login API success');
                    element.x = JSON.stringify(result, null, 2);
                    element.x = get_Plan(element.x);
                    if (-1 == element.x) {
                        return;
                    }
                    localStorage.setItem("C361", element.x);
                    //console.log("C361: "+localStorage.getItem("C361"));
                }, function (error) {
                    console.log("Error: " + JSON.stringify(error, null, 2));
                });
                //Raum C375:
                element.http.get('https://aor.cs.hs-rm.de/rooms/1001264470/plans.ics', options).subscribe(function (result) {
                    //console.log('login API success');
                    element.x = JSON.stringify(result, null, 2);
                    element.x = get_Plan(element.x);
                    if (-1 == element.x) {
                        return;
                    }
                    localStorage.setItem("C375", element.x);
                    //console.log("C375: "+localStorage.getItem("C375"));
                }, function (error) {
                    console.log("Error: " + JSON.stringify(error, null, 2));
                });
                //Raum C377:
                element.http.get('https://aor.cs.hs-rm.de/rooms/1001264471/plans.ics', options).subscribe(function (result) {
                    //console.log('login API success');
                    element.x = JSON.stringify(result, null, 2);
                    element.x = get_Plan(element.x);
                    if (-1 == element.x) {
                        return;
                    }
                    localStorage.setItem("C377", element.x);
                    //console.log("C377: "+localStorage.getItem("C377"));
                }, function (error) {
                    console.log("Error: " + JSON.stringify(error, null, 2));
                });
                //Raum C405:
                element.http.get('https://aor.cs.hs-rm.de/rooms/1001196781/plans.ics', options).subscribe(function (result) {
                    //console.log('login API success');
                    element.x = JSON.stringify(result, null, 2);
                    element.x = get_Plan(element.x);
                    if (-1 == element.x) {
                        return;
                    }
                    localStorage.setItem("C405", element.x);
                    //console.log("C405: "+localStorage.getItem("C405"));
                }, function (error) {
                    console.log("Error: " + JSON.stringify(error, null, 2));
                });
                //Raum C407:
                element.http.get('https://aor.cs.hs-rm.de/rooms/1001196783/plans.ics', options).subscribe(function (result) {
                    //console.log('login API success');
                    element.x = JSON.stringify(result, null, 2);
                    element.x = get_Plan(element.x);
                    if (-1 == element.x) {
                        return;
                    }
                    localStorage.setItem("C407", element.x);
                    //console.log("C407: "+localStorage.getItem("C407"));
                }, function (error) {
                    console.log("Error: " + JSON.stringify(error, null, 2));
                });
                //Raum C413:
                element.http.get('https://aor.cs.hs-rm.de/rooms/1001264428/plans.ics', options).subscribe(function (result) {
                    //console.log('login API success');
                    element.x = JSON.stringify(result, null, 2);
                    element.x = get_Plan(element.x);
                    if (-1 == element.x) {
                        return;
                    }
                    localStorage.setItem("C413", element.x);
                    //console.log("C413: "+localStorage.getItem("C413"));
                }, function (error) {
                    console.log("Error: " + JSON.stringify(error, null, 2));
                });
                //timeout(4);
                loader.dismiss();
                localStorage.setItem("benutzer", element.benutzername);
                localStorage.setItem("passwort", element.password);
                console.log("Benutzername und Passwort gespeichert.");
                console.log(localStorage.getItem("benutzer"));
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
            //console.log("Error: POST: "+ JSON.stringify(error, null, 2));;
            //Überprüfen ob alle Versuche gescheitert sind:
            var fehlerFeld = document.getElementById('Fehler');
            fehlerFeld.innerText = "Benutzername oder Passwort falsch.";
            fehlerFeld.style.display = "block";
            var fehlerFeldZwei = document.getElementById('Fehler2');
            fehlerFeldZwei.innerText = "Login fehlgeschlagen. Bitte starte die App erneut.";
            fehlerFeldZwei.style.display = "block";
            var ladeicon = document.getElementById('laden');
            ladeicon.style.display = "none";
            return;
        }); //post
    }, function (error) {
        console.log("Error: " + JSON.stringify(error, null, 2));
    }); //get
    //}//for
}
var LoginPage = /** @class */ (function () {
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //   Wichtiger Hinweis!!!!!!                                                                                                                                        //
    //   Diesen Parameter auf jeden Fall im Konstruktor stehen lassen, auch wenn der Compiler warnings ausgibt.                                                         //
    //   http wird an die Funktion loginFunction mit dem Parameter "this" übergeben!                                                                                    //
    //    |________________________________________________________________________________________________________________________________________________________     //
    //                                                                                                                                                            |     //
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
        if (localStorage.getItem("benutzer") != null && localStorage.getItem("passwort") != null) {
            this.benutzername = localStorage.getItem("benutzer");
            this.password = localStorage.getItem("passwort");
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
            selector: 'page-login',template:/*ion-inline-start:"/home/patrick/Schreibtisch/WahlprojektSS18/src/pages/login/login.html"*/'<ion-header id="header" hide-nav-bar="true">\n\n  <ion-navbar>\n    <ion-title><img class="logo" style="margin-right: 10px; float: left;" src="assets/imgs/FreiRaumLogo.png" width="30px"/> Login</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<!--<ion-content id="content" padding>\n  <span style="margin-left: 15px;">Bitte mit deinem HDS-Account anmelden.</span><br>\n  <span id="Fehler" style="display: none; margin: 20px; margin-bottom: 10px; padding: 5px; border: thin solid red; border-radius: 3px; color: red;">\n  </span>\n  <div *ngIf="showLogin" style="margin-top: 10px;">\n    <ion-item>\n      <ion-input (click)="clicked()" type="benutzername" placeholder="Benutzername" [(ngModel)]="benutzername" [attr.autofocus]="shouldFocus"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-input (click)="clicked()" type="password" placeholder="Password" [(ngModel)]="password"></ion-input>\n    </ion-item>\n  </div>\n  <span style="width: 100%; text-align: center;">\n    <button ion-button style="margin: 20px; width: 200px;" (click)="doLogin()">Login</button>\n    <span id="Feld2" style="margin-top: 25px; width: 100%; text-align: center;"></span><br>\n  </span>\n</ion-content>-->\n\n<ion-content id="content" padding>\n  <div id="laden" style="display:none; margin: -15px; width: 100%;height:100%;background: rgba(0,0,0,.5);display:block;z-index:100;position:absolute;">\n    <div id="ladeimage" style="background: rgba(255,255,255,1); display:block; z-index:101;border:1px solid #FFFFFF;border-radius:3px;position:relative;margin:150px 50px;padding:10px;text-align:center;">\n      <img class="logo" src="assets/imgs/Ladeicon.gif" width="100"/><br><br>\n      Login wird durchgeführt.\n    </div>\n  </div>\n  <ion-grid style="height: 50%">\n    <ion-row style="height: 100%">\n      <span style="margin-left: 10px;">Bitte mit deinem HDS-Account anmelden.</span><br>\n      <span id="Fehler" style="display: none; margin: 15px; padding: 5px; border: thin solid red; border-radius: 3px; color: red;">\n      </span>\n      <div *ngIf="showLogin" style="margin-left: -5px; text-align:center; width: 100%;">\n        <ion-item>\n          <ion-input (click)="clicked()" type="benutzername" placeholder="Benutzername" [(ngModel)]="benutzername" [attr.autofocus]="shouldFocus"></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-input (click)="clicked()" type="password" placeholder="Passwort" [(ngModel)]="password"></ion-input>\n        </ion-item>\n      </div>\n      <span style="width: 100%; text-align: center;">\n        <button ion-button style="margin: 20px; width: 200px;" (click)="doLogin()">Login</button>\n      </span>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n\n<ion-content id="login" padding style="display:none;white-space:pre-line;">\n  <ion-grid style="height: 60%">\n    <ion-row justify-content-center align-items-center style="text-align: center; height: 60%">\n      <img class="logo" src="assets/imgs/Ladeicon.gif" width="250"/>\n    </ion-row>\n    <ion-row justify-content-center align-items-center style="text-align: center; height: 20%">\n      <span id="Fehler2" style="margin-top: 15px;">Login wird durchgeführt.</span>\n    </ion-row>\n    <ion-row justify-content-center align-items-center style="text-align: center; height: 20%">\n      <h1>Finde deinen freien Raum!</h1>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/home/patrick/Schreibtisch/WahlprojektSS18/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]) === "function" && _e || Object])
    ], LoginPage);
    return LoginPage;
    var _a, _b, _c, _d, _e;
}());

;
//# sourceMappingURL=login.js.map

/***/ }),

/***/ 116:
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
		289,
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

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GebaudeModel; });
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
        this.zugangsberechtigung = ["C001", "C007"];
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
    ********************************************************************************************/
    GebaudeModel.prototype.getFreeRooms = function () {
        var _this = this;
        var result = []; // RaumModel[] = [];
        var slots = this.giveSlots();
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
                if (raum.isFree(slots[i], _this.giveWochentag())) {
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
    ********************************************************************************************/
    GebaudeModel.prototype.giveUhrzeit = function () {
        var jetzt = new Date();
        var stunden = jetzt.getHours();
        var minuten = jetzt.getMinutes();
        switch (true) {
            //0:00 - 0:59
            case (stunden == 0) && (minuten >= 0 && minuten <= 59):
                console.log("1");
                return "08:15:00";
            //1:00 - 1:59
            case (stunden == 1) && (minuten >= 0 && minuten <= 59):
                console.log("2");
                return "08:15:00";
            //2:00 - 2:59
            case (stunden == 2) && (minuten >= 0 && minuten <= 59):
                console.log("3");
                return "08:15:00";
            //3:00 - 3:59
            case (stunden == 3) && (minuten >= 0 && minuten <= 59):
                console.log("4");
                return "08:15:00";
            //4:00 - 4:59
            case (stunden == 4) && (minuten >= 0 && minuten <= 59):
                console.log("5");
                return "08:15:00";
            //5:00 - 5:59
            case (stunden == 5) && (minuten >= 0 && minuten <= 59):
                console.log("6");
                return "08:15:00";
            //6:00 - 6:59
            case (stunden == 6) && (minuten >= 0 && minuten <= 59):
                console.log("7");
                return "08:15:00";
            //7:00 - 7:59
            case (stunden == 7) && (minuten >= 0 && minuten <= 59):
                console.log("8");
                return "08:15:00";
            //8:00 - 8:59
            case (stunden == 8) && (minuten >= 0 && minuten <= 59):
                console.log("9");
                return "08:15:00";
            //9:00 - 9:44
            case (stunden == 9) && (minuten >= 0 && minuten <= 44):
                console.log("10");
                return "08:15:00";
            //9:45 - 9:59
            case (stunden == 9) && (minuten >= 45 && minuten <= 59):
                console.log("11");
                return "10:00:00";
            //10:00 - 10:59
            case (stunden == 10) && (minuten >= 0 && minuten <= 59):
                console.log("12");
                return "10:00:00";
            //11:00 - 11:44
            case (stunden == 11) && (minuten >= 0 && minuten <= 44):
                console.log("13");
                return "10:00:00";
            //11:45 - 11:59
            case (stunden == 11) && (minuten >= 45 && minuten <= 59):
                console.log("14");
                return "11:45:00";
            //12:00 - 12:59
            case (stunden == 12) && (minuten >= 0 && minuten <= 59):
                console.log("15");
                return "11:45:00";
            //13:00 - 13:59
            case (stunden == 13) && (minuten >= 0 && minuten <= 59):
                console.log("16");
                return "11:45:00";
            //14:00 - 14:14
            case (stunden == 14) && (minuten >= 0 && minuten <= 14):
                console.log("17");
                return "11:45:00";
            //14:15 - 14:59
            case (stunden == 14) && (minuten >= 15 && minuten <= 59):
                console.log("18");
                return "14:15:00";
            //15:00 - 15:59
            case (stunden == 15) && (minuten >= 0 && minuten <= 59):
                console.log("19");
                return "14:15:00";
            //16:00 - 16:59
            case (stunden == 16) && (minuten >= 0 && minuten <= 59):
                console.log("20");
                return "16:00:00";
            //17:00 - 17:44
            case (stunden == 17) && (minuten >= 0 && minuten <= 44):
                console.log("21");
                return "16:00:00";
            //17:45 - 17:59
            case (stunden == 17) && (minuten >= 45 && minuten <= 59):
                console.log("22");
                return "17:45:00";
            //18:00 - 18:59
            case (stunden == 18) && (minuten >= 0 && minuten <= 59):
                console.log("23");
                return "17:45:00";
            //19:00 - 19:29
            case (stunden == 19) && (minuten >= 0 && minuten <= 29):
                console.log("24");
                return "17:45:00";
            //19:30 - 19:59
            case (stunden == 19) && (minuten >= 30 && minuten <= 59):
                console.log("25");
                return "19:30:00";
            //20:00 - 20:59
            case (stunden == 20) && (minuten >= 0 && minuten <= 59):
                console.log("26");
                return "19:30:00";
            //21:00 - 21:59
            case (stunden == 21) && (minuten >= 0 && minuten <= 59):
                console.log("27");
                return "21:00:00";
            //22:00 - 22:59
            case (stunden == 22) && (minuten >= 0 && minuten <= 59):
                console.log("28");
                return "21:00:00";
            //23:00 - 23:59
            case (stunden == 23) && (minuten >= 0 && minuten <= 59):
                console.log("29");
                return "21:00:00";
            default: break;
        }
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion gibt den aktuellen Wochentag zurück                                            *
    *                                                                                           *
    ********************************************************************************************/
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
    GebaudeModel.prototype.getRoom = function (name) {
        this.raume.forEach(function (raum) {
            if (raum.raumname == name) {
                return raum;
            }
        });
    };
    return GebaudeModel;
}());

//# sourceMappingURL=GebaudeModel.js.map

/***/ }),

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_c_c__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_d_d__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_search_search__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_login_login__ = __webpack_require__(104);
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
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/c/c.module#CPageModule', name: 'Cgebaude', segment: 'c', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/d/d.module#DPageModule', name: 'Dgebaude', segment: 'd', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
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
                __WEBPACK_IMPORTED_MODULE_9__pages_c_c__["a" /* Cgebaude */],
                __WEBPACK_IMPORTED_MODULE_10__pages_d_d__["a" /* Dgebaude */],
                __WEBPACK_IMPORTED_MODULE_11__pages_search_search__["a" /* Search */],
                __WEBPACK_IMPORTED_MODULE_12__pages_login_login__["a" /* LoginPage */]
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

/***/ 250:
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
    ********************************************************************************************/
    RaumModel.prototype.getICS = function (text) {
        text.trim();
        //console.log("text.split(\\r\\n): "+text.split("\\r\\n"));
        return text.split("\\r\\n");
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion parst die Uhrzeit aus dem Raumplan in das Format HH:MM:SS.                     *
    *                                                                                           *
    *   text -> Uhrzeit, die geparst werden soll                                                *
    *                                                                                           *
    ********************************************************************************************/
    RaumModel.prototype.getUhrZeit = function (text) {
        var datum = text.split("T");
        var tmp = datum[1];
        return tmp;
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion ermittelt, wann der Raum frei ist                                              *
    *                                                                                           *
    *   uhrzeit -> Uhrzeit, zu der der Raum frei sein soll                                      *
    *   wochentag -> Wochentag, zu dem der Raum frei sein soll                                  *
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

/***/ 252:
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

/***/ 253:
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

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_c_c__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_d_d__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_search_search__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(104);
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
            _this.splashScreen.hide;
            platform.registerBackButtonAction(function () {
                console.log("backPressed 1");
                //this.navCtrl.setRoot(HomePage);
            }, 1);
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/patrick/Schreibtisch/WahlprojektSS18/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <img class="logo" style="margin-left: 10px; float: left;" src="assets/imgs/FreiRaumLogo.png" width="40px"/>\n      <div style="padding-left: 20px; float: left; height: 40px; text-align: center; font-size: 12pt; vertical-align: middle;">\n        &nbsp;Finde deinen<br>&nbsp;freien Raum!\n      </div>\n      <ion-title>\n      </ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content padding>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/home/patrick/Schreibtisch/WahlprojektSS18/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_GebaudeModel__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_Darstellung__ = __webpack_require__(81);
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
var CampusConfig = ["C001",
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
    "C413"];
var CampusConfig2 = ["D01",
    "D02",
    "D12",
    "D13",
    "D14",
    "D15",
    "D17",
    "D18"];
var freeTimeSlot = [];
var StundenSlot = [
    '8:15:00', '10:00:00', '11:45:00', '14:15:00', '16:00:00', '17:45:00', '19:30:00', 'ab 21:00:'
];
function timeout(zahl) {
    var start = new Date().getTime();
    var i;
    for (i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > zahl * 1000) {
            break;
        }
    }
}
var Search = /** @class */ (function () {
    function Search(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.gebaudeC = new __WEBPACK_IMPORTED_MODULE_2__model_GebaudeModel__["a" /* GebaudeModel */]("C");
        this.gebaudeD = new __WEBPACK_IMPORTED_MODULE_2__model_GebaudeModel__["a" /* GebaudeModel */]("D");
        this.freeTimeSlot = freeTimeSlot;
    }
    //parseGebaude(raumnamen:string[], name:string){
    Search.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SearchPage');
        this.darstellung = new __WEBPACK_IMPORTED_MODULE_3__model_Darstellung__["a" /* Darstellung */](0);
        this.darstellung2 = new __WEBPACK_IMPORTED_MODULE_3__model_Darstellung__["a" /* Darstellung */](1);
        this.gebaudeC = this.darstellung.parseGebaude(CampusConfig, "C");
        this.gebaudeD = this.darstellung2.parseGebaude(CampusConfig2, "D");
        console.log(this.gebaudeC);
        console.log(this.gebaudeD);
    };
    Search.prototype.searchRoom = function (searchbar) {
        freeTimeSlot = [];
        var room = searchbar.target.value;
        console.log("Campusconfig: " + CampusConfig);
        var raume = [];
        for (var _i = 0, _a = this.gebaudeC.raume; _i < _a.length; _i++) {
            var rooms = _a[_i];
            raume.push(rooms.raumname);
        }
        for (var _b = 0, _c = this.gebaudeD.raume; _b < _c.length; _b++) {
            var rooms = _c[_b];
            raume.push(rooms.raumname);
        }
        console.log(room + " " + raume);
        if (raume.indexOf(room) == -1) {
            var fehlerFeld = document.getElementById('Fehler');
            fehlerFeld.innerText = "Raum konnte nicht gefunden werden";
            fehlerFeld.style.display = "block";
            this.navCtrl.setRoot(this.navCtrl.getActive().component);
            return null;
        }
        for (var y = 0; y < StundenSlot.length; y++) {
            //console.log(this.darstellung.parseToRaum(room).isFree(StundenSlot[y],this.darstellung.giveWochentag()));
            //console.log(this.darstellung.giveWochentag());
            //console.log(this.darstellung.parseToRaum(room));
            console.log(StundenSlot[y]);
            if (this.darstellung.parseToRaum(room).isFree(StundenSlot[y], this.darstellung.giveWochentag())) {
                freeTimeSlot.push(y);
            }
            else {
                freeTimeSlot.push(99);
            }
        }
        console.log(freeTimeSlot);
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
    };
    Search = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search',template:/*ion-inline-start:"/home/patrick/Schreibtisch/WahlprojektSS18/src/pages/search/search.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Raumsuche</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <b>Suche nach deinem Lieblingsraum:</b>\n  <ion-searchbar (ionCancel)="onCancel($event)" (change)="searchRoom($event)"placeholder="Lieblingsraum" [attr.autofocus]="shouldFocus"></ion-searchbar>\n  <span id="Fehler" style="display: none; margin: 15px; padding: 5px; border: thin solid red; border-radius: 3px; color: red;">\n    </span>\n  <ion-list>\n      <ng-container *ngFor="let item of freeTimeSlot; let i = index" [attr.data-index]="i">\n          <h5 *ngIf="i == 0" style="margin-top: 30px;">Der Raum ist zu folgenden Uhrzeiten frei:</h5>\n          <ion-item style="margin-top: 20px;" *ngIf="item == 0">08:15 bis 09:45</ion-item>\n          <ion-item style="margin-top: 20px;" *ngIf="item == 1">10:00 bis 11:30</ion-item>\n          <ion-item style="margin-top: 20px;" *ngIf="item == 2">11:45 bis 13:15</ion-item>\n          <ion-item style="margin-top: 20px;" *ngIf="item == 3">14:15 bis 15:45</ion-item>\n          <ion-item style="margin-top: 20px;" *ngIf="item == 4">16:00 bis 17:30</ion-item>\n          <ion-item style="margin-top: 20px;" *ngIf="item == 5">17:45 bis 19:15</ion-item>\n          <ion-item style="margin-top: 20px;" *ngIf="item == 6">19:30 bis 21:00</ion-item>\n          <ion-item style="margin-top: 20px;" *ngIf="item == 7">ab 21:00</ion-item>\n        </ng-container>\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/home/patrick/Schreibtisch/WahlprojektSS18/src/pages/search/search.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]) === "function" && _b || Object])
    ], Search);
    return Search;
    var _a, _b;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
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
        localStorage.removeItem("benutzer");
        localStorage.removeItem("passwort");
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/patrick/Schreibtisch/WahlprojektSS18/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title style="float: left;">Campusplan</ion-title>\n    <ion-icon (click)="search()" style="float: right; position: relative; font-size: 2em; margin-right: 5px;" name="search"></ion-icon>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-grid>\n    <ion-row>\n      <b>Herzlich Willkommen!</b>\n    </ion-row>\n    <ion-row>\n      Bitte wähle dein Gebäude:\n    </ion-row>\n    <ion-row style="text-align:center;">\n      <img id="img1" style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_01.jpg"/>\n    </ion-row>\n    <ion-row style="text-align:center">\n      <img id="img2" style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_02.jpg"/>\n    	<img id="img3" style="cursor: pointer; margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_03.jpg" (click)="nextD()"/>\n    	<img id="img4" style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_04.jpg"/>\n    </ion-row>\n    <ion-row style="text-align:center">\n      <img id="img5" style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_05.jpg"/>\n    </ion-row>\n    <ion-row style="text-align:center">\n      <img id="img6" style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_06.jpg"/>\n    	<img id="img7" style="cursor: pointer; margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_07.jpg" (click)="nextC()"/>\n    	<img id="img8" style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_08.jpg"/>\n    </ion-row>\n    <ion-row style="text-align:center">\n      <img id="img9" style="margin: 0px; padding: 0px; float: left;" src="assets/imgs/Campusplan_09.jpg"/>\n    </ion-row>\n    <ion-row style="text-align:center">\n      <button ion-button block style="margin-top: 20px; margin-bottom: 20px;" (click)="deleteDaten()">Benutzerdaten löschen</button>\n    </ion-row>\n  </ion-grid>\n\n</ion-content>\n'/*ion-inline-end:"/home/patrick/Schreibtisch/WahlprojektSS18/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search_search__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_Darstellung__ = __webpack_require__(81);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var Cgebaude = /** @class */ (function () {
    function Cgebaude(toastCtrl, navCtrl, navParams) {
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.freeRooms = [];
        this.zugang = [];
    }
    Cgebaude.prototype.ionViewDidLoad = function () {
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
        console.log('ionViewDidLoad CPage');
        this.darstellung = new __WEBPACK_IMPORTED_MODULE_4__model_Darstellung__["a" /* Darstellung */](0);
        console.log(this.darstellung);
        this.darstellung.parseToCampus();
        console.log(this.darstellung);
        this.freeRooms = this.darstellung.freeRooms;
        this.zugang = this.darstellung.zugang;
        console.log(this.freeRooms);
        console.log(this.zugang);
    };
    Cgebaude.prototype.onTip = function (raum) {
        var toast = this.toastCtrl.create({
            message: 'Für den Raum ' + raum + ' brauchst du eine Zugangsberechtigung.',
            duration: 3000,
            position: 'middle'
        });
        toast.present();
    };
    Cgebaude.prototype.BackToCampus = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    Cgebaude.prototype.search = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__search_search__["a" /* Search */]);
    };
    Cgebaude.prototype.getL = function (raumname) {
        console.log("GETL");
        var show2 = document.getElementById('Lehrinnen');
        //Entfernen der Lehrveranstaltungen:
        var remove = show2.firstChild;
        while (remove) {
            show2.removeChild(remove);
            remove = show2.firstChild;
        }
        var show = document.getElementById('Lehraussen');
        show.style.display = "block";
        show2.style.display = "block";
        var span1 = document.getElementById('span1');
        span1.style.display = "block";
        var span2 = document.getElementById('span2');
        span2.style.display = "block";
        var button = document.getElementById('button');
        button.style.display = "block";
        var notShow = document.getElementById('anzeige');
        notShow.style.display = "none";
        show2.appendChild(this.darstellung.getLehrveranstaltungen(raumname));
        this.scrollTop();
    };
    Cgebaude.prototype.backClicked = function () {
        console.log("backklicked");
        var show = document.getElementById('anzeige');
        show.style.display = "block";
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
        this.scrollTop();
    };
    Cgebaude.prototype.scrollTop = function () {
        this.content.scrollToTop();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], Cgebaude.prototype, "content", void 0);
    Cgebaude = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-c',template:/*ion-inline-start:"/home/patrick/Schreibtisch/WahlprojektSS18/src/pages/c/c.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title style="float: left;">C-Gebäude</ion-title>\n    <ion-icon (click)="search()" style="float: right; position: relative; font-size: 2em; margin-right: 5px;" name="search"></ion-icon>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div id="Lehraussen" style="display: none; margin: -15px; width: 100%;height:100%;background:rgba(255,255,255,1);z-index:100;position:absolute;">\n    <span id="span1" style="display: none; float: right; width: 100%; text-align:right;">\n      <ion-icon id="button" name="close-circle" (click)="backClicked()" style="display: none; cursor: pointer; font-size: 2em; color: rgb(66, 134, 244); margin: 5px; margin-right: 5px;"></ion-icon>\n    </span>\n    <span id="span2" style="display: none; float: left; width: 100%;">\n      <div id="Lehrinnen" style="display: none; background :rgba(255,255,255,1); z-index:101;border:1px solid #FFFFFF;border-radius:3px;position:relative;margin:0px 0px;padding:10px;text-align:left;">\n        {{ item }}\n      </div>\n    </span>\n  </div>\n\n  <div id="anzeige">\n    <b>Folgende Räume sind zur Zeit im C-Gebäude frei:</b><br><br>\n      <ion-list>\n        <ng-container *ngFor="let item of freeRooms">\n          <h3 style="margin-top: 20px;" *ngIf="item == \'08:15 bis 09:45:\'">08:15 bis 09:45:</h3>\n          <h3 style="margin-top: 20px;" *ngIf="item == \'10:00 bis 11:30:\'">10:00 bis 11:30:</h3>\n          <h3 style="margin-top: 20px;" *ngIf="item == \'11:45 bis 13:15:\'">11:45 bis 13:15:</h3>\n          <h3 style="margin-top: 20px;" *ngIf="item == \'14:15 bis 15:45:\'">14:15 bis 15:45:</h3>\n          <h3 style="margin-top: 20px;" *ngIf="item == \'16:00 bis 17:30:\'">16:00 bis 17:30:</h3>\n          <h3 style="margin-top: 20px;" *ngIf="item == \'17:45 bis 19:15:\'">17:45 bis 19:15:</h3>\n          <h3 style="margin-top: 20px;" *ngIf="item == \'19:30 bis 21:00:\'">19:30 bis 21:00:</h3>\n          <h3 style="margin-top: 20px;" *ngIf="item == \'ab 21:00:\'">ab 21:00:</h3>\n          <ng-container *ngIf="item != \'08:15 bis 09:45:\' && item != \'10:00 bis 11:30:\' && item != \'11:45 bis 13:15:\' && item != \'14:15 bis 15:45:\' && item != \'16:00 bis 17:30:\' && item != \'17:45 bis 19:15:\' && item != \'19:30 bis 21:00:\' && item != \'ab 21:00:\'">\n            <ion-item (click)="getL(item)">\n              <span style="float: left;">{{ item }}</span> <ng-container *ngFor="let keys of zugang"><ion-icon style="float: right;" name="key" *ngIf="item == keys" (click)="onTip(item)"></ion-icon></ng-container>\n            </ion-item>\n          </ng-container>\n        </ng-container>\n      </ion-list>\n\n    <button ion-button block style="margin-bottom: 20px;" (click)="BackToCampus()">Zum Campusplan</button>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/home/patrick/Schreibtisch/WahlprojektSS18/src/pages/c/c.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search_search__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_Darstellung__ = __webpack_require__(81);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var Dgebaude = /** @class */ (function () {
    function Dgebaude(toastCtrl, navCtrl, navParams) {
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.freeRooms = [];
        this.zugang = [];
    }
    Dgebaude.prototype.ionViewDidLoad = function () {
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
        console.log('ionViewDidLoad CPage');
        this.darstellung = new __WEBPACK_IMPORTED_MODULE_4__model_Darstellung__["a" /* Darstellung */](1);
        console.log(this.darstellung);
        this.darstellung.parseToCampus();
        console.log(this.darstellung);
        this.freeRooms = this.darstellung.freeRooms;
        this.zugang = this.darstellung.zugang;
        console.log(this.freeRooms);
        console.log(this.zugang);
    };
    Dgebaude.prototype.onTip = function (raum) {
        var toast = this.toastCtrl.create({
            message: 'Für den Raum ' + raum + ' brauchst du eine Zugangsberechtigung.',
            duration: 3000,
            position: 'middle'
        });
        toast.present();
    };
    Dgebaude.prototype.BackToCampus = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    Dgebaude.prototype.search = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__search_search__["a" /* Search */]);
    };
    Dgebaude.prototype.getL = function (raumname) {
        console.log("GETL");
        var show2 = document.getElementById('Lehrinnen');
        //Entfernen der Lehrveranstaltungen:
        var remove = show2.firstChild;
        while (remove) {
            show2.removeChild(remove);
            remove = show2.firstChild;
        }
        console.log("HALLO");
        var show = document.getElementById('Lehraussen');
        show.style.display = "block";
        show2.style.display = "block";
        var span1 = document.getElementById('span1');
        span1.style.display = "block";
        var span2 = document.getElementById('span2');
        span2.style.display = "block";
        var button = document.getElementById('button');
        button.style.display = "block";
        var notShow = document.getElementById('anzeige');
        notShow.style.display = "none";
        console.log("HALLO");
        console.log(this.darstellung.getLehrveranstaltungen(raumname));
        show2.appendChild(this.darstellung.getLehrveranstaltungen(raumname));
        this.scrollTop();
    };
    Dgebaude.prototype.backClicked = function () {
        console.log("backklicked");
        var show = document.getElementById('anzeige');
        show.style.display = "block";
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
        this.scrollTop();
    };
    Dgebaude.prototype.scrollTop = function () {
        this.content.scrollToTop();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], Dgebaude.prototype, "content", void 0);
    Dgebaude = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-d',template:/*ion-inline-start:"/home/patrick/Schreibtisch/WahlprojektSS18/src/pages/d/d.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title style="float: left;">D-Gebäude</ion-title>\n    <ion-icon (click)="search()" style="float: right; position: relative; font-size: 2em; margin-right: 5px;" name="search"></ion-icon>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div id="Lehraussen" style="display: none; margin: -15px; width: 100%;height:100%;background:rgba(255,255,255,1);z-index:100;position:absolute;">\n    <span id="span1" style="display: none; float: right; width: 100%; text-align:right;">\n      <ion-icon id="button" name="close-circle" (click)="backClicked()" style="display: none; cursor: pointer; font-size: 2em; color: rgb(66, 134, 244); margin: 5px; margin-right: 5px;"></ion-icon>\n    </span>\n    <span id="span2" style="display: none; float: left; width: 100%;">\n      <div id="Lehrinnen" style="display: none; background :rgba(255,255,255,1); z-index:101;border:1px solid #FFFFFF;border-radius:3px;position:relative;margin:0px 0px;padding:10px;text-align:left;">\n        {{ item }}\n      </div>\n    </span>\n  </div>\n\n  <div id="anzeige">\n  	<b>Folgende Räume sind zur Zeit im D-Gebäude frei:</b><br><br>\n    <ion-list>\n      <ng-container *ngFor="let item of freeRooms">\n        <h3 style="margin-top: 20px;" *ngIf="item == \'08:15 bis 09:45:\'">08:15 bis 09:45:</h3>\n        <h3 style="margin-top: 20px;" *ngIf="item == \'10:00 bis 11:30:\'">10:00 bis 11:30:</h3>\n        <h3 style="margin-top: 20px;" *ngIf="item == \'11:45 bis 13:15:\'">11:45 bis 13:15:</h3>\n        <h3 style="margin-top: 20px;" *ngIf="item == \'14:15 bis 15:45:\'">14:15 bis 15:45:</h3>\n        <h3 style="margin-top: 20px;" *ngIf="item == \'16:00 bis 17:30:\'">16:00 bis 17:30:</h3>\n        <h3 style="margin-top: 20px;" *ngIf="item == \'17:45 bis 19:15:\'">17:45 bis 19:15:</h3>\n        <h3 style="margin-top: 20px;" *ngIf="item == \'19:30 bis 21:00:\'">19:30 bis 21:00:</h3>\n        <h3 style="margin-top: 20px;" *ngIf="item == \'ab 21:00:\'">ab 21:00:</h3>\n        <ng-container *ngIf="item != \'08:15 bis 09:45:\' && item != \'10:00 bis 11:30:\' && item != \'11:45 bis 13:15:\' && item != \'14:15 bis 15:45:\' && item != \'16:00 bis 17:30:\' && item != \'17:45 bis 19:15:\' && item != \'19:30 bis 21:00:\' && item != \'ab 21:00:\'">\n          <ion-item (click)="getL(item)">\n            <span style="float: left;">{{ item }}</span> <ng-container *ngFor="let keys of zugang"><ion-icon style="float: right;" name="key" *ngIf="item == keys" (click)="onTip(item)"></ion-icon></ng-container>\n          </ion-item>\n        </ng-container>\n      </ng-container>\n    </ion-list>\n\n    <button ion-button block style="margin-bottom: 20px;" (click)="BackToCampus()">Zum Campusplan</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/patrick/Schreibtisch/WahlprojektSS18/src/pages/d/d.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], Dgebaude);
    return Dgebaude;
}());

//# sourceMappingURL=d.js.map

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Darstellung; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RaumModel_1__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ical_js__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ical_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ical_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Veranstaltung__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__GebaudeModel__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__CampusModel__ = __webpack_require__(253);





var Darstellung = /** @class */ (function () {
    /********************************************************************************************
    *                                                                                           *
    *   Funktion setzt das Gebäude.                                                             *
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
    *   Funktion ermittelt anhand eines Datums den dazugehörigen Wochentag.                     *
    *                                                                                           *
    *   text -> Datum                                                                           *
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
    *   Funktion parst die Uhrzeit aus dem Raumplan in das Format HH:MM:SS.                     *
    *                                                                                           *
    *   text -> Uhrzeit, die geparst werden soll                                                *
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
    ********************************************************************************************/
    Darstellung.prototype.parseGebaude = function (raumnamen, name) {
        var _this = this;
        var gebaude = new __WEBPACK_IMPORTED_MODULE_3__GebaudeModel__["a" /* GebaudeModel */](name);
        console.log("parseGebaude");
        //console.log(name);
        raumnamen.forEach(function (raumname) {
            var raum = _this.parseToRaum(raumname);
            //console.log(raumname);
            gebaude.addRaum(raum);
        });
        return gebaude;
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion parst die Raumpläne und legt Veranstaltungen an.                               *
    *                                                                                           *
    *   raumname -> Name des Raums für den der Raumplan ermittelt werden soll                   *
    *                                                                                           *
    ********************************************************************************************/
    Darstellung.prototype.parseToRaum = function (raumname) {
        var raum = new __WEBPACK_IMPORTED_MODULE_0__RaumModel_1__["a" /* RaumModel */](raumname);
        console.log("parseToRaum");
        console.log(raumname);
        var ics = raum.getICS(localStorage.getItem(raumname));
        console.log(ics);
        console.log(localStorage.getItem(raumname));
        ics.pop();
        var jcalData = __WEBPACK_IMPORTED_MODULE_1_ical_js___default.a.parse(ics.join("\r\n"));
        console.log(ics);
        var vcalendar = new __WEBPACK_IMPORTED_MODULE_1_ical_js___default.a.Component(jcalData);
        var vevent = vcalendar.getAllSubcomponents('vevent');
        for (var i = 0; i < vevent.length; i++) {
            var start = vevent[i].getFirstPropertyValue('dtstart');
            var end = vevent[i].getFirstPropertyValue('dtend');
            var startZeit = this.parseUhrZeit(start.toString());
            var endZeit = this.parseUhrZeit(end.toString());
            var name = vevent[i].getFirstPropertyValue('description');
            var wochentag = this.parseDateToWochentag(start.toString());
            //console.log("start:"+ startZeit, "name" + name, "Wochentag " +wochentag, "end:"+ endZeit);
            var veranstaltung = new __WEBPACK_IMPORTED_MODULE_2__Veranstaltung__["a" /* Veranstaltung */](name, wochentag, startZeit, endZeit);
            raum.addVeranstaltung(veranstaltung);
            switch (startZeit) {
                case "08:15:00":
                    if (endZeit == "11:30:00") {
                        console.log("hallo case 8 -11.30");
                        var veranstaltung1 = new __WEBPACK_IMPORTED_MODULE_2__Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "10:00:00", endZeit);
                        raum.addVeranstaltung(veranstaltung1);
                    }
                    else if (endZeit == "13:15:00") {
                        console.log("hallo case 8 -13");
                        var veranstaltung2 = new __WEBPACK_IMPORTED_MODULE_2__Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "10:00:00", endZeit);
                        raum.addVeranstaltung(veranstaltung2);
                        var veranstaltung3 = new __WEBPACK_IMPORTED_MODULE_2__Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "11:45:00", endZeit);
                        raum.addVeranstaltung(veranstaltung3);
                    }
                    break;
                case "10:00:00":
                    if (endZeit == "13:15:00") {
                        console.log("hallo case 10 -13.15");
                        var veranstaltung4 = new __WEBPACK_IMPORTED_MODULE_2__Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "11:45:00", endZeit);
                        raum.addVeranstaltung(veranstaltung4);
                    }
                    else if (endZeit == "15:45:00") {
                        console.log("hallo case 10 -15.45");
                        var veranstaltung5 = new __WEBPACK_IMPORTED_MODULE_2__Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "11:45:00", endZeit);
                        raum.addVeranstaltung(veranstaltung5);
                        var veranstaltung6 = new __WEBPACK_IMPORTED_MODULE_2__Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "14:15:00", endZeit);
                        raum.addVeranstaltung(veranstaltung6);
                    }
                    break;
                case "11:45:00":
                    if (endZeit == "15:45:00") {
                        console.log("hallo case 11.45-15.45");
                        var veranstaltung7 = new __WEBPACK_IMPORTED_MODULE_2__Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "14:15:00", endZeit);
                        raum.addVeranstaltung(veranstaltung7);
                    }
                    else if (endZeit == "17:30:00") {
                        console.log("hallo case 11.45-17.35");
                        var veranstaltung8 = new __WEBPACK_IMPORTED_MODULE_2__Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "14:15:00", endZeit);
                        raum.addVeranstaltung(veranstaltung8);
                        var veranstaltung9 = new __WEBPACK_IMPORTED_MODULE_2__Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "16:00:00", endZeit);
                        raum.addVeranstaltung(veranstaltung9);
                    }
                    break;
                case "14:15:00":
                    if (endZeit == "17:30:00") {
                        console.log("hallo case 14.15-17.30");
                        var veranstaltung10 = new __WEBPACK_IMPORTED_MODULE_2__Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "16:00:00", endZeit);
                        raum.addVeranstaltung(veranstaltung10);
                    }
                    else if (endZeit == "19:15:00") {
                        console.log("hallo case 14.15-19.15");
                        var veranstaltung11 = new __WEBPACK_IMPORTED_MODULE_2__Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "16:00:00", endZeit);
                        raum.addVeranstaltung(veranstaltung11);
                        var veranstaltung12 = new __WEBPACK_IMPORTED_MODULE_2__Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "17:45:00", endZeit);
                        raum.addVeranstaltung(veranstaltung12);
                    }
                    break;
                case "16:00:00":
                    if (endZeit == "19:15:00") {
                        console.log("hallo case 16.00-19.15");
                        var veranstaltung13 = new __WEBPACK_IMPORTED_MODULE_2__Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "17:45:00", endZeit);
                        raum.addVeranstaltung(veranstaltung13);
                    }
                    else if (endZeit == "21:00:00") {
                        console.log("hallo case 16.00-21.00");
                        var veranstaltung14 = new __WEBPACK_IMPORTED_MODULE_2__Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "17:45:00", endZeit);
                        raum.addVeranstaltung(veranstaltung14);
                        var veranstaltung15 = new __WEBPACK_IMPORTED_MODULE_2__Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "19:30:00", endZeit);
                        raum.addVeranstaltung(veranstaltung15);
                    }
                    break;
                case "17:45:00":
                    if (endZeit == "21:00:00") {
                        var veranstaltung16 = new __WEBPACK_IMPORTED_MODULE_2__Veranstaltung__["a" /* Veranstaltung */](name, wochentag, "19:30:00", endZeit);
                        raum.addVeranstaltung(veranstaltung16);
                    }
                default:
            }
        }
        return raum;
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion erstellt den Campus und füllt den Array freeRooms mit den freien Räumen.       *
    *                                                                                           *
    ********************************************************************************************/
    Darstellung.prototype.parseToCampus = function () {
        var campus = new __WEBPACK_IMPORTED_MODULE_4__CampusModel__["a" /* CampusModel */]("HSRM");
        //console.log(this.CampusConfig)
        for (var _i = 0, _a = this.CampusConfig; _i < _a.length; _i++) {
            var gebaudeConfig = _a[_i];
            var gebaude = this.parseGebaude(gebaudeConfig.raumnamen, gebaudeConfig.gebaudename);
            campus.addGebaude(gebaude);
            //console.log(this.CampusConfig);
        }
        for (var i = 0; i < campus.gebaude[this.GebaudeAuswahl].getFreeRooms().length; i++) {
            this.freeRooms.push(campus.gebaude[this.GebaudeAuswahl].getFreeRooms()[i]);
        }
        for (var j = 0; j < campus.gebaude[this.GebaudeAuswahl].zugangsberechtigung.length; j++) {
            this.zugang.push(campus.gebaude[this.GebaudeAuswahl].zugangsberechtigung[j]);
        }
        //console.log("test"+campus.gebaude[0].getFreeRooms()[0]);
        return campus;
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion entfernt die Sekunden in der Uhrzeit                                           *
    *                                                                                           *
    *   zeit -> Uhrzeit, die bearbeitet werden soll                                             *
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
    ********************************************************************************************/
    Darstellung.prototype.erstelleElement = function (text, tag) {
        var element = document.createElement(tag);
        //var text2:HTMLElement;
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
    *   <show2> //in c.ts bzw. d.ts                                                             *
    *     <inhalt>                              #                                               *
    *       <ueberschrift>                        #                                             *
    *       ...Kann mehrere Ueberschriften         # werden in dieser Funktion erstellt         *
    *       <veranstaltung>                        # und dann zurückgegeben                     *
    *       ...und Veranstaltungen enthalten      #                                             *
    *     </inhalt>                             #                                               *
    *   </show2>                                                                                *
    *                                                                                           *
    ********************************************************************************************/
    Darstellung.prototype.zeigeLehrveranstaltungen = function (lehrveranstaltungen, raumname) {
        /*var show: HTMLElement = document.getElementById('Lehraussen');
        show.style.display = "block";
        var notShow: HTMLElement = document.getElementById('anzeige');
        notShow.style.display = "none";*/
        var inhalt = document.createElement("div");
        var ueberschrift = this.erstelleElement(raumname, "h3");
        inhalt.appendChild(ueberschrift);
        //var breaks:HTMLElement = document.createElement("br");
        //inhalt.innerHTML = "<h3>"+raumname+"</h3>";
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
            switch (lehrveranstaltungen[j]) {
                case "Montag":
                    ueberschrift = this.erstelleElement("Montag", "h5");
                    inhalt.appendChild(ueberschrift);
                    continue; //inhalt.innerHTML += "<h5>Montag</h5>";continue;
                case "Dienstag":
                    ueberschrift = this.erstelleElement("Dienstag", "h5");
                    inhalt.appendChild(ueberschrift);
                    continue; //inhalt.innerHTML += "<h5>Dienstag</h5>";continue;
                case "Mittwoch":
                    ueberschrift = this.erstelleElement("Mittwoch", "h5");
                    inhalt.appendChild(ueberschrift);
                    continue; //inhalt.innerHTML += "<h5>Mittwoch</h5>";continue;
                case "Donnerstag":
                    ueberschrift = this.erstelleElement("Donnerstag", "h5");
                    inhalt.appendChild(ueberschrift);
                    continue; //inhalt.innerHTML += "<h5>Donnerstag</h5>";continue;
                case "Freitag":
                    ueberschrift = this.erstelleElement("Freitag", "h5");
                    inhalt.appendChild(ueberschrift);
                    continue; //inhalt.innerHTML += "<h5>Freitag</h5>";continue;
                case "Samstag":
                    ueberschrift = this.erstelleElement("Samstag", "h5");
                    inhalt.appendChild(ueberschrift);
                    continue; //inhalt.innerHTML += "<h5>Samstag</h5>";continue;
                case "Sonntag":
                    ueberschrift = this.erstelleElement("Sonntag", "h5");
                    inhalt.appendChild(ueberschrift);
                    continue; //inhalt.innerHTML += "<h5>Sonntag</h5>";continue;
            }
            if (lehrveranstaltungen[j] != lehrvtmp) {
                console.log(lehrveranstaltungen[j]);
                console.log(lehrveranstaltungen[j + 1]);
                //Ermitteln welcher Veranstaltungstyp es ist:
                var vl = lehrveranstaltungen[j].indexOf("Vorlesung");
                var se = lehrveranstaltungen[j].indexOf("Seminar");
                var pr = lehrveranstaltungen[j].indexOf("Praktikum");
                var ue = lehrveranstaltungen[j].indexOf("Übung");
                if (vl != -1) {
                    //Vorlesung erstellen:
                    veranstaltung = this.erstelleElement("" + lehrveranstaltungen[j] + "," + lehrveranstaltungen[j + 1], "p");
                    veranstaltung.style.backgroundColor = "rgba(74, 106, 255, 0.5)";
                    veranstaltung.style.border = "2px solid rgb(74, 106, 255)";
                    inhalt.appendChild(veranstaltung);
                    //console.log("HALLO");inhalt.innerHTML += "<span style='background-color: rgb(66, 134, 244); border-radius: 3px;'>";
                }
                else if (se != -1) {
                    //Seminar erstellen:
                    veranstaltung = this.erstelleElement("" + lehrveranstaltungen[j] + "," + lehrveranstaltungen[j + 1], "p");
                    veranstaltung.style.backgroundColor = "rgba(26, 123, 81, 0.5)";
                    veranstaltung.style.border = "2px solid rgb(26, 123, 81)";
                    inhalt.appendChild(veranstaltung);
                    //inhalt.innerHTML += "<span style='background-color: rgb(111, 160, 36); border-radius: 3px; width: 100%;'>";
                }
                else if (pr != -1) {
                    //Praktikum erstellen:
                    veranstaltung = this.erstelleElement("" + lehrveranstaltungen[j] + "," + lehrveranstaltungen[j + 1], "p");
                    veranstaltung.style.backgroundColor = "rgba(255, 146, 63, 0.5)";
                    veranstaltung.style.border = "2px solid rgb(255, 146, 63)";
                    inhalt.appendChild(veranstaltung);
                    //inhalt.innerHTML += "<span style='background-color: rgb(244, 65, 65); border-radius: 3px; width: 100%;'>";
                }
                else if (ue != -1) {
                    //Uebung erstellen:
                    veranstaltung = this.erstelleElement("" + lehrveranstaltungen[j] + "," + lehrveranstaltungen[j + 1], "p");
                    veranstaltung.style.backgroundColor = "rgba(44, 250, 40, 0.4)";
                    veranstaltung.style.border = "2px solid rgb(44, 250, 40)";
                    inhalt.appendChild(veranstaltung);
                    //inhalt.innerHTML += "<span style='background-color: rgb(65, 196, 244); border-radius: 3px; width: 100%;'>";
                }
                else {
                    //Sonstige Veranstaltung erstellen:
                    veranstaltung = this.erstelleElement("" + lehrveranstaltungen[j] + "," + lehrveranstaltungen[j + 1], "p");
                    veranstaltung.style.backgroundColor = "rgba(140, 140, 140, 0.3)";
                    veranstaltung.style.border = "2px solid rgb(140, 140, 140)";
                    inhalt.appendChild(veranstaltung);
                    //inhalt.innerHTML += "<span style='background-color: rgb(65, 196, 244); border-radius: 3px; width: 100%;'>";
                }
                lehrvtmp = lehrveranstaltungen[j + 1];
                //inhalt.appendChild(breaks);
                //inhalt.innerHTML += ""+lehrveranstaltungen[j]+"<br>";
            }
        }
        /*console.log("INNERHTML :"+inhalt.outerHTML.toString());
        var inhaltString:string = inhalt.outerHTML.toString();
        console.log(inhaltString);
        return inhaltString.toString();*/
        return inhalt;
    };
    /********************************************************************************************
    *                                                                                           *
    *   Funktion ermittelt Lehrveranstaltungen für einen Raum                                   *
    *                                                                                           *
    *   raumname -> Name des Raums für den der Raumplan ermittelt werden soll                   *
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
        for (var i = 0; i < this.parseToRaum(raumname).veranstaltungen.length; i++) {
            name = this.parseToRaum(raumname).veranstaltungen[i].name;
            console.log(name);
            if (this.parseToRaum(raumname).veranstaltungen[i].wochentag != Wochentag) {
                Wochentag = this.parseToRaum(raumname).veranstaltungen[i].wochentag;
                LehrveranstaltungoffreeRooms.push(Wochentag);
                enduhrzeittmp = "";
                uhrzeittmp = "";
            }
            uhrzeit = this.changeZeit(this.parseToRaum(raumname).veranstaltungen[i].uhrzeit);
            enduhrzeit = this.changeZeit(this.parseToRaum(raumname).veranstaltungen[i].enduhrzeit);
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

},[204]);
//# sourceMappingURL=main.js.map