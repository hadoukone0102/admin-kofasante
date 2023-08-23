import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMassComponent } from './add-mass/add-mass.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

// const disabledDonationTypeResolvers = {...{disabledDonationType: DisabledDonationTypeResolver}, ...GLOBAL_RESOLVERS};

const massRoutes: Routes = [
  {path: 'ajouter-messes', component: AddMassComponent},
];

@NgModule({
  declarations: [
    AddMassComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(massRoutes) 
  ]
})
export class MassModule { }
