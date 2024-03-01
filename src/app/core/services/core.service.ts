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

  // ~~~~~~~~~~~~~~ //TODO - DASHBOARD ~~~~~~~~~~~~~~ //

  goToDashboard(){this.router.navigate(['/dashboard']);}

  // ~~~~~~~~~~~~~~~~ //TODO - ADMIN ~~~~~~~~~~~~~~~~ //

  goToProfile(){this.router.navigate(['/profil']);}
  goToAdmin(){this.router.navigate(['/admin/liste']);}
  goToAddAdmin(){this.router.navigate(['/admin/ajouter']);}
  goToEditAdmin(id: string){this.router.navigate(['/admin/modifier-un-administrateur', id]);}
  goToDisabledAccount(){this.router.navigate(['/admin/comptes-inactifs']);}
  goToLogin(){this.router.navigate(['/login']);}
  goToForgotPassowrd(){this.router.navigate(['/mot-de-passe-oublie']);}
  goToConfirmCodeSms(){this.router.navigate(['/confirmer-code-sms']);}
  goToResetPassword(){this.router.navigate(['/reinitialiser-mot-de-passe']);}

  // ~~~~~~~~~~~~~~~ //TODO - DONATION ~~~~~~~~~~~~~~ //

  goToDonationAnonymous(){this.router.navigate(['/Kofasante/add-pub']);}
  goToDonationNoAnonymousPerso(){this.router.navigate(['/Kofasante/publications']);}
  goToDonationNoAnonymousOrga(){this.router.navigate(['/Kofasante/utilisateurs']);}
  goToReportDonation(){this.router.navigate(['/Kofasante/analyse']);}
  goToBasketDonation(){this.router.navigate(['/Kofasante/corbeille-don']);}
  goToListDonationType(){this.router.navigate(['/Kofasante/type-don']);}
  goToListDisabledDonationType(){this.router.navigate(['/dons/type-don-inactif']);}
  goToAddDonationType(){this.router.navigate(['/Kofasante/ajouter-don']);}
  goToEditDonationType(id: number){this.router.navigate(['/Kofasante/modifier-type-don', id]);}

  // ~~~~~~~~~~~~ //TODO - MASS ~~~~~~~~~~~~ //

  goToMassList(){this.router.navigate(['/messes/liste']);}
  goToAddMass(){this.router.navigate(['/messes/ajouter-messes']);}

  goToEditMass(id: number){this.router.navigate(['/messes/modifier-messes', id]);}
  goToEditDiscount(id: number){this.router.navigate(['/modifier-promotion', id]);}

  goToAddMassTime(){this.router.navigate(['/messes/ajouter-heure-messe']);}
  goToMassTimeList(){this.router.navigate(['/liste-des-heures-de-messes']);}
  goToEditMassTime(id: number){this.router.navigate(['/modifier-heures-messes', id]);}
  goToNoAnonymousMassRequest(){this.router.navigate(['/demande-de-messe-non-anonyme']);}
  goToAnonymousMassRequest(){this.router.navigate(['/demande-de-messe-anonyme']);}
  goToBasketMass(){this.router.navigate(['/corbeille-messe']);}
  goToReportMass(){this.router.navigate(['/bilan-messe'])}
  gotToDiscount(){this.router.navigate(['/promotion'])};
  gotToDiscountList(){this.router.navigate(['/liste-promotion']);}

    // ~~~~~~~~~~~~~~~~~~~ // TODO  - demandes ~~~~~~~~~~~~~~~~ //
  goTodocuments(){this.router.navigate(['/demande/documents'])}
  goToVisites(){this.router.navigate(['/demande/visites'])}
  goToPrice(){this.router.navigate(['/demande/rapports'])}
  goToAnalysis(){this.router.navigate(['/demande/liste-rapp']);}
  goToMedecine(){this.router.navigate(['/demande/medecine'])}
  goToInformation(){this.router.navigate(['/demande/info'])}
  goToAbonnement(){this.router.navigate(['/demande/abonnement']);}
  goToFactures(){this.router.navigate(['/facture/liste-facture'])}
  goToPaiements(){this.router.navigate(['/facture/paiement'])}
    // ~~~~~~~~~~~~~~~~~~~ // TODO  - demandes ~~~~~~~~~~~~~~~~ //

  // ~~~~~~~~~~~~~~~~~~~ // TODO  - Pages ~~~~~~~~~~~~~~~~ //
  goToPageError(){this.router.navigate([('/erreur')]);}
  goToPageNotFound(){this.router.navigate(['/page-introuvable']);}
  goToLockedPage(){this.router.navigate(['/page-verrouillee']);}
}
