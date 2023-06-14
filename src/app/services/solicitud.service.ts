import {Injectable} from '@angular/core';
import {ConfigEnvService} from "../config-env.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  API_ENDPOINT = this.configService.apiEndpoint;

  constructor(private http: HttpClient,
              protected configService: ConfigEnvService,
              private router: Router) {
  }

  createSolicitud(solicitud: FormData) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', this.API_ENDPOINT + '/solicitud-consulta/');
    xhr.send(solicitud);
  }

  getSolicitudesByPaciente(id: number) {
    return this.http.get<any>(this.API_ENDPOINT + "/solicitud-consulta/by-paciente/" + id, {
      params: undefined,
      observe: 'response'
    });
  }
}
