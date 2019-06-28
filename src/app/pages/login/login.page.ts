import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { load } from '@angular/core/src/render3';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(private router: Router, private authService: AuthenticationService,
              private toastService: ToastService, public loadingController: LoadingController ) { }

  ngOnInit() {
  }

  async logIn() {
    const loading = await this.loadingController.create({
      message: 'Connexion',
    });
    loading.present();
    this.authService.logIn(this.email, this.password)
      .then(() => {
        loading.dismiss();
        this.router.navigateByUrl('tabs');
        this.toastService.presentToast('Bienvenue de nouveau !');
      })
      .catch(() => {
        loading.dismiss();
        this.toastService.presentToast('Le login et le mot de passe ne correspondent pas.'); });
  }

  redirectToRegisterPage() {
    this.router.navigateByUrl('register');
  }
}
