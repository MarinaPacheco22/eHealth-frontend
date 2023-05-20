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
    MedicosComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterOutlet,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    KeycloakService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
