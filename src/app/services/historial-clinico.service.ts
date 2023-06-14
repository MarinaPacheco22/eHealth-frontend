import {Injectable} from '@angular/core';
import {ConfigEnvService} from "../config-env.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HistorialClinico} from "../model/historial-clinico.model";

@Injectable({
  providedIn: 'root'
})
export class HistorialClinicoService {

  API_ENDPOINT = this.configService.apiEndpoint;

  constructor(private http: HttpClient, protected configService: ConfigEnvService) {
  }

  createHistorialClinico(historial: HistorialClinico): Observable<any> {
    return this.http.post<any>(this.API_ENDPOINT + '/historial-clinico/', historial, {
      params: undefined,
      observe: 'response'
    });
  }

  getHistorialClinicoByPacienteId(id: number): Observable<any>{
    return this.http.get<any>(this.API_ENDPOINT + '/historial-clinico/by-paciente/' + id, {
      params: undefined,
      observe: 'response'
    });
  }

  update(historial: any) {
    return this.http.put<any>(this.API_ENDPOINT + '/historial-clinico/' + historial.id, historial, {
      params: undefined,
      observe: 'response'
    });
  }
}
