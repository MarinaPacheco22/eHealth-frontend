import {Injectable} from '@angular/core';
import {ConfigEnvService} from "../config-env.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PruebaMedicaService {

  API_ENDPOINT = this.configService.apiEndpoint;

  constructor(private http: HttpClient,
              protected configService: ConfigEnvService) {
  }

  createPrueba(prueba: any) {
    return this.http.post<any>(this.API_ENDPOINT + "/prueba-medica/", prueba, {
      params: undefined,
      observe: "response"
    })
  }

  getPruebasWithoutResultsByMedico(id: number) {
    return this.http.get<any>(this.API_ENDPOINT + "/prueba-medica/by-medico/" + id, {
      params: undefined,
      observe: 'response'
    });
  }

  getPruebasByPaciente(id: number) {
    return this.http.get<any>(this.API_ENDPOINT + "/prueba-medica/by-paciente/" + id, {
      params: undefined,
      observe: 'response'
    });
  }

  getPruebasBySolicitudId(id: number) {
    return this.http.get<any>(this.API_ENDPOINT + "/prueba-medica/by-solicitud/" + id, {
      params: undefined,
      observe: 'response'
    });

  }

  addResultUrl(id: number, resultsURL: string) {
    return this.http.put<any>(this.API_ENDPOINT + "/prueba-medica/add-results/" + id, resultsURL, {
      params: undefined,
      observe: 'response'
    });

  }
}
