import { Component,ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { Cgebaude } from '../pages/c/c';
import { Dgebaude } from '../pages/d/d';
import { Search } from '../pages/search/search';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav:Nav;
  rootPage:any = LoginPage;
  navCtrl:any;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
  this.platform.ready().then(() => {
    this.statusBar.styleDefault();
    this.splashScreen.hide
    platform.registerBackButtonAction(() => {
      console.log("backPressed 1");
      //this.navCtrl.setRoot(HomePage);
    },1);
  });

    this.pages = [
      { title: 'Campusplan', component: HomePage },
      { title: 'Gebäude C', component: Cgebaude },
      { title: 'Gebäude D', component: Dgebaude },
      { title: 'Raumsuche', component: Search }
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
