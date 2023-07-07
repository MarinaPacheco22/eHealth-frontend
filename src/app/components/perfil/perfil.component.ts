import {Component, OnInit} from '@angular/core';
import {PacientesService} from "../../services/pacientes.service";
import {RolService} from "../../services/rol.service";
import {catchError, throwError} from "rxjs";
import {GenericPopupComponent} from "../generic-popup/generic-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {MedicosService} from "../../services/medicos.service";
import {HistorialClinicoService} from "../../services/historial-clinico.service";
import {ChangePasswordPopupComponent} from "../change-password-popup/change-password-popup.component";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  paciente: any;
  paciente_id: number;
  medicoAsignado: any;
  isEditing: boolean = false;
  historialClinico: any;
  showNavBar: boolean = true;

  constructor(private pacientesService: PacientesService,
              private rolService: RolService,
              private dialog: MatDialog,
              private medicosService: MedicosService,
              private historialClinicoService: HistorialClinicoService) {
  }

  ngOnInit(): void {
    this.paciente_id = Number(this.rolService.getUserId());
    this.pacientesService.getPacienteById(this.paciente_id)
      .pipe(
        catchError((error) => {
          this.mostrarGenericPopup(error.error);
          return throwError(error);
        })
      )
      .subscribe((response) => {
        response.body.fechaNacimiento.monthValue = this.formatMonth(response.body.fechaNacimiento);
        this.paciente = response.body;
        this.medicosService.getMedicoById(response.body.medicoAsignado)
          .pipe(
            catchError((error) => {
              this.mostrarGenericPopup(error.error);
              return throwError(error);
            })
          ).subscribe((response) => {
          this.medicoAsignado = response.body;
          this.historialClinicoService.getHistorialClinicoByPacienteId(this.paciente_id)
            .pipe(
              catchError((error) => {
                this.mostrarGenericPopup(error.error);
                return throwError(error);
              })
            ).subscribe((response) => {
            this.historialClinico = response.body;
          })
        })
      });
  }


  mostrarGenericPopup(mensaje: string) {
    return this.dialog.open(GenericPopupComponent, {
      width: '300px',
      data: {message: mensaje}
    });
  }

  editar(): void {
    this.isEditing = true;
  }

  changePassword() {
    const dialogRef = this.dialog.open(ChangePasswordPopupComponent, {
      panelClass: 'dialog-center'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  editarPerfil() {
    this.paciente.id = this.paciente_id;
    this.pacientesService.update(this.paciente)
      .pipe(
        catchError((error) => {
          this.mostrarGenericPopup("Error al editar al paciente.");
          return throwError(error);
        })
      ).subscribe(() => {
      this.historialClinico.pacienteId = this.paciente_id;
      if (typeof this.historialClinico.alergias === 'string') {
        this.historialClinico.alergias = this.historialClinico.alergias.split(",");
      }
      if (typeof this.historialClinico.enfermedadesDiagnosticadas === 'string') {
        this.historialClinico.enfermedadesDiagnosticadas = this.historialClinico.enfermedadesDiagnosticadas.split(",");
      }
      if (typeof this.historialClinico.medicacionActual === 'string') {
        this.historialClinico.medicacionActual = this.historialClinico.medicacionActual.split(",");
      }
      if (typeof this.historialClinico.intervenciones === 'string') {
        this.historialClinico.intervenciones = this.historialClinico.intervenciones.split(",");
      }
      this.historialClinicoService.update(this.historialClinico)
        .pipe(
          catchError((error) => {
            this.mostrarGenericPopup("Error al editar el historial clínico.");
            return throwError(error);
          })
        ).subscribe(() => {
        const dialogRef = this.mostrarGenericPopup("Perfil actualizado correctamente.");
        dialogRef.afterClosed().subscribe(() => {
          this.isEditing = false;
          this.ngOnInit();
        });
      })
    })
  }

  back() {
    this.isEditing = false;
  }

  private formatMonth(date: any) {
    const monthValue = date.monthValue;
    if (monthValue < 10) {
      return '0' + monthValue;
    } else {
      return monthValue.toString();
    }
  }
}
