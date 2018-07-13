import { Component,ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { Gebaude } from '../pages/page/page';
import { Search } from '../pages/search/search';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav:Nav;
  rootPage:any = LoginPage;
  navCtrl:any;
  pages: Array<{title: string, component: any, item: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
  this.platform.ready().then(() => {
    this.statusBar.styleDefault();
    this.splashScreen.hide;
    //Der Hardware-Backbutton des Handys bekommt eine Aktion:
    platform.registerBackButtonAction(() => {
      var page:string;

      if(null != localStorage.getItem("page")){
        //Wenn die Variable page gesetzt wurde, dann befindet sich der Benutzer
        //auf der Raumplanansicht eines Raums.

        page = localStorage.getItem("page");
        if(page.length > 1){
          page = page.substring(0,1);
        }
        //Der Benutzer kommt mit dem Hardware-Backbutton auf die Gebäudeseite,
        //auf welcher der Raum mit der aktuellen Raumplanansicht steht.
        //Daraufhin wird die Variable page gelöscht.
        switch(page){
          case "C": this.nav.setRoot(Gebaude, {item: "C"}); localStorage.removeItem("page"); return;
          case "D": this.nav.setRoot(Gebaude, {item: "D"}); localStorage.removeItem("page"); return;
          default: this.nav.pop(); localStorage.removeItem("page"); return;
        }
      }else if(null != localStorage.getItem("from")){
        //Wenn die Variable from gesetzt ist, dann befindet sich der Benutzer
        //auf der Suchseite.

        page = localStorage.getItem("from");
        //Der Benutzer wird auf die Seite von der er auf die Suchseite kam zurückgeleitet.
        switch(page){
          case "C": this.nav.setRoot(Gebaude, {item: "C"}); localStorage.removeItem("from"); return;
          case "D": this.nav.setRoot(Gebaude, {item: "D"}); localStorage.removeItem("from"); return;
          case "Home": this.nav.setRoot(HomePage, {item: "Home"}); localStorage.removeItem("from"); return;
          default: this.nav.pop(); localStorage.removeItem("from"); return;
        }
      }else{
        //Wenn die Variablen page und from nicht gesetzt sind, gehe eine Seite rückwärts.
        this.nav.pop();
      }
    },1);
  });

  //Die Seiten des Menüs:
    this.pages = [
      { title: 'Campusplan', component: HomePage, item: "Home" },
      { title: 'Gebäude C', component: Gebaude, item: "C" },
      { title: 'Gebäude D', component: Gebaude, item: "D" },
      { title: 'Raumsuche', component: Search, item: "Search" },
      { title: 'Aktualisieren', component: LoginPage, item: "Aktualisieren"}
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
  openPage(page, item) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component, {item: item});
  }

  /********************************************************************************************
  *                                                                                           *
  *   Funktion ruft die Startseite auf                                                        *
  *                                                                                           *
  ********************************************************************************************/
  datenverwaltung() {
    this.nav.setRoot(HomePage, {item: "daten"});
  }
}
