import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {HistorialClinicoService} from "../../services/historial-clinico.service";
import {catchError, throwError} from "rxjs";
import {GenericPopupComponent} from "../generic-popup/generic-popup.component";

@Component({
  selector: 'app-historial-clinico-popup',
  templateUrl: './historial-clinico-popup.component.html',
  styleUrls: ['./historial-clinico-popup.component.css']
})
export class HistorialClinicoPopupComponent implements OnInit {

  paciente: any;
  historialClinico: any;

  constructor(public dialogRef: MatDialogRef<HistorialClinicoPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private historialClinicoService: HistorialClinicoService,
              private dialog: MatDialog) {
    this.paciente = data;
  }

  ngOnInit(): void {
    this.historialClinicoService.getHistorialClinicoByPacienteId(this.paciente.id)
      .pipe(
        catchError((error) => {
          this.mostrarGenericPopup(error.error);
          return throwError(error);
        })
      )
      .subscribe(response => {
        this.historialClinico = response.body;
      });
  }

  close(): void {
    this.dialogRef.close();
  }


  mostrarGenericPopup(mensaje: string): void {
    this.dialog.open(GenericPopupComponent, {
      width: '300px',
      data: {message: mensaje}
    });
  }
}
