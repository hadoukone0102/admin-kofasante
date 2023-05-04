import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private router: Router){}

  goToDashboard(){
    this.router.navigate(['/dashboard']);
  }

  goToDonationAnonymous(){
    this.router.navigate(['/dons/anonyme']);
  }
  goToDonationNoAnonymousPerso(){
    this.router.navigate(['/dons/non-anonyme/personel']);
  }
  goToDonationNoAnonymousOrga(){
    this.router.navigate(['/dons/non-anonyme/organisation']);
  }

  goToProfile(){
    this.router.navigate(['/profile']);
  }

  goToAdmin(){
    this.router.navigate(['/admin/liste']);
  }

  goToAddAdmin(){
    this.router.navigate(['/admin/ajouter']);
  }

  goToLogin(){
    this.router.navigate(['/login']);
  } 

  goToForgotPassowrd(){
    this.router.navigate(['/mot-de-passe-oublie']);
  } 
  
  goToPageError(){
    this.router.navigate(['/erreur']);
  }

  goToPageNotFound(){
    this.router.navigate(['/page-introuvable']);
  } 
}
