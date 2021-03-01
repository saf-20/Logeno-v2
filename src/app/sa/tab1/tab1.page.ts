import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  tampNotes
  constructor(private storage: Storage) 
  {
    this.storage.get('TampNotes').then(val => {
      if (val)
      {
        this.tampNotes = val;
      }
    });
  }

}
