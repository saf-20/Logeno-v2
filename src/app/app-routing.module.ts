import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './service/authentification/AuthGuard';

const routes: Routes = [
  {
    path: 'etudiant',
    canActivate: [AuthGuard],
    loadChildren: () => import('./etudiant/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'enseignant',
    canActivate: [AuthGuard],
    loadChildren: () => import('./enseignant/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'sa',
    canActivate: [AuthGuard],
    loadChildren: () => import('./sa/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./administrateur/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'secretaire',
    canActivate: [AuthGuard],
    loadChildren: () => import('./secretaire/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./shared/setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
