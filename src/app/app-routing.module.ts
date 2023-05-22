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

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: MainComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'base', component: BaseComponent},
  {path: 'pacientes', component: PacientesComponent},
  {path: 'medicos', component: MedicosComponent},
  {path: 'login', component: LoginComponent},
  {path: 'historial-clinico', component: HistorialClinicoPopupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
