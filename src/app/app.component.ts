import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Network } from "@ionic-native/network";
import { Subscription } from "rxjs/Subscription";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  static changeNet: Subscription;
  rootPage: any = HomePage;



  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private network: Network) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {

      MyApp.changeNet = this.network.onchange().subscribe((data) => {
        this.IsOnline()

      }, err => { })


      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  IsOnline() {
    alert('Is 4G: ' + this.Is4G() + ' - IsWifi: ' + this.IsWifi() + ' - Is3G: ' + this.Is3G())
    return (this.Is4G() || this.IsWifi() || this.Is3G())
  }

  Is4G() {


    if (this.network && this.network.type)
      return this.network.type === '4g'; // navigator.connection.type === Connection.CELL_4G;
    else
      return navigator.onLine;
  }

  Is3G() {

    if (this.network && this.network.type)
      return this.network.type === '3g'; // navigator.connection.type === Connection.CELL_3G;
    else
      return navigator.onLine;
  }

  Is2G() {

    if (this.network && this.network.type)
      return this.network.type === '2g'; // navigator.connection.type === Connection.CELL_2G;
    else
      return navigator.onLine;
  }

  IsWifi() {
    if (this.network && this.network.type)
      return this.network.type === 'wifi'; //navigator.connection.type === Connection.WIFI;
    else
      return navigator.onLine;
  }

  IsEthernet() {
    if (this.network && this.network.type)
      return this.network.type === 'ethernet' //navigator.connection.type === Connection.ETHERNET;
    else
      return navigator.onLine;
  }

  IsUnknown() {
    if (this.network && this.network.type)
      return this.network.type === 'unknown' //navigator.connection.type === Connection.UNKNOWN;
    else
      return navigator.onLine;
  }

  IsCell() {
    if (this.network && this.network.type)
      return this.network.type === 'cellular' //navigator.connection.type === Connection.CELL;
    else
      return navigator.onLine;
  }

  IsNoNetwork() {

    if (this.network && this.network.type)
      return this.network.type === 'none' //navigator.connection.type === Connection.NONE;
    else
      return navigator.onLine;
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
