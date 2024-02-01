import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturePagesComponent } from './components/facture-pages/facture-pages.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { FacturePagesResolver } from './resolvers/facture-pages.resolver';
import { KofaPaiementComponent } from './components/kofa-paiement/kofa-paiement.component';
import { KofaPaiementResolver } from './resolvers/kofa-paiement.resolver';

const facturePagesResolver = {FacturePagesResolver:FacturePagesResolver};
const kofaPaiementResolver = {KofaPaiementResolver:KofaPaiementResolver};

const FactureRoutes: Routes = [
  {path:'liste-facture',component:FacturePagesComponent,resolve:facturePagesResolver},
  {path: 'paiement',component:KofaPaiementComponent,resolve:kofaPaiementResolver},
];

@NgModule({
  declarations: [
    FacturePagesComponent,
    KofaPaiementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(FactureRoutes)
  ],
})
export class FacturationModule { }
