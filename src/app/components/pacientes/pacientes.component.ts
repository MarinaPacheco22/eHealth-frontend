import {Component, OnInit} from '@angular/core';
import {PacientesService} from "../../services/pacientes.service";
import {catchError, throwError} from "rxjs";
import {RolService} from "../../services/rol.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {HistorialClinicoPopupComponent} from "../historial-clinico-popup/historial-clinico-popup.component";
import {GenericPopupComponent} from "../generic-popup/generic-popup.component";

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  public pacientesAsignados: any;
  showNavBar: boolean = true;
  noDataMessage: string;

  constructor(
    private pacientesService: PacientesService,
    private rolService: RolService,
    private router: Router,
    private dialog: MatDialog
  ) {
  }

  getPacientesAsignados() {
    this.pacientesAsignados = [];
    this.noDataMessage = "No hay pacientes para mostrar.";
    if (this.rolService.getUserType() == 'admin') {
      this.pacientesService.getAllPacientes()
        .pipe(
          catchError((error) => {
            this.mostrarGenericPopup(error.error);
            return throwError(error);
          })
        )
        .subscribe(response => {
          this.pacientesAsignados = response.body;
        });
    } else {
      this.pacientesService.getPacientesByMedico(Number(this.rolService.getUserId()))
        .pipe(
          catchError((error) => {
            this.mostrarGenericPopup(error.error);
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

  mostrarHistorial(paciente: any) {
    this.dialog.open(HistorialClinicoPopupComponent, {
      panelClass: 'dialog-center',
      data: paciente
    });
  }

  mostrarGenericPopup(mensaje: string): void {
    this.dialog.open(GenericPopupComponent, {
      width: '300px',
      data: { message: mensaje }
    });
  }

  realizarBusquedaFiltrada(filters: any) {
    if (this.rolService.getUserType() == 'admin') {
      this.pacientesService.getPacientesFiltrados(filters.nombre, filters.apellidos, filters.sexo).subscribe(
        (response) => {
          console.log(response.body);
          this.pacientesAsignados = response.body;
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.pacientesService.getPacientesFiltradosByMedico(filters.nombre, filters.apellidos, filters.sexo, this.rolService.getUserId()).subscribe(
        (response) => {
          console.log(response.body);
          this.pacientesAsignados = response.body;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
