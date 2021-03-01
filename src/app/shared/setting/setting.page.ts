import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AdderService } from 'src/app/service/adder';
import { ViewerModalComponent } from '../../viewer-modal/viewer-modal.component';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  user = {
    userName: 'Kabe Kabe',
    surname: 'Alex',
    matricule: 'aa',
    statut: 'administrateur',
    password: 'bb',
    mail: ''
  };
  notification = 0;
  users = [];
  constructor(private tabService: AdderService,
              private storage: Storage,
              private alertController: AlertController,
              private navController: NavController,
              private modalController: ModalController)
  {
  }

  ngOnInit() {
    this.storage.get('User').then(val => {
      this.user = val;
    });

    this.storage.get('Users').then(val => {
      this.users = val;
    });


  }

  async onSubmit(f)
  {
    const alert = await this.alertController.create({
      message: 'Voulez vous modifier vos informations?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          handler: () => { }
        },
        {
          text: 'Oui',
          handler: () => {

            if (f.value.password !== f.value.confirmation)
            {
              this.alertController.create({
                message: 'Mot de passe differents'
              }).then(alerte => alerte.present());
            }
            else if (f.value.mail)
            {
              for (const use of this.users)
              {
                if (use.matricule === this.user.matricule)
                {
                  use.password = f.value.password;
                  this.user.password = f.value.password;
                  this.storage.set('User', this.user);
                  this.tabService.users = this.users;
                  this.storage.set('Users', this.users);

                  console.log('Reussit');
                }
              }

            }
          }
        },
      ]
    });
    alert.present();
  }

  async openView()
  {
    console.log('passage')
    const modal = await this.modalController.create({
      component: ViewerModalComponent,
      componentProps: {
        src: "../assets/Screenshot 2020-12-06 215201.png"
      },
      cssClass: 'ion-img-viewer',
      keyboardClose: true,
      showBackdrop: true
    });

    return await modal.present();
  }


  view()
  {
    this.alertController.create({
      header: this.user.userName + ' ' + this.user.surname,
      message: '<img src="../../../../assets//paper_638287.jpg" />'
    }).then(alerte =>  alerte.present());
  }

  back()
  {
    console.log(this.user.statut);
    if (this.user.statut === 'sa')
    {
      this.navController.navigateBack(['sa']);
    }
    else if (this.user.statut === 'recteur')
    {
      this.navController.navigateBack(['recteur']);
    }
    else if (this.user.statut === 'enseignant')
    {
      this.navController.navigateBack(['enseignant']);
    }
    else if (this.user.statut === 'admin')
    {
      this.navController.navigateBack(['admin']);
    }
    else if (this.user.statut === 'etudiant')
    {
      this.navController.navigateBack(['etudiant']);
    }
    else if (this.user.statut === 'personnel')
    {
      this.navController.navigateBack(['personnel']);

    }
    else
    {
      this.navController.navigateBack(['login']);
      this.storage.set('User', '');
    }
  }



}