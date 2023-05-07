import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {KeycloakService} from "./services/keycloak.service";
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    KeycloakService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
