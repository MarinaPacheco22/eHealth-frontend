import { Injectable } from '@angular/core';
import {ConfigEnvService} from "../config-env.service";
import {HttpClient} from "@angular/common/http";
import {Paciente} from "../model/paciente.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  API_ENDPOINT = this.configService.apiEndpoint;

  constructor(private http: HttpClient, protected configService: ConfigEnvService) {
  }

  getAllPacientes() {
    return this.http.get<any>(this.API_ENDPOINT + "/paciente", {
      params: undefined,
      observe: 'response'
    });
  }

  getPacientesByEmail(email: string) {
    return this.http.get<any>(this.API_ENDPOINT + "/paciente/by-email/" + email, {
      params: undefined,
      observe: 'response'
    });
  }

  getPacientesByMedico(idMedico: number) {
    return this.http.get<any>(this.API_ENDPOINT + "/paciente/by-medico/" + idMedico, {
      params: undefined,
      observe: 'response'
    });
  }

  createPaciente(paciente: Paciente): Observable<any> {
    return this.http.post<any>(this.API_ENDPOINT + '/paciente/', paciente, {
      params: undefined,
      observe: 'response'
    });
  }
}
