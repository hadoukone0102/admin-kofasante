import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMassComponent } from './components/add-mass/add-mass.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MassTableComponent } from './components/mass-table/mass-table.component';
import { MassListComponent } from './components/mass-list/mass-list.component';
import { EditMassComponent } from './components/edit-mass/edit-mass.component';
import { AddMassTimeComponent } from './components/add-mass-time/add-mass-time.component';
import { MassTimeFormComponent } from './components/mass-time-form/mass-time-form.component';
import { MassTimeListComponent } from './components/mass-time-list/mass-time-list.component';
import { EditMassTimeComponent } from './components/edit-mass-time/edit-mass-time.component';
import { MassRequestTableComponent } from './components/mass-request-table/mass-request-table.component';
import { AnonymousMassRequestListComponent } from './components/anonymous-mass-request-list/anonymous-mass-request-list.component';
import { NoAnonymousMassRequestListComponent } from './components/no-anonymous-mass-request-list/no-anonymous-mass-request-list.component';
import { MassTimeListResolver } from './resolvers/mass-time-list.resolver';
import { MassListResolver } from './resolvers/mass-list.resolver';
import { MassDayById } from './resolvers/mass-by-id.resolver';

const listMassTimeResolver = {listMassTimeResolver: MassTimeListResolver};
const listMassResolvers = {listMassResolvers: MassListResolver};
const massDayByIdResolvers = {massDayByIdResolvers: MassDayById, listMassTimeResolver: MassTimeListResolver};

const massRoutes: Routes = [
  {path: 'liste', component: MassListComponent, resolve: listMassResolvers},
  {path: 'ajouter-messes', component: AddMassComponent, resolve: listMassTimeResolver},
  {path: 'modifier-messes/:id', component: EditMassComponent, resolve: massDayByIdResolvers},
  {path: 'ajouter-heure-messe', component: AddMassTimeComponent},
  {path: 'liste-des-heures-de-messes', component: MassTimeListComponent, resolve: listMassTimeResolver},
  {path: 'modifier-heures-messes', component: EditMassTimeComponent},
  {path: 'demande-de-messe-non-anonyme', component: NoAnonymousMassRequestListComponent},
];

@NgModule({
  declarations: [
    AddMassComponent,
    MassTableComponent,
    MassListComponent,
    EditMassComponent,
    AddMassTimeComponent,
    MassTimeFormComponent,
    MassTimeListComponent,
    EditMassTimeComponent,
    MassRequestTableComponent,
    AnonymousMassRequestListComponent,
    NoAnonymousMassRequestListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(massRoutes) 
  ]
})
export class MassModule { }
