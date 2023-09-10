import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderToggleComponent } from './components/header-toggle/header-toggle.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { HttpClientModule } from '@angular/common/http';
import { RefreshComponent } from './components/refresh/refresh.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ModalFilterComponent } from './components/modal-filter/modal-filter.component';
import { FormsModule } from '@angular/forms';
import { CustomTimeFormatPipe } from './pipes/custom-time-format.pipe';



@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
    HeaderToggleComponent,
    PageTitleComponent,
    RefreshComponent,
    SpinnerComponent,
    ModalFilterComponent,
    CustomTimeFormatPipe,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    HeaderToggleComponent,
    SidebarComponent,
    PageTitleComponent,
    RefreshComponent,
    SpinnerComponent,
    ModalFilterComponent,
    CustomTimeFormatPipe
  ]

})
export class CoreModule { }
