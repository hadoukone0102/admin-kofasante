import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturePagesComponent } from './components/facture-pages/facture-pages.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { FacturePagesResolver } from './resolvers/facture-pages.resolver';

const facturePagesResolver = {FacturePagesResolver:FacturePagesResolver};

const FactureRoutes: Routes = [
  {path:'liste-facture',component:FacturePagesComponent,resolve:facturePagesResolver}
];

@NgModule({
  declarations: [
    FacturePagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(FactureRoutes)
  ],
})
export class FacturationModule { }
