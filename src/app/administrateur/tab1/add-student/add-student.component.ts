import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdderService } from '../../../service/adder';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent implements OnInit {

  teachers = [];
  branchs = [];
  constructor(private modal: ModalController,
              private adder: AdderService,
              private storage: Storage) 
  { 
    console.log(adder.test);
    this.storage.get('Teachers').then(val => {
      if (val)
      {
        this.teachers = val;
      }
    });

    this.storage.get('Branchs').then(val => {
      if (val)
      {
        this.branchs = val;
      }
    });
  }

  ngOnInit() {}

  submit(f)
  {
    f = f.value;

    this.adder.addThing(f);
    this.modal.dismiss();
  }
}
