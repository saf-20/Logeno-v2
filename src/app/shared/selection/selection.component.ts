import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AdderService } from '../../service/adder';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss'],
})
export class SelectionComponent implements OnInit {


  etudiants = [];
  filieres = [];
  salles = [];
  users = [];
  valeurs = [];
  matieres = [];
  teachers = [];
  constructor(private etude: AdderService,
              private modal: ModalController,
              private storage: Storage)
  {
    if (this.etude.plus2 === 2)
    {
      this.storage.get('Branchs').then( vali => {
        if (vali)
          {
            this.filieres = vali;
            this.filieres.sort();
            this.init();
          }
        });
    }
    else if (this.etude.plus2 === 1)
    {
      this.storage.get('Students').then(val => {
        if (val)
        {
          this.etudiants = val;
          this.etudiants.sort();
          this.init();
        }
      });
    }
    else if (this.etude.plus2 === 3)
    {
      this.storage.get('Topics').then(val => {
        if (val)
        {
          this.matieres = val;
          this.matieres.sort();
          this.init();
        }
      });
    }
    else if (this.etude.plus2 === 4)
    {
      this.storage.get('Teachers').then(val => {
        if (val)
        {
          this.teachers = val;
          this.teachers.sort();
          this.init();
        }
      });
    }
    else if (this.etude.plus2 === 5)
    {
      this.storage.get('Users').then(val => {
        if (val)
        {
          this.users = val;
          this.users.sort();
          this.init();
        }
      });
    }

  }



  ngOnInit() {
  }

  async filter1(f)
  {
    this.init();
    const searchTerm = f.target.value;

    if (searchTerm && searchTerm.trim() !== '')
    {
      this.valeurs = this.valeurs.filter((cour) => {
          const nom = cour.studentName + '' + cour.surname;
          return (nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      });
    }
  }

  async filter2(f)
  {
    this.init();
    const searchTerm = f.target.value;

    if (searchTerm && searchTerm.trim() !== '')
    {
      this.valeurs = this.valeurs.filter((cour) => {
          return (cour.branchName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      });
    }
  }

  async filter3(f)
  {
    this.init();
    const searchTerm = f.target.value;

    if (searchTerm && searchTerm.trim() !== '')
    {
      this.valeurs = this.valeurs.filter((cour) => {
          return (cour.topicName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      });
    }
  }


  async filter5(f)
  {
    this.init();
    const searchTerm = f.target.value;

    if (searchTerm && searchTerm.trim() !== '')
    {
      this.valeurs = this.valeurs.filter((cour) => {
          const nom = cour.userName + '' + cour.surname;
          return (nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      });
    }
  }

  async filter4(f)
  {
    this.init();
    const searchTerm = f.target.value;

    if (searchTerm && searchTerm.trim() !== '')
    {
      this.valeurs = this.valeurs.filter((cour) => {
          const nom = cour.teacherName + '' + cour.surname;
          return (nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      });
    }
  }

  init()
  {
    if (this.etude.plus2 === 1)
    {
      this.valeurs = this.etudiants;
    }
    else if (this.etude.plus2 === 2)
    {
      this.valeurs = this.filieres;
    }
    else if (this.etude.plus2 === 3)
    {
      this.valeurs = this.matieres;
    }
    else if (this.etude.plus2 === 4)
    {
      this.valeurs = this.teachers;
    }
    else if (this.etude.plus2 === 5)
    {
      this.valeurs = this.users;
    }

  }

  selectNote(f)
  {
    this.modal.dismiss(f);
  }
}
