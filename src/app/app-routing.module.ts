import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainComponent} from "./components/main/main.component";
import {RegisterComponent} from "./components/register/register.component";
import {AdminComponent} from "./components/admin/admin.component";
import {BaseComponent} from "./components/base/base.component";
import {PacientesComponent} from "./components/pacientes/pacientes.component";

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: MainComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'base', component: BaseComponent},
  {path: 'pacientes', component: PacientesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
