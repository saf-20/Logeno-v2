import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AdderService } from 'src/app/service/adder';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  plus = 0;

  teachers = [];
  branchs = [];
  topics = [];
  students = [];
  constructor(private storage: Storage,
              private adder: AdderService) 
  {
    this.storage.get('Teachers').then(val =>{
      if (val)
      {
        this.teachers = val;
      }
    });

    this.storage.get('Branchs').then(val =>{
      if (val)
      {
        this.branchs = val;
      }
    });

    this.storage.get('Topics').then(val =>{
      if (val)
      {
        this.topics = val;
      }
    });

    this.storage.get('Students').then(val =>{
      if (val)
      {
        this.students = val;
      }
    });

    
  }

  change(f)
  {
    this.plus = f;
  }

  drop(collection ,f)
  {
    console.log('Passer')
    this.adder.dropThing(collection, f);
  }
}
