import { SelectionComponent } from '../../shared/selection/selection.component';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';import { AdderService } from '../../service/adder';
import { PdfService } from '../../service/pdf';
;


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {


  plus = 0;
  student = {
    matricule: '18BGIN006',
    studentName: 'NDOUGABKA KABE',
    suname: 'Alex',
    birthDate: '15 Août 2001',
    place: 'Pala',
    cycle: 'BTS ',
    branch: 'GENIE INFORMATIQUE',
    schoolYear: '2018-2019',
    level: 'I',
    option: 'GENIE LOGICIEL '
  }

  students = [];
  years = [];
  constructor(private modal: ModalController,
              private adder: AdderService,
              private storage: Storage,
              private pdf: PdfService) 
  {
    this.storage.get('Students').then(val => {
      if (val)
      {
        this.students = val;
      }
    });

    this.storage.get('Years').then(val => {
      if (val)
      {
        this.years = val;
      }
    });
  }

  async selectStudent()
  {
    this.adder.plus2 = 1;
    const valle = await this.modal.create({
      component: SelectionComponent,
      cssClass: 'addStudent'
    });

    await valle.present();

    const student = valle.onWillDismiss();
    if ((await student).data)
    {
      const tab = (await student).data;
      console.log((await student).data);
      const vab = this.students.filter((cour) => {
        if (cour.matricule === tab)
        {
          return cour;
        }
      });

      this.student = vab[0];
      this.plus = 1
    }
  }

  // cette methode est a modifier
  consulter(f)
  {
    const p = f.value;
    this.pdf.formatData(this.student.schoolYear, this.student);
    this.plus = 0;
    f.reset();
  }
  
}
