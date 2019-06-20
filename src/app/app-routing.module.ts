import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/services/guards/authentification.guard';
import { LoginGuard } from 'src/app/services/guards/login.guard';


const routes: Routes = [
  { path: '', canActivate: [AuthenticationGuard], loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'login', canActivate: [LoginGuard], loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', canActivate: [LoginGuard], loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'article/:id', canActivate: [AuthenticationGuard], loadChildren: './pages/article/article.module#ArticlePageModule' },
  { path: 'new-article', canActivate: [AuthenticationGuard],  loadChildren: './pages/new-article/new-article.module#NewArticlePageModule' },

  // { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  // { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  // { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  // { path: 'article/:id', loadChildren: './pages/article/article.module#ArticlePageModule' },
  // { path: 'new-article', loadChildren: './pages/new-article/new-article.module#NewArticlePageModule' },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
