import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AddPastoralYearsComponent } from './components/add-pastoral-years/add-pastoral-years.component';
import { FormAddPastoralComponent } from './components/form-add-pastoral/form-add-pastoral.component';


const catechesisRoutes: Routes = [
  {path: "catechese", component: AddPastoralYearsComponent}
];

@NgModule({
  declarations: [
    AddPastoralYearsComponent,
    FormAddPastoralComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(catechesisRoutes)
  ]
})
export class CatechesisModule { }
