import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DataDonationInfo } from '../../models/donationInfo.model';
import { ActivatedRoute } from '@angular/router';
import { DataAdminInfo } from '../../models/admin-info.model';
import { style, transition, trigger,animate } from '@angular/animations';
import { zoomEnterAnimation } from 'src/app/core/animations/animations';
import { environment } from 'src/environments/environment';
import { CoreService } from 'src/app/core/services/core.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  animations:[
    zoomEnterAnimation
  ]
})
export class DashboardComponent implements OnInit{
  donationInfo$!: Observable<DataDonationInfo>;
  donationInfo!: DataDonationInfo;

  adminInfo$!: Observable<DataAdminInfo>;
  adminInfo!: DataAdminInfo;



  adminType!: string|null;

  rolesForDonation!: string[];
  rolesForAdmin!: string[];
  allRight!:string[];

  constructor(
    private route: ActivatedRoute, private coreService: CoreService,
  ) { }

  ngOnInit(): void {
    // this.donationInfo$ = this.route.data.pipe(
    //   map(data => data['dashboard']),
    // );

    //this.donationInfo$.subscribe((data) => this.donationInfo = data);

    // this.adminInfo$ = this.route.data.pipe(
    //   map(data => data['adminInfo']),
    // );

    //this.adminInfo$.subscribe((data) => this.adminInfo = data);


    this.adminType = sessionStorage.getItem('type');
    //roles initialization
    this.rolesForDonation = environment.allRolesMediaKofa
    this.rolesForAdmin = environment.super;
    this.allRight = environment.allRight;
  }

  /**
   * Returns true if the connected administrator is authorized to access the donations
   * @date 5/17/2023 - 4:11:45 PM
   *
   * @returns {boolean}
   */
  isAuthorizedForFirstGroup(): boolean{
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

  isAuthorizedForSecretaire(){
    if(this.allRight.includes(this.adminType ?? '')){
      return true;
    }
    return false;
  }

  // routes

  goToReportDonation(){ this.coreService.goToReportDonation();}
  goToAdmin(){ this.coreService.goToAdmin();}
  goToReportMass(){this.coreService.goToReportMass();}

}
