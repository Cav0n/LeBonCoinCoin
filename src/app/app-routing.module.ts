import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/services/guards/authentification.guard';
import { LoginGuard } from 'src/app/services/guards/login.guard';


const routes: Routes = [
  { path: '', canActivate: [AuthenticationGuard], loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'login', canActivate: [LoginGuard], loadChildren: './composants/login/login.module#LoginPageModule' },
  { path: 'register', canActivate: [LoginGuard], loadChildren: './composants/register/register.module#RegisterPageModule' },
  { path: 'register', loadChildren: './composants/register/register.module#RegisterPageModule' },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
