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
    this.splashScreen.hide
    platform.registerBackButtonAction(() => {
      console.log("backPressed 1");
      //this.navCtrl.setRoot(HomePage);
    },1);
  });

    this.pages = [
      { title: 'Campusplan', component: HomePage, item: "Home" },
      { title: 'Gebäude C', component: Gebaude, item: "C" },
      { title: 'Gebäude D', component: Gebaude, item: "D" },
      { title: 'Raumsuche', component: Search, item: "Search" }
    ];
  }

  openPage(page, item) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component, {item: item});
  }
}
