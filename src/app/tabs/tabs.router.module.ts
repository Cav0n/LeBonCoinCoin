import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'accueilPage',
        children: [
          {
            path: '',
            loadChildren: '../accueil/accueil.module#AccueilPageModule'
          }
        ]
      },
      {
        path: 'favoris',
        children: [
          {
            path: '',
            loadChildren: '../favoris/favoris.module#FavorisPageModule'
          }
        ]
      },
      {
        path: 'compte',
        children: [
          {
            path: '',
            loadChildren: '../compte/compte.module#ComptePageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/accueilPage',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/accueilPage',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
