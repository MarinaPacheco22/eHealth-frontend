import { Component } from '@angular/core';
import {KeycloakService} from "./services/keycloak.service";
import jwtDecode from 'jwt-decode';
import {ConfigEnvService} from "./config-env.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eHealth-frontend';
  token: any;
  isLogged: boolean = false;
  isAdmin: boolean = false;
  showNavBar: boolean = false;

  constructor(
    protected keycloak: KeycloakService,
    protected configService: ConfigEnvService,
    ) {
  }

  ngOnInit(): void {
    // KeycloakService.login({
    //   urlStr: this.configService.keycloakUrl,
    //   realmStr: this.configService.realm,
    //   clientIdStr: this.configService.clientId
    // }).then(async () => {
    //   await this.setIsAdmin();
    //   this.isLogged = true;
    // });
  }

  async setIsAdmin() {
    let token = KeycloakService.getToken().get();
    this.token = token;
    // @ts-ignore
    localStorage.setItem('token', token)
    // @ts-ignore
    let tokenDecoded = jwtDecode(token);
    // @ts-ignore
    let rol = tokenDecoded['realm_access'].roles[0];
    this.isAdmin = rol==='ADMIN';
  }
}
