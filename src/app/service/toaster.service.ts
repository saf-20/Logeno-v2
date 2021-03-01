import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastCtrl: ToastController) { }

  async ToastWithOptions(header = '', message = '', position, options) {
    const toast = await this.toastCtrl.create({
      header,
      message,
      position: options.position ? options.position : position,
      color: options.color ? options.color : 'black',
      duration: options.duration ? options.duration : 1500,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    toast.present();
  }
}
