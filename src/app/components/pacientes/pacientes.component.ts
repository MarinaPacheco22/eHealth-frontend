import { Component, OnInit } from '@angular/core';
import {PacientesService} from "../../services/pacientes.service";
import {catchError, throwError} from "rxjs";
import {HistorialClinicoService} from "../../services/historial-clinico.service";

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
  public pacientesAsignados: any;
  public medicoId: number = 3;

  constructor(
    private pacientesService: PacientesService
  ) {
  }

  getPacientesAsignados() {
    this.pacientesAsignados = [];
    this.pacientesService.getPacientesByMedico(this.medicoId)
      .pipe(
        catchError((error) => {
          alert(error.error);
          return throwError(error);
        })
      )
      .subscribe(pacientesList => {
          this.pacientesAsignados = pacientesList.body;
    });
  }

  ngOnInit(): void {
    this.getPacientesAsignados();
  }

  mostrarHistorial() {
    // this.historialClinicoService.getHistorialesByPaciente()
  }
}
