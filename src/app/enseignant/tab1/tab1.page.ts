import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AdderService } from '../../service/adder';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  user = {
    matricule: ''
  };

  plus = 0;
  codeFil = '';
  fil = '';
  tops = '';
  branchs = [];
  noNames = [];
  topics = [];
  tampNames = [];
  tampTopics = [];
  viewer = [];
  viewNotes = [];
  constructor(private storage: Storage,
              private alertController: AlertController,
              private adder: AdderService) 
  {
    this.storage.get('User').then(val => {
      if (val)
      {
        this.user = val;
      }
    });

    this.storage.get('Topics').then(val => {
      if (val)
      {
        this.topics = val;
      }
    });

    this.storage.get('Branchs').then(val => {
      if (val)
      {
        this.branchs = val;
      }
    });

    this.storage.get('NoNames').then(val => {
      if (val)
      {
        this.noNames = val;
        this.filtre();
      }
    });
  }

  filtre()
  {
    this.tampNames = this.noNames.filter((cour) => {
      if (cour.teacherCode === this.user.matricule)
      {
        return cour;
      }
    });

    let test = '';
    this.tampNames.filter((cour) => {
      if (cour.topic !== test)
      {
        test = cour.topic;
        const vas = this.topics.filter((con) => {
          if (con.code === cour.topic)
          {
            return con;
          }
        });

        this.tampTopics.push(vas[0])
      }
    });
  }

  open(f)
  {
    this.codeFil = f;
    this.viewer = this.tampNames.filter((cour) => {
      if (cour.topic === f.code)
      {
        this.tops = f.topicName;
        const tab = this.branchs.filter((tol) => {
          if (tol.code === cour.branch)
          {
            return tol;
          }
        });

        this.fil = tab[0].branchName;
        return cour;
      }
    });
    this.change(1);
  }

  change(f)
  {
    this.plus = f;
    if (f === 0)
    {      
      this.fil = '';
      this.tops = '';
      this.codeFil = '';
      this.viewNotes = [];
      this.tampNames = [];
    }

  }

  addNote(f, g)
  {
    let a = 0, b = 0, mam;
    for (let cod of this.viewer)
    {
      if (cod.code === g)
      {
        mam = cod;
        b= a;
      }
      a++;
    }
    
    const note = {
      code: g,
      note: f.value.note,
      branch: mam.branch,
      docId: 0,
      exam: mam.exam,
      schoolYear: mam.schoolYear,
      statut: true,
      teacher: mam.teacherCode,
      student: mam.student,
      topic: mam.topic
    }

    this.viewer.splice(b, 1);
    this.viewNotes.push(note);
    f.reset();
  }


  saveNotes()
  {
    this.alertController.create({
      header: 'Confirmation',
      message: 'Voulez vous enregistrer ces notes?',
      buttons: [
        {
          text: 'Non',
          role: 'Cancel',
          handler: () =>{}
        },
        {
          text: 'Oui',
          handler: () =>{
            this.tampTopics = this.tampTopics.filter((cour) => {
              if (cour.code === this.codeFil)
              {
                return cour;
              }
            });
            // this.adder.saveNote(this.viewNotes)
            for (let bag of this.viewNotes)
            {
              console.log(bag)
              this.dropNoname(bag);
            }
            this.adder.addNoname(this.noNames);
            console.log(this.noNames)
            this.change(0);
            this.filtre();
          }
        }
      ]
      }).then(val => val.present());
  }

  dropNoname(f)
  {
    let test = false, a = 0 , b = 0;
    for (let bat of this.noNames)
    {
      if (f.code === bat.code)
      {
        b = a;
        test = true;
      }
      a++;
    }

    if (test)
    {
      
      console.log(this.noNames)
      console.log('Voici mon tampon')
      this.noNames.splice(b, 1);
      console.log(this.noNames)
    }
  }
}
