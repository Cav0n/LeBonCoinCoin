import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from 'src/model/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string;
  mail: string;
  ville: string;
  age: number;
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

    if (this.username == null) {
        this.showAlert('Attention', 'Le pseudo ne peut pas être vide.');
    }
    if (this.mail == null) {
      this.showAlert('Attention', 'L\'email ne peut pas être vide.');
    }
    if (this.password == null) {
      this.showAlert('Attention', 'Le mot de passe ne peut pas être vide.');
    }

    this.authService.signUp(this.mail, this.password)
      .then(async value => {
        this.userService.addUser({
          id: value.user.uid,
          username: this.username,
          ville: this.ville,
          age: this.age,
          mail: this.mail
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
