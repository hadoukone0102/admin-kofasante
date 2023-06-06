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
      sessionStorage.clear();//Empty the session storage
      this.goToLogin();//redirect to login if session expired
      return throwError('Une erreur est survenue la récupération des données: '+ error);
    }
    else if(error.status === 404){
      this.goToPageNotFound();
      return throwError('Page introvalble: '+ error);
    }
    
    this.goToPageError();//else redirect to page error
    return throwError('Une erreur est survenue la récupération des données: '+ error);
  }


  // ====================================================== //
  // ================== //ANCHOR - ROUTES ================= //
  // ====================================================== //

  // ~~~~~~~~~~~~~~ Dashboard ~~~~~~~~~~~~~~ //
  goToDashboard(){
    this.router.navigate(['/dashboard']);
  }

  // ~~~~~~~~~~~~~~~~ Admin ~~~~~~~~~~~~~~~~ //
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

  // ~~~~~~~~~~~~~~~ Donation ~~~~~~~~~~~~~~ //
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
 
  goToListDonationType(){
    this.router.navigate(['/dons/type-don']);
  }
  
  goToListDisabledDonationType(){
    this.router.navigate(['/dons/type-don-inactif']);
  }
  
  goToAddDonationType(){
    this.router.navigate(['/dons/ajouter-don']);
  }
  
  goToEditDonationType(id: number){
    this.router.navigate(['/dons/modifier-don', id]);
  }
  
  goToBasketDonation(){
    this.router.navigate(['/dons/corbeille-don']);
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
