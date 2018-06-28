import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { HttpModule } from '@angular/http'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Gebaude } from '../pages/page/page';
import { Search } from '../pages/search/search';
import { LoginPage } from '../pages/login/login';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Gebaude,
    Search,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Gebaude,
    Search,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClient,


    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
