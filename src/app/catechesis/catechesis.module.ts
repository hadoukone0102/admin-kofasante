import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AddPastoralYearsComponent } from './components/add-pastoral-years/add-pastoral-years.component';
import { FormAddPastoralComponent } from './components/form-add-pastoral/form-add-pastoral.component';
import { ListPastoralYearsComponent } from './components/list-pastoral-years/list-pastoral-years.component';
import { TablePastoralYearsComponent } from './components/table-pastoral-years/table-pastoral-years.component';
import { ListCatechesisComponent } from './components/list-catechesis/list-catechesis.component';
import { TableListCatechesisComponent } from './components/table-list-catechesis/table-list-catechesis.component';
import { CatechesisYoungComponent } from './components/catechesis-young/catechesis-young.component';
import { CatechesisAdultComponent } from './components/catechesis-adult/catechesis-adult.component';

const catechesisRoutes: Routes = [
  {path: "catechese", component: AddPastoralYearsComponent},
  {path: "liste-annee-pastorale", component: ListPastoralYearsComponent},
  {path: "liste-cathechumenes", component: ListCatechesisComponent},
  {path: "liste-catechumenes-jeunes", component: CatechesisYoungComponent},
  {path: "liste-catechumenes-adultes", component: CatechesisAdultComponent}
];

@NgModule({
  declarations: [
    AddPastoralYearsComponent,
    FormAddPastoralComponent,
    ListPastoralYearsComponent,
    TablePastoralYearsComponent,
    ListCatechesisComponent,
    TableListCatechesisComponent,
    CatechesisYoungComponent,
    CatechesisAdultComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(catechesisRoutes)
  ]
})
export class CatechesisModule { }
