import { Component, OnInit } from '@angular/core';
import {PacientesService} from "../../services/pacientes.service";
import {catchError, throwError} from "rxjs";
import {RolService} from "../../services/rol.service";

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  public pacientesAsignados: any;
  public medicoId: number = 5;
  showNavBar: boolean = true;

  constructor(
    private pacientesService: PacientesService,
    private rolService: RolService
  ) {
  }

  getPacientesAsignados() {
    this.pacientesAsignados = [];
    if (this.rolService.getUserType() == 'admin') {
      this.pacientesService.getAllPacientes()
        .pipe(
          catchError((error) => {
            alert(error.error);
            return throwError(error);
          })
        )
        .subscribe(response => {
          console.log(response.body);
          this.pacientesAsignados = response.body;
        });
    } else {
      this.pacientesService.getPacientesByMedico(this.medicoId)
        .pipe(
          catchError((error) => {
            alert(error.error);
            return throwError(error);
          })
        )
        .subscribe(response => {
          this.pacientesAsignados = response.body;
        });
    }
  }

  ngOnInit(): void {
    this.getPacientesAsignados();
  }

  mostrarHistorial() {
    //this.historialClinicoService.getHistorialesByPaciente()
  }
}
