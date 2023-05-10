import { Injectable } from '@angular/core';
import {ConfigEnvService} from "../config-env.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  API_ENDPOINT = this.configService.apiEndpoint;

  constructor(private http: HttpClient, protected configService: ConfigEnvService) {
  }

  getPacientesByMedico(idMedico: number) {
    return this.http.get<any>(this.API_ENDPOINT + "/paciente/by-medico/" + idMedico, {
      params: undefined,
      observe: 'response'
    });
  }
}
