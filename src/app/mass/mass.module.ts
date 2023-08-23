import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMassComponent } from './add-mass/add-mass.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MassTableComponent } from './mass-table/mass-table.component';
import { MassListComponent } from './mass-list/mass-list.component';

// const disabledDonationTypeResolvers = {...{disabledDonationType: DisabledDonationTypeResolver}, ...GLOBAL_RESOLVERS};

const massRoutes: Routes = [
  {path: 'ajouter-messes', component: AddMassComponent},
  {path: 'liste', component: MassListComponent},
];

@NgModule({
  declarations: [
    AddMassComponent,
    MassTableComponent,
    MassListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(massRoutes) 
  ]
})
export class MassModule { }
