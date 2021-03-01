import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { User } from '../../interfaces/users';
import { AlertController } from '@ionic/angular';
import { Verif } from './Verif';


@Injectable()
export class IsAuth 
{
    users: Array<User> = [];
    tampUser: Array<User> = [];
    constructor(private storage: Storage,
                private router: Router,
                private verif: Verif,
                private alertController: AlertController)
    {

    }

    redirect(f)
    {
        this.storage.get('Users').then(val => {
            if (val)
            {
                this.users = val;
                this.redirection(f);
            }
            else
            {
                console.log('Pas d\'users ');
            }
        })
    }
    
    redirection(f)
    {
        
        this.tampUser = this.users.filter((cour) => {
            if (cour.matricule === f.matricule)
            {
                return cour;
            }
        });
        
        if (this.tampUser[0])
        {
            this.storage.set('User', this.tampUser[0]);
            this.verif.value = this.tampUser[0];
            this.verif.vari = f;
            this.storage.set('Test', true);
            this.verif.test = true;
            const statut = this.tampUser[0].statut;

            if (statut === 'admin')
            {
                this.router.navigate(['admin']);
                
            }

            else if (statut === 'sa')
            {
                this.router.navigate(['/sa/']);
            }

            else if (statut === 'enseignant')
            {
                this.router.navigate(['enseignant/']);
            }

            else if (statut === 'etudiant')
            {
                this.router.navigate(['etudiant/']);
            }
            else if (statut === 'secretaire')
            {
                this.router.navigate(['secretaire/']);
            }

        }
        else
        {
            this.alertController.create({
                header: 'Desole',
                message: 'Matricule incorrecte',
                buttons: ['Ok']
            }).then(alert => alert.present());
            console.log('Faux');
        }
    }
}