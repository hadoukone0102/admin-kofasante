import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DonationTableComponent } from './components/kofasante/donation-table/donation-table.component';
import { SharedModule } from '../shared/shared.module';
import { DonationService } from './services/donation.service';
import { ListAnonymousComponent } from './components/kofasante/list-anonymous/list-anonymous.component';
import { ListNoAnonymousPersoComponent } from './components/kofasante/list-no-anonymous-perso/list-no-anonymous-perso.component';
import { ListNoAnonymousOrgaComponent } from './components/kofasante/list-no-anonymous-orga/list-no-anonymous-orga.component';
import { ListAnonymousResolver } from './resolvers/list-anonymous.resolver';
import { ListNoAnonymousPersoResolver } from './resolvers/list-no-anonymous-perso.resolver';
import { ListNoAnonymousOrgaResolver } from './resolvers/list-no-anonymous-orga.resolver';
import { GLOBAL_RESOLVERS } from 'src/environments/environment';
import { ReportDonationComponent } from './components/report-donation/report-donation.component';
import { ListAllResolver } from './resolvers/list-all.resolver';
import { DonationTypeColorPipe } from './pipes/donation-type-color.pipe';
import { ListBasketDonationComponent } from './components/list-basket-donation/list-basket-donation.component';
import { ListBasketDonationResolver } from './resolvers/list-basket-donation.resolver';
import { ModalSelectColumnComponent } from './components/modal-select-column/modal-select-column.component';
import { ListDonationTypeComponent } from './components/list-donation-type/list-donation-type.component';
import { EditDonationTypeComponent } from './components/edit-donation-type/edit-donation-type.component';
import { DonationTypeTableComponent } from './components/donation-type-table/donation-type-table.component';
import { ListDonationTypeResolver } from './resolvers/list-donation-type.resolver';
import { ModalFormDonationTypeComponent } from './components/modal-form-donation-type/modal-form-donation-type.component';
import { ModalAddDonationTypeComponent } from './components/modal-add-donation-type/modal-add-donation-type.component';
import { DonationTypeByIdResolver } from './resolvers/donation-type-by-id.resolver';
import { DisabledDonationTypeComponent } from './components/disabled-donation-type/disabled-donation-type.component';
import { DisabledDonationTypeResolver } from './resolvers/disabled-donation-type.resolver';
import { AddAsctuceComponent } from './components/kofasante/add-asctuce/add-asctuce.component';
import { ListeAsctuceKofasanteComponent } from './components/kofasante/liste-asctuce-kofasante/liste-asctuce-kofasante.component';
import { ListeDemandesComponent } from './components/kofasante/liste-demandes/liste-demandes.component';
import { ListAnalyseComponent } from './components/kofasante/list-analyse/list-analyse.component';

const listAnoResolvers = {...{listAnonymous: ListAnonymousResolver}, ...GLOBAL_RESOLVERS};
const listNoAnoPersoResolvers = {...{listNoAnonymousPerso: ListNoAnonymousPersoResolver}, ...GLOBAL_RESOLVERS};
const listNoAnoOrgaResolvers = {...{listNoAnonymousOrga: ListNoAnonymousOrgaResolver}, ...GLOBAL_RESOLVERS};
const listBasketResolvers = {...{listBasketDonation: ListBasketDonationResolver}, ...GLOBAL_RESOLVERS};
const listAllResolver = {ListAllResolver:ListAllResolver};

const listDonationTypeResolvers = {...{listDonationType: ListDonationTypeResolver}, ...GLOBAL_RESOLVERS};
const editDonationTypeResolvers = {...{donationTypeById: DonationTypeByIdResolver}, ...GLOBAL_RESOLVERS};
const disabledDonationTypeResolvers = {...{disabledDonationType: DisabledDonationTypeResolver}, ...GLOBAL_RESOLVERS};


const donationRoutes: Routes = [
  {path: 'anonyme', component: ListAnonymousComponent, resolve: listAnoResolvers},
  {path: 'non-anonyme/personel', component: ListNoAnonymousPersoComponent, resolve: listNoAnoPersoResolvers},
  {path: 'non-anonyme/organisation', component: ListNoAnonymousOrgaComponent, resolve:listNoAnoOrgaResolvers},
  {path: 'bilan-don', component: ReportDonationComponent, resolve:listAllResolver},
  {path: 'corbeille-don', component: ListBasketDonationComponent, resolve:listBasketResolvers},

  {path: 'type-don', component: ListDonationTypeComponent, resolve:listDonationTypeResolvers},
  {path: 'modifier-type-don/:id', component: EditDonationTypeComponent, resolve:editDonationTypeResolvers},
  {path: 'type-don-inactif', component: DisabledDonationTypeComponent, resolve:disabledDonationTypeResolvers},
];

@NgModule({
  declarations: [
    ListAnonymousComponent,
    ListNoAnonymousPersoComponent,
    ListNoAnonymousOrgaComponent,
    DonationTableComponent,
    ReportDonationComponent,
    DonationTypeColorPipe,
    ListBasketDonationComponent,
    ModalSelectColumnComponent,
    ListDonationTypeComponent,
    EditDonationTypeComponent,
    DonationTypeTableComponent,
    ModalFormDonationTypeComponent,
    ModalAddDonationTypeComponent,
    DisabledDonationTypeComponent,
    AddAsctuceComponent,
    ListeAsctuceKofasanteComponent,
    ListeDemandesComponent,
    ListAnalyseComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(donationRoutes)
  ],
  providers:[
    DonationService, //Est en lazy load, sera chargé que si le module don est chargé
    ListAnonymousResolver,
    ListNoAnonymousPersoResolver,
    ListNoAnonymousOrgaResolver,
    ListAllResolver,
  ]
})
export class DonationModule { }
