import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ConfigEnvService {

  get apiEndpoint(){
    return 'http://localhost:8082'
  }

  get keycloakUrl() {
    return "http://localhost:8080/";
  }

  get clientId() {
    return "eHealth";
  }

  get realm() {
    return "eHealth";
  }
}
