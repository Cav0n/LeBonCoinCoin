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

  constructor(private router: Router, private authService: AuthenticationService,
    private toastService: ToastService) { }

  ngOnInit() {
  }

  logIn() {
    this.authService.logIn(this.email, this.password)
      .then(() => {
        this.router.navigateByUrl('tabs');
        this.toastService.presentToast('Welcome back !');
      })
      .catch(() => this.toastService.presentToast('Login and password do not match'));
  }

  redirectToRegisterPage() {
    console.log('redirecting to the registration page');
    this.router.navigateByUrl('register');
  }

}