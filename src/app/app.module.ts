import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DonationModule } from './donation/donation.module';
import { CoreModule } from './core/core.module';
import { AdminModule } from './admin/admin.module';
import { FormsModule } from '@angular/forms';
import { PagesModule } from './pages/pages.module';
import { GlobalModule } from './global/global.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DonationModule,
    CoreModule,
    AdminModule,
    PagesModule,
    GlobalModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
