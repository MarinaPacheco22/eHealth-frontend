import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ConfigEnvService {

  get apiEndpoint() {
    return 'http://localhost:8082'
  }

}
