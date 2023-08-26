import {Injectable} from '@angular/core';
import {ConfigEnvService} from "../config-env.service";
import {HttpClient} from "@angular/common/http";
import { ResolucionConsulta } from '../model/resolucion-consulta.model';

@Injectable({
  providedIn: 'root'
})
export class ResolucionConsultaService {

  API_ENDPOINT = this.configService.apiEndpoint;

  constructor(private http: HttpClient,
              protected configService: ConfigEnvService) {
  }

  createResolucionConsulta(resolucion: ResolucionConsulta) {
    return this.http.post<any>(this.API_ENDPOINT + '/resolucion-consulta/', resolucion, {
      params: undefined,
      observe: 'response'
    });
  }

  getResolucionByConsultaId(id: number) {
    return this.http.get<any>(this.API_ENDPOINT + '/resolucion-consulta/by-consulta/' + id, {
      params: undefined,
      observe: 'response'
    });
  }
}
