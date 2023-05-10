import {HistorialClinico} from "./historial-clinico.model";
import {Medico} from "./medico.model";

export class Paciente {

  constructor(
    nombre ?: string,
    apellidos ?: string,
    dni ?: string,
    fechaNacimiento ?: string,
    numSegSocial ?: string,
    altura ?: number,
    peso ?: number,
    telefono ?: number,
    contrasena ?: string,
    email ?: string,
    historialClinico ?: HistorialClinico,
    medicoAsignado ?: Medico
    ) {
  }
}
