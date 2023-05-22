import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {KeycloakService} from "./services/keycloak.service";
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import { AdminComponent } from './components/admin/admin.component';
import {HttpClientModule} from "@angular/common/http";
import { NavbarComponent } from './components/navbar/navbar.component';
import { BaseComponent } from './components/base/base.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { LoginComponent } from './components/login/login.component';
import { MedicosComponent } from './components/medicos/medicos.component';
import { HistorialClinicoPopupComponent } from './components/historial-clinico-popup/historial-clinico-popup.component';
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import { GenericPopupComponent } from './components/generic-popup/generic-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RegisterComponent,
    AdminComponent,
    NavbarComponent,
    BaseComponent,
    PacientesComponent,
    LoginComponent,
    MedicosComponent,
    HistorialClinicoPopupComponent,
    GenericPopupComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterOutlet,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    KeycloakService
  ],
  entryComponents: [GenericPopupComponent],
  bootstrap: [AppComponent]
})

export class AppModule {
}
