import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMassComponent } from './add-mass/add-mass.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MassTableComponent } from './mass-table/mass-table.component';
import { MassListComponent } from './mass-list/mass-list.component';
import { EditMassComponent } from './edit-mass/edit-mass.component';
import { AddMassTimeComponent } from './add-mass-time/add-mass-time.component';
import { MassTimeFormComponent } from './mass-time-form/mass-time-form.component';

// const disabledDonationTypeResolvers = {...{disabledDonationType: DisabledDonationTypeResolver}, ...GLOBAL_RESOLVERS};

const massRoutes: Routes = [
  {path: 'liste', component: MassListComponent},
  {path: 'ajouter-messes', component: AddMassComponent},
  {path: 'modifier-messes', component: EditMassComponent},
  {path: 'ajouter-heure-messe', component: AddMassTimeComponent},
];

@NgModule({
  declarations: [
    AddMassComponent,
    MassTableComponent,
    MassListComponent,
    EditMassComponent,
    AddMassTimeComponent,
    MassTimeFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(massRoutes) 
  ]
})
export class MassModule { }
