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
import { ListAnonymousComponent } from './components/list-anonymous/list-anonymous.component';
import { ListNoAnonymousPersoComponent } from './components/list-no-anonymous-perso/list-no-anonymous-perso.component';
import { ListNoAnonymousOrgaComponent } from './components/list-no-anonymous-orga/list-no-anonymous-orga.component';
import { ListAnonymousResolver } from './resolvers/list-anonymous.resolver';
import { ListNoAnonymousPersoResolver } from './resolvers/list-no-anonymous-perso.resolver';
import { ListNoAnonymousOrgaResolver } from './resolvers/list-no-anonymous-orga.resolver';

const donationRoutes: Routes = [
  {path: 'liste', component: DonationListComponent, resolve: { 
    donations: DonationsResolver, 
    donationNoAnonymousPerso: DonationNoAnonymousPersoResolver,
    donationNoAnonymousOrga: DonationNoAnonymousOrgaResolver
  }}, 
  {path: 'anonyme', component: ListAnonymousComponent, resolve:{ listAnonymous: ListAnonymousResolver}},
  {path: 'non-anonyme/personel', component: ListNoAnonymousPersoComponent},
  {path: 'non-anonyme/organisation', component: ListNoAnonymousOrgaComponent},
];


@NgModule({
  declarations: [
    DonationListComponent,
    ListAnonymousComponent,
    ListNoAnonymousPersoComponent,
    ListNoAnonymousOrgaComponent,
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
    DonationNoAnonymousOrgaResolver,
    ListAnonymousResolver,
    ListNoAnonymousPersoResolver,
    ListNoAnonymousOrgaResolver
  ]
})
export class DonationModule { }
