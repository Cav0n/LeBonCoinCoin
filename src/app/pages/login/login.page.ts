import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(private router: Router, private authService: AuthenticationService, private toastService: ToastService ) { }

  ngOnInit() {
  }

  logIn() {
    this.authService.logIn(this.email, this.password)
      .then(() => {
        this.router.navigateByUrl('tabs');
        this.toastService.presentToast('Bienvenue de nouveau !');
      })
      .catch(() => this.toastService.presentToast('Le login et le mot de passe ne correspondent pas.'));
  }

  redirectToRegisterPage() {
    console.log('Redirection vers la page d\'inscription');
    this.router.navigateByUrl('register');
  }

}
