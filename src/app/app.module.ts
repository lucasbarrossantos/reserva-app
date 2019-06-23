import { LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData, CommonModule } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import {ButtonModule} from 'primeng/components/button/button';
import { NavbarComponent } from './navbar/navbar.component';
import { MenubarModule } from 'primeng/components/menubar/menubar';
import { CoreModule } from './shared/core/core.module';
import { ConfirmationService } from 'primeng/components/common/api';
import { EventEmitterService } from './shared/utils/event.manager';


registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,

    // PrimeNg
    MenubarModule,
    ButtonModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt' },
    ConfirmationService,
    EventEmitterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
