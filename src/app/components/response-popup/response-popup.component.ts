import {Component, Inject, OnInit} from '@angular/core';
import {ResolucionConsultaService} from "../../services/resolucion-consulta.service";
import {ResolucionConsulta} from "../../model/resolucion-consulta.model";
import {GenericPopupComponent} from "../generic-popup/generic-popup.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {catchError, throwError} from "rxjs";
import {Router} from "@angular/router";
import {SolicitudService} from "../../services/solicitud.service";

@Component({
  selector: 'app-response-popup',
  templateUrl: './response-popup.component.html',
  styleUrls: ['./response-popup.component.css']
})
export class ResponsePopupComponent implements OnInit {

  solicitud: any;
  resolucion: ResolucionConsulta = new ResolucionConsulta();
  modificarHistorialActivo = false;
  tipoResolucion: string = '';
  especialidad: string = '';

  especialidades: string[] = [
    'Alergologia',
    'Cardiologia',
    'Dermatologia',
    'Endocrinologia',
    'Gastroenterologia',
    'Hematologia',
    'Infectologia',
    'Medicina familiar',
    'Neumologia',
    'Neurologia',
    'Oftalmologia',
    'Oncologia',
    'Ortopedia',
    'Otorrinolaringologia',
    'Pediatria',
    'Psicologia',
    'Psiquiatria',
    'Radiologia',
    'Reumatologia',
    'Urologia'
  ];

  constructor(public dialogRef: MatDialogRef<ResponsePopupComponent>,
              private resolucionConsultaService: ResolucionConsultaService,
              private solicitudService: SolicitudService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialog,
              private router: Router) {
    this.solicitud = data.consulta;
    this.tipoResolucion = data.tipo;
  }

  ngOnInit(): void {
    switch (this.solicitud.estado) {
      case 'SOLICITUD_ENVIADA':
        this.solicitud.estado = '0';
        break;
      case 'SOLICITUD_CERRADA':
        this.solicitud.estado = '1';
        break;
      case 'DERIVACION':
        this.solicitud.estado = '2';
        break;
    }

  }

  enviar() {
    if (this.resolucion.observacion == undefined) {
      this.mostrarErrorPopup("Campos incompletos")
    } else {
      this.resolucion.solicitudConsultaId = this.solicitud.id;
      this.resolucion.pacienteId = this.solicitud.pacienteOutDto.id;
      this.resolucionConsultaService.createResolucionConsulta(this.resolucion)
        .pipe(
          catchError((error) => {
            alert(error.error);
            return throwError(error);
          })
        )
        .subscribe(() => {
          this.solicitudService.changeState(this.resolucion.solicitudConsultaId, this.solicitud.estado)
            .pipe(
              catchError((error) => {
                  alert(error.error);
                  return throwError(error);
                }
              )
            )
            .subscribe(() => {
              if (this.tipoResolucion == 'DERIVACION') {
                this.solicitudService.derivarSolicitud(this.solicitud.id, this.especialidad)
                  .pipe(
                    catchError((error) => {
                      alert(error.error);
                      return throwError(error);
                    })
                  )
                  .subscribe(() => {
                    console.log("Solicitud derivada.")
                  })
              }
              this.mostrarGenericPopup("Respuesta enviada correctamente.");
              this.dialogRef.close();
            })
        });
    }
  }

  mostrarGenericPopup(mensaje: string): void {
    const dialogRef = this.dialog.open(GenericPopupComponent, {
      width: '300px',
      data: {message: mensaje}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate([('/consultas')]);
    })
  }

  mostrarErrorPopup(mensaje: string): void {
    this.dialog.open(GenericPopupComponent, {
      width: '300px',
      data: {message: mensaje}
    });
  }

  alternarCamposHistorial() {
    this.modificarHistorialActivo = !this.modificarHistorialActivo;
  }

}
