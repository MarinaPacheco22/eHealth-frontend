import { Injectable } from '@angular/core';
import {ConfigEnvService} from "../config-env.service";
import {HttpClient} from "@angular/common/http";
import {Paciente} from "../components/model/paciente.model";
import {Observable} from "rxjs";
import { Medico } from '../components/model/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  API_ENDPOINT = this.configService.apiEndpoint;

  constructor(private http: HttpClient, protected configService: ConfigEnvService) {
  }

  getMedicoWithLessAsignations() {
    return this.http.get<any>(this.API_ENDPOINT + "/medico/less-asignations", {
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
}
