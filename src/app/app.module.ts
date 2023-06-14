import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {KeycloakService} from "./services/keycloak.service";
import {MainComponent} from './components/main/main.component';
import {RegisterComponent} from './components/register/register.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {AdminComponent} from './components/admin/admin.component';
import {HttpClientModule} from "@angular/common/http";
import {NavbarComponent} from './components/navbar/navbar.component';
import {BaseComponent} from './components/base/base.component';
import {PacientesComponent} from './components/pacientes/pacientes.component';
import {LoginComponent} from './components/login/login.component';
import {MedicosComponent} from './components/medicos/medicos.component';
import {HistorialClinicoPopupComponent} from './components/historial-clinico-popup/historial-clinico-popup.component';
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {GenericPopupComponent} from './components/generic-popup/generic-popup.component';
import {MedicoDetailsPopupComponent} from './components/medico-details-popup/medico-details-popup.component';
import {MailComponent} from './components/mail/mail.component';
import {SolicitudConsultaComponent} from './components/solicitud-consulta/solicitud-consulta.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ConfirmationPopupComponent} from "./components/confirmation-popup/confirmation-popup.component";
import {PerfilComponent} from './components/perfil/perfil.component';
import {ConsultasComponent} from './components/consultas/consultas.component';
import {SolicitudDetailsPopupComponent} from './components/solicitud-details-popup/solicitud-details-popup.component';
import {ChangePasswordPopupComponent} from './components/change-password-popup/change-password-popup.component';

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
    GenericPopupComponent,
    MedicoDetailsPopupComponent,
    MailComponent,
    SolicitudConsultaComponent,
    ConfirmationPopupComponent,
    PerfilComponent,
    ConsultasComponent,
    SolicitudDetailsPopupComponent,
    ChangePasswordPopupComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterOutlet,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    KeycloakService
  ],
  entryComponents: [
    GenericPopupComponent,
    ConfirmationPopupComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
