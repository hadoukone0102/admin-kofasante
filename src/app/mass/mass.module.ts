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
import { MassTimeByIdResolver } from './resolvers/mass-time-by-id.resolver';
import { QuestTypeListResolver } from '../quest/resolvers/quest-type-list.resolver';
import { MassAnonymousRequestComponent } from './mass-anonymous-request/mass-anonymous-request.component';
import { MassModalFilterComponent } from './components/mass-modal/mass-modal-filter/mass-modal-filter.component';
import { ListBasketMassComponent } from './components/mass-basket/mass-basket-table/list-basket-mass/list-basket-mass.component';
import { MassBasketTableComponent } from './components/mass-basket/mass-basket-table/mass-basket-table.component';
import { ReportMassComponent } from './components/ReportMass/report-mass/report-mass.component';
import { AllMassReportComponent } from './components/ReportMass/all-mass-report/all-mass-report.component';
import { MassReportResolver } from './resolvers/mass-report.resolver';
import { MassModalColumnComponent } from './components/mass-modal/mass-modal-column/mass-modal-column.component';
import { MassAnonymousRequestResolver } from './resolvers/mass-anonymous-request.resolver';
import { MassNoAnonymousRequestResolver } from './resolvers/mass-no-anonymous-request.resolver';
import { ExportMassReqResolver } from './resolvers/export-mass-req.resolver';
import { BilanComponent } from './components/bilan/bilan.component';


const listMassTimeResolver = {listMassTimeResolver: MassTimeListResolver};
const listMassResolvers = {listMassResolvers: MassListResolver};
const massDayByIdResolvers = {
  massDayByIdResolvers: MassDayById, 
  listMassTimeResolver: MassTimeListResolver, 
  listQuestTypeResolver: QuestTypeListResolver};
const massTimeByIdResolvers = {massTimeByIdResolvers: MassTimeByIdResolver};
const reportMassRequest = {
  exportMassReqResolver: ExportMassReqResolver,
  reportMassRequest: MassReportResolver};
const massAnonymousRequestResolver = {massAnonymousRequestResolver: MassAnonymousRequestResolver};
const massNoAnonymousRequestResolver = {massNoAnonymousRequestResolver: MassNoAnonymousRequestResolver}

const massRoutes: Routes = [
  {path: 'liste', component: MassListComponent, resolve: listMassResolvers},
  {path: 'ajouter-messes', component: AddMassComponent, resolve: listMassTimeResolver},
  {path: 'modifier-messes/:id', component: EditMassComponent, resolve: massDayByIdResolvers},
  {path: 'ajouter-heure-messe', component: AddMassTimeComponent},
  {path: 'liste-des-heures-de-messes', component: MassTimeListComponent, resolve: listMassTimeResolver},
  {path: 'modifier-heures-messes/:id', component: EditMassTimeComponent, resolve: massTimeByIdResolvers},
  {path: 'demande-de-messe-non-anonyme', component: NoAnonymousMassRequestListComponent,resolve: massNoAnonymousRequestResolver},
  {path: 'demande-de-messe-anonyme', component: AnonymousMassRequestListComponent, resolve: massAnonymousRequestResolver},
  {path: 'corbeille-messe', component: ListBasketMassComponent},
  {path: 'bilan-messe', component: ReportMassComponent, resolve: reportMassRequest},
  //je fais un test
  {path: 'test', component: BilanComponent, resolve: reportMassRequest},
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
    MassAnonymousRequestComponent,
    MassModalFilterComponent,
    ListBasketMassComponent,
    MassBasketTableComponent,
    ReportMassComponent,
    AllMassReportComponent,
    MassModalColumnComponent,
    BilanComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(massRoutes) 
  ]
})
export class MassModule { }
