import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string;
  email: string;
  password: string;
  confirmPassword: string;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService,
    private toastService: ToastService,
    public alert: AlertController) { }

  ngOnInit() {
  }

  signUp() {
    if (this.password !== this.confirmPassword) {
      this.showAlert('Erreur', 'Les mots de passe ne correpondent pas.');
      return;
    }

    this.authService.signUp(this.email, this.password)
      .then(async value => {
        this.userService.addUser({
          id: value.user.uid,
          username: this.username,
        });

        this.router.navigateByUrl('tabs');
        await this.toastService.presentToast('Bienvenue ' + this.username);

      })
      .catch(async (err) => await this.toastService.presentToast(`${err.message}`));
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

}