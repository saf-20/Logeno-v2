import { Component } from '@angular/core';
import { SelectionComponent } from '../../shared/selection/selection.component';
import { AlertController, ModalController } from '@ionic/angular';
import { AdderService } from '../../service/adder';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  plus =0;
  branch = {
    code: '',
    branchName: 'Selectionner la filiere'
  }
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  topic = {
    code: '',
    schoolYear: '',
    topicName: 'Selectionner la matiere'
  }

  teacher = {
    matricule: '',
    userName: 'Selectionner un professeur'
  }

  ens = 0;
  top = 0;
  bran = 0;

  branchs = [];
  topics = [];
  students = [];
  teachers = [];
  tampNonames = [];
  nonames = [];
  constructor(private adder: AdderService,
              private modal: ModalController,
              private storage: Storage,
              private alertController: AlertController) 
  {
    
    this.storage.get('Branchs').then(val => {
      if (val)
      {
        this.branchs = val;
      }
    });

    this.storage.get('Topics').then(val => {
      if (val)
      {
        this.topics = val;
      }
    });

    this.storage.get('Students').then(val => {
      if (val)
      {
        this.students = val;
      }
    });

    this.storage.get('Teachers').then(val => {
      if (val)
      {
        this.teachers = val;
      }
    });

    this.storage.get('NoNames').then(val => {
      if (val)
      {
        this.nonames = val;
      }
    });
  }

  async selectThing(f)
  {
    this.adder.plus2 = f;

    const modalContoller = await this.modal.create({
      component: SelectionComponent,
      cssClass: 'modal'
    });

    await modalContoller.present();
    const matricule = await modalContoller.onWillDismiss();
    if (matricule)
    {
      if (f === 2)
      {
        const mat = this.branchs.filter((cour) => {
          if (cour.code === matricule.data)
          {
            this.bran = 1;
            return cour;
          }
        });

        this.branch = mat[0];
      }
      else if (f === 3)
      {
        const mat = this.topics.filter((cour) => {
          if (cour.code === matricule.data)
          {
            this.top = 1;
            return cour;
          }
        });

        this.topic = mat[0];
      }  
      else if (f === 4)
      {
        const mat = this.teachers.filter((cour) => {
          if (cour.matricule === matricule.data)
          {
            this.ens = 1;
            return cour;
          }
        });

        this.teacher = mat[0];
      }
    }
  }


  change()
  {
      this.alertController.create({
        header: 'Confirmation',
        message: 'Voulez-vous annuler ces anonymats?',
        buttons: [
          {
            text: 'Non',
            role: 'Cancel'
          },
          {
            text: 'Oui',
            handler: () => {
            this.reset();
          }
        }]
      }).then(val => val.present());
  }

  saveNoname()
  {
    this.alertController.create({
      header: 'Confirmation',
      message: 'Voulez-vous enregistrer ces anonymats?',
      buttons: [
        {
          text: 'Non',
          role: 'Cancel'
        },
        {
          text: 'Oui',
          handler: () => {
            const temp = [];
            for(let tab of this.tampNonames)
            {              
              const nam = {
                code: tab.code,
                student: tab.student,
                exam: tab.exam,
                branch: tab.branch,
                topic: tab.topic,
                statue: false,
                schoolYear: this.topic.schoolYear,
                teacherCode: tab.teacherCode,
                docId: 0
              }

              temp.push(nam);
            }
            this.adder.addNoname(temp);
            this.reset();
          }
        }]
      }).then(val => val.present());
  }

  generer(f)
  {

    this.storage.get('NoNames').then(val => {
      if (val)
      {
        this.nonames = val;
        console.log(this.branch);
        console.log(f.value.exam);
        console.log(this.topic);
        const banc = this.nonames.filter((cour) => {
          console.log(cour);
          if (cour.branch === this.branch.code && cour.exam === f.value.exam && cour.topic === this.topic.code && cour.schoolYear === this.topic.schoolYear)
          {
            return cour;
          }
        });
    
        console.log(banc);
        if (banc[0])
        {
          this.alertController.create({
            header: 'Erreur!!!',
            message: 'Les ananonymats correspondant a ces criteres existent deja!',
            buttons: [
              {
                text: 'Ok',
                role: 'Cancel',
                handler: () =>{
                  f.reset();
                  this.reset();
                }
              }]
            }).then(val => val.present());
        }
        else
        {
          this.production(f);
        }
      }
      else
      {
        this.production(f);
      }
    });
  }

  production(f)
  {
    const p = f.value;
    this.plus = 1;
    const tampStudents = this.students.filter((cour) => {
      if (cour.branch === this.branch.code)
      {
        return cour;
      }
    });

    for(let tab of tampStudents)
    {
      let vab = '';
      if(p.exam === 'CC1')
      {
        vab = 'CONTROLE CONTINU 1';
      }
      else if(p.exam === 'CC2')
      {
        vab = 'CONTROLE CONTINU 2';
      }
      else if(p.exam === 'SN1')
      {
        vab = 'SESSION NORMALE 1';
      }
      else if(p.exam === 'SN2')
      {
        vab = 'SESSION NORMALE 2';
      }
      else if(p.exam === 'RR')
      {
        vab = 'RATTRAPPAGE';
      }

      const nam = {
        code: this.randString(2) + this.randInt(10)+ this.randString(1)+ this.randInt(10),
        student: tab.matricule,
        exam: p.exam,
        branch: this.branch.code,
        topic: this.topic.code,
        teacherCode: this.teacher.matricule,
        examName: vab,
        studentName: tab.studentName + ' ' + tab.surname,
        docId: 0
      }

      this.tampNonames.push(nam);
    }
    f.reset();
  }

  randInt(max)
  {
    return Math.floor(Math.random() * Math.floor(max))
  }

  randString(length)
  {
    let result = '';
    const charactersLength = this.characters.length;

    for (let i=0; i< length; i++)
    {
      result += this.characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    console.log(result);
    return result;
  }

  reset()
  {
    this.plus = 0;
    this.tampNonames = [];
    this.branch = {
      code: '',
      branchName: 'Selectionner la filiere'
    };

    this.topic = {
      code: '',
      schoolYear: '',
      topicName: 'Selectionner la matiere'
    }

    this.teacher = {
      matricule: '',
      userName: 'Selectionner un professeur'
    }

    this.top = 0;
    this.bran = 0;
    this.ens = 0;
  }
}
