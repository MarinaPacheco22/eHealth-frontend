import {Paciente} from "./paciente.model";

export class HistorialClinico {

  constructor(
    enfermedadesDiagnosticadas ?: [],
    alergias ?: [],
    intervenciones ?: [],
    pruebas ?: [],
    medicacionActual ?: [],
    pruebasMedicas ?: [],
    paciente ?: Paciente
    ) {
  }
}
