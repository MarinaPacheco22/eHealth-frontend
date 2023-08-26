
export class ResolucionConsulta {

  constructor(
    public id ?: number,
    public observacion ?: string,
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
