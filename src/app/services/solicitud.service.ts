import {Injectable} from '@angular/core';
import {ConfigEnvService} from "../config-env.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  API_ENDPOINT = this.configService.apiEndpoint;

  constructor(private http: HttpClient,
              protected configService: ConfigEnvService) {
  }

  createSolicitud(solicitud: FormData) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', this.API_ENDPOINT + '/solicitud-consulta/');
    xhr.send(solicitud);
  }

  getSolicitudesFiltradasByPaciente(id: number, estado: any, especialidad: any, fecha: any) {
    const filter = "estado:" + estado + ",medico.especialidad:" + especialidad + ",fecha:" + fecha + ",paciente.id:" + id;
    return this.http.get<any>(this.API_ENDPOINT + "/solicitud-consulta/filter?filter=" + filter, {
      params: undefined,
      observe: "response"
    })
  }

  getSolicitudesFiltradasByMedico(id: number, nombre: any, apellidos: any, fecha: any) {
    const filter = "paciente.nombre:" + nombre + ",paciente.apellidos:" + apellidos + ",fecha:" + fecha + ",medico.id:" + id;
    return this.http.get<any>(this.API_ENDPOINT + "/solicitud-consulta/filter?filter=" + filter, {
      params: undefined,
      observe: "response"
    })
  }

  getSolicitudesByPaciente(id: number) {
    return this.http.get<any>(this.API_ENDPOINT + "/solicitud-consulta/by-paciente/" + id, {
      params: undefined,
      observe: 'response'
    });
  }

  getSolicitudesByMedico(id: number) {
    return this.http.get<any>(this.API_ENDPOINT + "/solicitud-consulta/by-medico/" + id, {
      params: undefined,
      observe: 'response'
    });
  }

  getArchivosBySolicitudId(id: number) {
    return this.http.get<any>(this.API_ENDPOINT + "/solicitud-consulta/archivos/" + id, {
      params: undefined,
      observe: 'response'
    });
  }
}
