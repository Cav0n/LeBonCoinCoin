import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { auth } from 'firebase';

@Component({
  selector: 'app-compte',
  templateUrl: 'compte.page.html',
  styleUrls: ['compte.page.scss']
})
export class ComptePage {

  constructor(private authService: AuthenticationService) { 
    console.log(authService.isAuthenticated);
   }

}
