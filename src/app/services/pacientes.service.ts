import {Injectable} from '@angular/core';
import {ConfigEnvService} from "../config-env.service";
import {HttpClient} from "@angular/common/http";
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

  getPacientesFiltrados(nombre: string, apellidos: string, sexo: any, fumador: boolean) {
    const filter = "nombre:" + nombre + ",apellidos:" + apellidos + ",sexo:" + sexo + ",fumador:" + fumador;
    return this.http.get<any>(this.API_ENDPOINT + "/paciente/filter?filter=" + filter, {
      params: undefined,
      observe: "response"
    })
  }

  getPacientesFiltradosByMedico(nombre: string, apellidos: string, sexo: any, medicoAsignadoId: any, fumador: boolean) {
    const filter = "nombre:" + nombre + ",apellidos:" + apellidos + ",sexo:" + sexo + ",medicoAsignado.id:" + medicoAsignadoId + ",fumador:" + fumador;
    return this.http.get<any>(this.API_ENDPOINT + "/paciente/filter?filter=" + filter, {
      params: undefined,
      observe: "response"
    })
  }

  getPacienteByEmail(email: string): Observable<any> {
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

  createPaciente(paciente: any): Observable<any> {
    return this.http.post<any>(this.API_ENDPOINT + '/paciente/', paciente, {
      params: undefined,
      observe: 'response'
    });
  }

  getPacienteById(id: number) {
    return this.http.get<any>(this.API_ENDPOINT + "/paciente/" + id, {
      params: undefined,
      observe: 'response'
    });

  }

  update(paciente: any): Observable<any> {
    return this.http.put<any>(this.API_ENDPOINT + '/paciente/' + paciente.id, paciente, {
      params: undefined,
      observe: 'response'
    });
  }

  changePassword(pacienteId: number, password: string) {
    return this.http.put<any>(this.API_ENDPOINT + '/paciente/change-password/' + pacienteId, password, {
      params: undefined,
      observe: 'response'
    });
  }
}
