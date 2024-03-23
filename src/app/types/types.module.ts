import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTypesComponent } from './components/add-types/add-types.component';
import { RouterModule, Routes } from '@angular/router';
import { ListeTypeMedComponent } from './components/liste-type-med/liste-type-med.component';
import { ListeTypeDocComponent } from './components/liste-type-doc/liste-type-doc.component';
import { SharedModule } from '../shared/shared.module';
import { ListeTypeDocResolver } from './resolvers/liste-type-doc.resolver';
import { ListeTypeMedResolver } from './resolvers/liste-type-med.resolver';

const listeTypeMedResolver = {listeTypeMedResolver : ListeTypeMedResolver};
const listeTypeDocResolver  = {listeTypeDocResolver : ListeTypeDocResolver}

const pageRoutes: Routes = [
  {path: 'ajouter-type', component: AddTypesComponent},
  {path: 'liste-type-med', component: ListeTypeMedComponent,resolve:listeTypeMedResolver},
  {path: 'liste-type-doc', component: ListeTypeDocComponent,resolve:listeTypeDocResolver},
];

@NgModule({
  declarations: [
    AddTypesComponent,
    ListeTypeMedComponent,
    ListeTypeDocComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(pageRoutes)
  ]
})
export class TypesModule { }
