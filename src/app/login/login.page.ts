import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/users';
import { IsAuth } from '../service/authentification/IsAuth';
import { Storage } from '@ionic/storage';
import { AdderService } from '../service/adder';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  users: Array<User> = [] ;
  user = {
    matricule: '',
    nom: '',
    pseudo: '',
    prenom: '',
    statut: '',
    password: '',
    dateModif: 0,
    indiceDoc: 0

  };
  constructor(private isAuth: IsAuth,
              private storage: Storage,
              private adder: AdderService) 
  { 
    this.storage.get('Users').then(val => {
      if (val)
      {
        this.users = val;
      }
    });
  }

  ngOnInit() {
  }

  connexion(p)
  {
    const f = p.value;

    if (this.users.length === 0)
    {
      this.adder.synchroniseAll(1);
      //  const tab = {matricule: f.matricule, userName: 'Alex Kabe', surname: 'Kabe', statut: 'admin', password: 'sa'}
      //  let userss = [];
      //  userss.push(tab);
      //  this.storage.set('Users', userss);
      this.isAuth.redirect(f);
      p.reset();
    }
    else
    {
      this.isAuth.redirect(f);
      p.reset();
    }
  }
}
