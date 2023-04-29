import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderToggleComponent } from './components/header-toggle/header-toggle.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { ModalSetInfoComponent } from './components/modal-set-info/modal-set-info.component';
import { ModalSetPasswordComponent } from './components/modal-set-password/modal-set-password.component';
import { HttpClientModule } from '@angular/common/http';



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
    CommonModule,
    HttpClientModule
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
export class CoreModule { }
