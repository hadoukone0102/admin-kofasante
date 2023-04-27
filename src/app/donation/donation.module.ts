import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonationListComponent } from './components/donation-list/donation-list.component';
import { RouterModule, Routes } from '@angular/router';
import { DonationTableComponent } from './components/donation-table/donation-table.component';
import { SharedModule } from '../shared/shared.module';

const donationRoutes: Routes = [
  {path: 'dons/liste', component: DonationListComponent}, 
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
  ]
})
export class DonationModule { }
