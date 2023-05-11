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

  goToReportDonation(){
    this.router.navigate(['/dons/bilan-don']);
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
  
  goToEditAdmin(id: number){
    this.router.navigate(['/modifier-un-administrateur', id]);
  }
  
  goToDisabledAccount(){
    this.router.navigate(['/comptes-inatifs']);
  }

  goToLogin(){
    this.router.navigate(['/login']);
  } 

  goToForgotPassowrd(){
    this.router.navigate(['/mot-de-passe-oublie']);
  } 
  
  goToConfirmCodeSms(){
    this.router.navigate(['/confirmer-code-sms']);
  } 
  
  goToResetPassword(){
    this.router.navigate(['/reinitialiser-mot-de-passe']);
  } 
  
  goToPageError(){
    this.router.navigate(['/erreur']);
  }

  goToPageNotFound(){
    this.router.navigate(['/page-introuvable']);
  } 
}
