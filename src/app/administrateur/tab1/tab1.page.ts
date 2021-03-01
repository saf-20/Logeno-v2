import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdderService } from '../../service/adder';
import { AddStudentComponent } from './add-student/add-student.component';
import { AddYearComponent } from './add-year/add-year.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private modal: ModalController,
              private adder: AdderService) {}

  addYear()
  {
    this.modal.create({
      component: AddYearComponent,
      cssClass: 'addYear'
    }).then(val => val.present());
  }

  addStudent()
  {
    this.adder.test = 1;
    this.modal.create({
      component: AddStudentComponent,
      cssClass: 'addStudent'
    }).then(val => val.present());
  }

  addBranch()
  {
    this.adder.test = 2;
    this.modal.create({
      component: AddStudentComponent,
      cssClass: 'addStudent'
    }).then(val => val.present());
  }

  addTopic()
  {
    this.adder.test = 3;
    this.modal.create({
      component: AddStudentComponent,
      cssClass: 'addStudent'
    }).then(val => val.present());
  }

  addUser()
  {
    this.adder.test = 4;
    this.modal.create({
      component: AddStudentComponent,
      cssClass: 'addStudent'
    }).then(val => val.present());
  }
}
