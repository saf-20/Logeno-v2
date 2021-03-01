import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AdderService } from '../../../service/adder';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  tampNotes = [];
  constructor(private modal: ModalController,
              private adder: AdderService,
              private alertController: AlertController) 
  { 
    this.tampNotes = this.adder.lookNotes;
  }

  ngOnInit() {}

  back1(f)
  {
    this.modal.dismiss({base: f});
  }

  back()
  {
    this.modal.dismiss()
  }

  dismiss()
  {
    this.alertController.create({
      header: 'Confirmation',
      subHeader: 'Voulez-vous annuler ces notes?',
      message: 'Vous devez notifier l\'enseignant concerne apres cela!',
      buttons: [
        {
          text: 'Non',
          role: 'Cancel',
          handler: () => {}
        },
        {
          text: 'Oui',
          handler: () => {
            this.adder.dropNote();
            this.back();
          }
        }
      ] 
    }).then(val => val.present());
  }

  saveNotes()
  {
    this.alertController.create({
      header: 'Confirmation',
      subHeader: 'Voulez-vous valider ces notes?',
      message: 'Ce sont les notes que verront les etudiants',
      buttons: [
        {
          text: 'Non',
          role: 'Cancel',
          handler: () => {}
        },
        {
          text: 'Oui',
          handler: () => {
            this.back1(this.adder.lookNotes);
            this.adder.lookNotes = [];
          }
        }
      ] 
    }).then(val => val.present());
  }
}
