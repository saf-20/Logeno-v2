import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IsAuth } from './service/authentification/IsAuth';

import { IonicStorageModule } from '@ionic/storage';
import { Verif } from './service/authentification/Verif';
import { AuthGuard } from './service/authentification/AuthGuard';
import { AdderService } from './service/adder';
import { SelectionComponent } from './shared/selection/selection.component';
import { PdfService } from './service/pdf';
import { Synch } from './service/synchronisation';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { ToasterService } from './service/toaster.service';
import { SettingPage } from './shared/setting/setting.page';

const firebaseConfig = {
  apiKey: "AIzaSyC3viohlj3O17z2zHFE6JNv5Nv0ifP3oeg",
  authDomain: "logenov2.firebaseapp.com",
  projectId: "logenov2",
  storageBucket: "logenov2.appspot.com",
  messagingSenderId: "98187680603",
  appId: "1:98187680603:web:41c50812b2967c361d987e",
  measurementId: "G-LSN2RSYVFC"
};




@NgModule({
  declarations: [AppComponent, SelectionComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage

    NgxIonicImageViewerModule,

    AppRoutingModule],
  providers: [
    StatusBar,
    ModalController,
    IsAuth,
    Verif,
    AdderService,
    PdfService,
    AuthGuard,
    ToasterService,
    Synch,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
