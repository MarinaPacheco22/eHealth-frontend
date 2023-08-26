import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainComponent} from "./components/main/main.component";
import {RegisterComponent} from "./components/register/register.component";
import {AdminComponent} from "./components/admin/admin.component";
import {BaseComponent} from "./components/base/base.component";
import {PacientesComponent} from "./components/pacientes/pacientes.component";
import {LoginComponent} from "./components/login/login.component";
import {MedicosComponent} from "./components/medicos/medicos.component";
import {HistorialClinicoPopupComponent} from "./components/historial-clinico-popup/historial-clinico-popup.component";
import {SolicitudConsultaComponent} from "./components/solicitud-consulta/solicitud-consulta.component";
import {PerfilComponent} from "./components/perfil/perfil.component";
import {ConsultasComponent} from "./components/consultas/consultas.component";
import {ArchivosComponent} from "./components/archivos/archivos.component";
import {SolicitudDetailsComponent} from "./components/solicitud-details/solicitud-details.component";
import {PruebasComponent} from "./components/pruebas/pruebas.component";

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: MainComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'base', component: BaseComponent},
  {path: 'pacientes', component: PacientesComponent},
  {path: 'medicos', component: MedicosComponent},
  {path: 'login', component: LoginComponent},
  {path: 'historial-clinico', component: HistorialClinicoPopupComponent},
  {path: 'consultas', component: ConsultasComponent},
  {path: 'solicitud-consulta', component: SolicitudConsultaComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'archivos/:consultaId', component: ArchivosComponent},
  {path: 'solicitud-detalles', component: SolicitudDetailsComponent},
  {path: 'pruebas', component: PruebasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
