import {Injectable} from '@angular/core';
import {ConfigEnvService} from "../config-env.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Medico} from '../model/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  API_ENDPOINT = this.configService.apiEndpoint;

  constructor(private http: HttpClient, protected configService: ConfigEnvService) {
  }

  getAllMedicos() {
    return this.http.get<any>(this.API_ENDPOINT + "/medico", {
      params: undefined,
      observe: 'response'
    });
  }

  getMedicosFiltrados(nombre: string, apellidos: string, especialidad: any, activo: boolean) {
    const filter = "nombre:" + nombre + ",apellidos:" + apellidos + ",especialidad:" + especialidad + ",activo:" + activo;
    return this.http.get<any>(this.API_ENDPOINT + "/medico/filter?filter=" + filter, {
      params: undefined,
      observe: "response"
    })
  }

  getMedicoWithLessAsignations() {
    return this.http.get<any>(this.API_ENDPOINT + "/medico/less-asignations", {
      params: undefined,
      observe: 'response'
    });
  }

  getMedicosByEmail(email: string): Observable<any> {
    return this.http.get<any>(this.API_ENDPOINT + "/medico/by-email/" + email, {
      params: undefined,
      observe: 'response'
    });
  }

  createMedico(medico: Medico): Observable<any> {
    return this.http.post<any>(this.API_ENDPOINT + '/medico/', medico, {
      params: undefined,
      observe: 'response'
    });
  }

  activate(id: number) {
    return this.http.put<any>(this.API_ENDPOINT + '/medico/activate/' + id, null,{
      params: undefined,
      observe: 'response'
    });
  }

  getDesactivatedMedicos() {
    return this.http.get<any>(this.API_ENDPOINT + "/medico/desactivated", {
      params: undefined,
      observe: 'response'
    });
  }

  delete(id: number) {
    return this.http.delete<any>(this.API_ENDPOINT + '/medico/' + id, {
      params: undefined,
      observe: 'response'
    });

  }

  getMedicoById(id: number) {
    return this.http.get<any>(this.API_ENDPOINT + "/medico/" + id, {
      params: undefined,
      observe: 'response'
    });
  }

  changePassword(pacienteId: number, password: string) {
    return this.http.put<any>(this.API_ENDPOINT + '/medico/change-password/' + pacienteId, password, {
      params: undefined,
      observe: 'response'
    });
  }
}
