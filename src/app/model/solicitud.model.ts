
export class Solicitud {

  constructor(
    public id ?: number,
  public descripcion ?: string,
  public archivos ?: FormData,
  public pacienteId ?: number,
  public medicoId ?: number
    ) {
  }
}
