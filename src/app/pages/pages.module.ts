import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PageErrorComponent } from './components/page-error/page-error.component';
import { RouterModule, Routes } from '@angular/router';
import { LockedPageComponent } from './components/locked-page/locked-page.component';

const pageRoutes: Routes = [
  {path: 'erreur', component: PageErrorComponent}, 
  {path: 'page-introuvable', component: PageNotFoundComponent}, 
  {path: 'page-verrouillee', component: LockedPageComponent}, 
];

@NgModule({
  declarations: [
    PageNotFoundComponent,
    PageErrorComponent,
    LockedPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(pageRoutes)  
  ]
})
export class PagesModule { }
