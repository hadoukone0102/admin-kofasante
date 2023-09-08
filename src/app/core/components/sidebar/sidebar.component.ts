import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../services/core.service';
import { AuthService } from 'src/app/admin/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit{
  adminFirstName!: string|null;
  adminLastName!: string|null;
  adminType!: string|null;

  rolesForDonation!: string[];
  rolesForAdmin!: string[];
  
  constructor(
    private coreService: CoreService,
    private authService: AuthService
    ){}

  ngOnInit(): void {
    this.adminFirstName = sessionStorage.getItem('firstName');
    this.adminLastName = sessionStorage.getItem('lastName');
    this.adminType = sessionStorage.getItem('type');
    //roles initialization
    this.rolesForDonation = environment.allRoles_Without_HeadOfCatechesis
    this.rolesForAdmin = environment.superAdmins;
  }

  /**
   * Returns true if the connected administrator is authorized to access the donations
   * @date 5/17/2023 - 4:11:45 PM
   *
   * @returns {boolean}
   */
  isAuthorizedForDonation(): boolean{
    if(this.rolesForDonation.includes(this.adminType ?? '')){
      return true;
    }
    return false;
  }
  
  /**
   * Returns true if the connected administrator is authorized to access the admin menu
   * @date 5/17/2023 - 4:10:47 PM
   *
   * @returns {boolean}
   */
  isAuthorizedForAdmin(){
    if(this.rolesForAdmin.includes(this.adminType ?? '')){
      return true;
    }
    return false;
  }

  // ====================================================== //
  // ======================= ROUTES ======================= //
  // ====================================================== //

  goToDashboard(){this.coreService.goToDashboard();}
  goToDonationNoAnonymousPerso(){this.coreService.goToDonationNoAnonymousPerso();}

  // ~~~~~~~~~~ //TODO - Donation ~~~~~~~~~~ //

  goToDonationAnonymous(){this.coreService.goToDonationAnonymous();}
  goToDonationNoAnonymousOrga(){this.coreService.goToDonationNoAnonymousOrga();}
  goToReportDonation(){this.coreService.goToReportDonation()}
  goToListDonationType(){this.coreService.goToListDonationType();}
  goToListDisabledDonationType(){this.coreService.goToListDisabledDonationType();}
  goToAddDonationType(){this.coreService.goToAddDonationType();}
  goToBasketDonation(){this.coreService.goToBasketDonation()}

  // ~~~~~~~~~~~~ //TODO - Admin ~~~~~~~~~~~ //

  goToProfile(){this.coreService.goToProfile();}
  goToAdmin(){this.coreService.goToAdmin();}
  goToDisabledAccount(){this.coreService.goToDisabledAccount();}
  goToAddAdmin(){this.coreService.goToAddAdmin();}
  goToLogin(){this.coreService.goToLogin();}
  logout(){
    if(confirm("Etes Vous sûr de vouloir vous déconnecter ?"))
      this.authService.logout();
  }

  // ~~~~~~~~~~~~ //TODO - Mass ~~~~~~~~~~~~ //

  goToAddMass(){this.coreService.goToAddMass();}
  goToMassList(){this.coreService.goToMassList();}
  goToAddMassTime(){this.coreService.goToAddMassTime();}
  goToMassTimeList(){this.coreService.goToMassTimeList();}
  goToNoAnonymousMassRequest(){this.coreService.goToNoAnonymousMassRequest();}
  


}
