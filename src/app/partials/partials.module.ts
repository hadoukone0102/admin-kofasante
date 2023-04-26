import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import {  HeaderToggleComponent } from './header-toggle/header-toggle.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { HeaderComponent } from './header/header.component';
import { ModalSetInfoComponent } from './modal-set-info/modal-set-info.component';
import { ModalSetPasswordComponent } from './modal-set-password/modal-set-password.component';



@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
    HeaderToggleComponent,
    PageTitleComponent,
    ModalSetInfoComponent,
    ModalSetPasswordComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    HeaderToggleComponent,
    SidebarComponent,
    PageTitleComponent,
    ModalSetInfoComponent,
    ModalSetPasswordComponent,
  ]

})
export class PartialsModule { }
