import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonationListComponent } from './donation-list/donation-list.component';
import { RouterModule, Routes } from '@angular/router';
import { PartialsModule } from '../partials/partials.module';
import { DonationTableComponent } from './donation-table/donation-table.component';

const donationRoutes: Routes = [
  {path: 'dons', component: DonationListComponent}, 
];


@NgModule({
  declarations: [
    DonationListComponent,
    DonationTableComponent
  ],
  imports: [
    CommonModule,
    PartialsModule,
    RouterModule.forChild(donationRoutes)  
  ]
})
export class DonationModule { }
