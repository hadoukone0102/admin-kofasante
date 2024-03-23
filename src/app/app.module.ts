import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DonationModule } from './donation/donation.module';
import { CoreModule } from './core/core.module';
import { AdminModule } from './admin/admin.module';
import { FormsModule } from '@angular/forms';
import { PagesModule } from './pages/pages.module';
import { GlobalModule } from './global/global.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptorProvider } from './admin/interceptors/token.interceptor';
import { DemandesModule } from './demandes/demandes.module';
import { FacturationModule } from './facturation/facturation.module';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { TypesModule } from './types/types.module';


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
    AppRoutingModule,
    BrowserAnimationsModule,
    DemandesModule,
    FacturationModule,
    TypesModule,
  ],
  providers: [
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(
        HttpClientXsrfModule.withOptions({
        cookieName: 'My-Xsrf-Cookie',
        headerName: 'My-Xsrf-Header',
      })
    ),
    TokenInterceptorProvider
  ],//All time enabled
  bootstrap: [AppComponent]
})
export class AppModule { }
