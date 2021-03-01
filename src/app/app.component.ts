import { Component } from '@angular/core';

import { ModalController, NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { ViewerModalComponent } from './viewer-modal/viewer-modal.component';
import { AdderService } from './service/adder';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  
  darkMode = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalController: ModalController,
    private navController: NavController,
    private storage: Storage,
    private adder: AdderService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  darcko()
  {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark');
    console.log(this.darkMode)
  }

  param()
  {
    this.navController.navigateRoot(['setting']);
  }

  synchroniser()
  {
    this.adder.synchroniseAll(1);
  }
  home()
  {
    this.storage.set('User', '');
    this.navController.navigateBack(['/login']);
    this.storage.set('Test', false);
    // this.tabService.user = {};
    // this.storage.set('chat', '0');
    // this.storage.set('User', '');
  }


  async openV()
  {
    const modal = await this.modalController.create({
      component: ViewerModalComponent,
      componentProps: {
        src: "../assets/Screenshot 2020-12-06 215201.png"
      },
      cssClass: 'ion-img-viewer',
      keyboardClose: true,
      showBackdrop: true
    });

    return await modal.present();
  }
}
