import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private router: Router){}

  // ====================================================== //
  // ================== //ANCHOR - ERRORS ================= //
  // ====================================================== //

  handleError(error: any) {
    if(error.status === 401){
      this.goToLogin();//redirect to login if session expired
      return throwError('Une erreur est survenue la récupération des données: '+ error);
    }
    this.goToPageError();//else redirect to page error
    return throwError('Une erreur est survenue la récupération des données: '+ error);
  }


  // ====================================================== //
  // ================== //ANCHOR - ROUTES ================= //
  // ====================================================== //

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
  
  goToBasketDonation(){
    this.router.navigate(['/dons/Corbeille-don']);
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
  
  goToEditAdmin(id: string){
    this.router.navigate(['/admin/modifier-un-administrateur', id]);
  }
  
  goToDisabledAccount(){
    this.router.navigate(['/admin/comptes-inactifs']);
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
  
  goToLockedPage(){
    this.router.navigate(['/page-verrouillee']);
  } 
}
