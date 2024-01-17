import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitesPageComponent } from './components/visites-page/visites-page.component';
import { RenseignerPageComponent } from './components/renseigner-page/renseigner-page.component';
import { AbonnementPageComponent } from './components/abonnement-page/abonnement-page.component';
import { MedecinePageComponent } from './components/medecine-page/medecine-page.component';
import { DocumentsPageComponent } from './components/documents-page/documents-page.component';
import { AbonnementPageResolver } from './resolvers/abonnement-page.resolver';
import { DocumentsPageResolver } from './resolvers/documents-page.resolver';
import { MedecinePageResolver } from './resolvers/medecine-page.resolver';
import { RenseignerPageResolver } from './resolvers/renseigner-page.resolver';
import { VisitesPageResolver } from './resolvers/visites-page.resolver';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const abonnementPageResolver = {AbonnementPageResolver:AbonnementPageResolver};
const documentsPageResolver = {DocumentsPageResolver:DocumentsPageResolver};
const medecinePageResolver = {MedecinePageResolver:MedecinePageResolver};
const renseignerPageResolver = {RenseignerPageResolver:RenseignerPageResolver};
const visitesPageResolver = {VisitesPageResolver:VisitesPageResolver};
const demandeRoutes: Routes = [
  {path:'documents',component:DocumentsPageComponent,resolve:documentsPageResolver},
  {path:'visites',component:VisitesPageComponent,resolve:visitesPageResolver},
  {path:'medecine',component:MedecinePageComponent,resolve:medecinePageResolver},
  {path:'info',component:RenseignerPageComponent,resolve:renseignerPageResolver},
  {path:'abonnement',component:AbonnementPageComponent,resolve:abonnementPageResolver},

];
@NgModule({
  declarations: [
    VisitesPageComponent,
    RenseignerPageComponent,
    AbonnementPageComponent,
    MedecinePageComponent,
    DocumentsPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(demandeRoutes),
  ]
})
export class DemandesModule { }
