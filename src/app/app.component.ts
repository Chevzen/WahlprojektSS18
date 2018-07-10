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
        page = localStorage.getItem("page");
        switch(page){
          case "room":
          console.log("backPressed 1");return;
        }
      }
      this.nav.pop();
      console.log("backPressed 1");
      //this.navCtrl.setRoot(HomePage);
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
  deleteDaten() {
    this.nav.setRoot(HomePage, {item: "daten"});
  }
}
