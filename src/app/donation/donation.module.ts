import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonationListComponent } from './components/donation-list/donation-list.component';
import { RouterModule, Routes } from '@angular/router';
import { DonationTableComponent } from './components/donation-table/donation-table.component';
import { SharedModule } from '../shared/shared.module';
import { DonationService } from './services/donation.service';
import { DonationsResolver } from './resolvers/donations.resolver';
import { DonationNoAnonymousPersoResolver } from './resolvers/donation-no-anonymous-perso.resolver';
import { DonationNoAnonymousOrgaResolver } from './resolvers/donation-no-anonymous-orga.resolver';

const donationRoutes: Routes = [
  {path: 'liste', component: DonationListComponent, resolve: { 
    donations: DonationsResolver, 
    donationNoAnonymousPerso: DonationNoAnonymousPersoResolver,
    donationNoAnonymousOrga: DonationNoAnonymousOrgaResolver
  }}, 
];


@NgModule({
  declarations: [
    DonationListComponent,
    DonationTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(donationRoutes)  
  ],
  providers:[
    DonationService, //Est en lazy load, sera chargé que si le module don est chargé
    DonationsResolver,
    DonationNoAnonymousPersoResolver,
    DonationNoAnonymousOrgaResolver
  ]
})
export class DonationModule { }
