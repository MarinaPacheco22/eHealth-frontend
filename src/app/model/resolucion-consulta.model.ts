import {LocalDate} from "@js-joda/core";

export class ResolucionConsulta {

  constructor(
    public id ?: number,
    public diagnostico ?: string,
    public tratamiento ?: string,
    public medicacion ?: string,
    public enfermedad ?: string,
    public alergia ?: string,
    public solicitudConsultaId ?: number,
    public pacienteId ?: number
    ) {
  }
}
