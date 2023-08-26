import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {GenericPopupComponent} from "../generic-popup/generic-popup.component";
import {RolService} from "../../services/rol.service";
import {ResolucionConsultaService} from "../../services/resolucion-consulta.service";
import {catchError, throwError} from "rxjs";

@Component({
  selector: 'app-solicitud-details-popup',
  templateUrl: './solicitud-details-popup.component.html',
  styleUrls: ['./solicitud-details-popup.component.css']
})

export class SolicitudDetailsPopupComponent implements OnInit {

  consulta: any;
  resolucion: any;
  anyArchivo: boolean;
  image: any;
  user_type: string;
  showResolution: boolean = false;
  isClosed: boolean = false;
  isRefered: boolean = false;
  showMoreInformation: boolean = false;

  constructor(public dialogRef: MatDialogRef<SolicitudDetailsPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialog,
              public rolService: RolService,
              public resolucionConsultaService: ResolucionConsultaService) {
    this.consulta = data;
    this.anyArchivo = data.numArchivos != 0;
  }

  ngOnInit(): void {
    this.user_type = this.rolService.getUserType();
    if (this.consulta.estado == 'Solicitud cerrada' || this.consulta.estado == 'Solicitud derivada') {
      this.resolucionConsultaService.getResolucionByConsultaId(this.consulta.id)
        .pipe(
          catchError((error) => {
            alert(error.error);
            return throwError(error);
          })
        )
        .subscribe((response) => {
          this.resolucion = response.body;
          if (this.consulta.estado == 'Solicitud cerrada') {
            this.isClosed = true
          } else {
            this.isRefered = true;
          }
        });
    }
  }

  verResolucion() {
    this.showResolution = !this.showResolution;
  }

  close(): void {
    this.isClosed = false;
    this.dialogRef.close();
  }

  mostrarGenericPopup(mensaje: string): void {
    this.dialog.open(GenericPopupComponent, {
      width: '300px',
      data: {message: mensaje}
    });
  }

  verObservaciones() {
    this.showMoreInformation = !this.showMoreInformation;
  }
}
