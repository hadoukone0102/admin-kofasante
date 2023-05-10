import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DonationTableComponent } from './components/donation-table/donation-table.component';
import { SharedModule } from '../shared/shared.module';
import { DonationService } from './services/donation.service';
import { ListAnonymousComponent } from './components/list-anonymous/list-anonymous.component';
import { ListNoAnonymousPersoComponent } from './components/list-no-anonymous-perso/list-no-anonymous-perso.component';
import { ListNoAnonymousOrgaComponent } from './components/list-no-anonymous-orga/list-no-anonymous-orga.component';
import { ListAnonymousResolver } from './resolvers/list-anonymous.resolver';
import { ListNoAnonymousPersoResolver } from './resolvers/list-no-anonymous-perso.resolver';
import { ListNoAnonymousOrgaResolver } from './resolvers/list-no-anonymous-orga.resolver';
import { GLOBAL_RESOLVERS } from 'src/environments/environment';
import { ReportDonationComponent } from './components/report-donation/report-donation.component';
import { ListAllResolver } from './resolvers/list-all.resolver';
import { DonationTypeColorPipe } from './pipes/donation-type-color.pipe';

const listAnoResolvers = {...{listAnonymous: ListAnonymousResolver}, ...GLOBAL_RESOLVERS};
const listNoAnoPersoResolvers = {...{listNoAnonymousPerso: ListNoAnonymousPersoResolver}, ...GLOBAL_RESOLVERS};
const listNoAnoOrgaResolvers = {...{listNoAnonymousOrga: ListNoAnonymousOrgaResolver}, ...GLOBAL_RESOLVERS};
const listReportResolvers = {...{listAll: ListAllResolver}, ...GLOBAL_RESOLVERS};

const donationRoutes: Routes = [
  {path: 'anonyme', component: ListAnonymousComponent, resolve: listAnoResolvers},
  {path: 'non-anonyme/personel', component: ListNoAnonymousPersoComponent, resolve: listNoAnoPersoResolvers},
  {path: 'non-anonyme/organisation', component: ListNoAnonymousOrgaComponent, resolve:listNoAnoOrgaResolvers},
  {path: 'bilan-don', component: ReportDonationComponent, resolve:listReportResolvers},
];

@NgModule({
  declarations: [
    ListAnonymousComponent,
    ListNoAnonymousPersoComponent,
    ListNoAnonymousOrgaComponent,
    DonationTableComponent,
    ReportDonationComponent,
    DonationTypeColorPipe
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
    ListAllResolver
  ]
})
export class DonationModule { }
