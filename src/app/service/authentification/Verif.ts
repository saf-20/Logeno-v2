import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { User } from '../../interfaces/users';

@Injectable()
export class Verif{

    test: boolean;
    vari = {
        matricule: '',
        name: '',
        surname: '',
        statut: '',
        password: '',
        docId: 0
    
    };
    value = {
        matricule: '',
        name: '',
        surname: '',
        statut: '',
        password: '',
        docId: 0    
    };
    
    constructor(private alertController: AlertController,
                private storage: Storage )
    {
    }

    verifUser()
    {
        let tab;
        tab = this.verifieur;
        return tab;
    }

    verifieur()
    {
        this.storage.get('Test').then(val => {
            if(val)
            {
                this.test = val;
                if (this.test)
                {
                    console.log(val);
                    let selectId = this.vari;
                    if (selectId.matricule === this.value.matricule)
                    {
                        if (selectId.password === this.value.password)
                        {
                            return true;
                        }
                        else
                        {
                            this.alertController.create({
                                header: 'Desole',
                                message: 'Mot de passe incorecte',
                                buttons: ['Ok']
                            }).then(alert => alert.present());
                            return false;
                        }
                    }
                }
            }
        });
    }
}
