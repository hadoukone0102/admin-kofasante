import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PageErrorComponent } from './components/page-error/page-error.component';
import { RouterModule, Routes } from '@angular/router';

const pageRoutes: Routes = [
  {path: 'erreur', component: PageErrorComponent}, 
];

@NgModule({
  declarations: [
    PageNotFoundComponent,
    PageErrorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(pageRoutes)  
  ]
})
export class PagesModule { }
