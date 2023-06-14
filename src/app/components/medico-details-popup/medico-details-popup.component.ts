import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {catchError, throwError} from "rxjs";
import {GenericPopupComponent} from "../generic-popup/generic-popup.component";
import {MedicosService} from "../../services/medicos.service";
import {Router} from "@angular/router";
import {ConfirmationPopupComponent} from "../confirmation-popup/confirmation-popup.component";

@Component({
  selector: 'app-medico-details-popup',
  templateUrl: './medico-details-popup.component.html',
  styleUrls: ['./medico-details-popup.component.css']
})
export class MedicoDetailsPopupComponent implements OnInit {

  medico: any;

  constructor(public dialogRef: MatDialogRef<MedicoDetailsPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialog,
              private medicosService: MedicosService,
              private router: Router) {
    this.medico = data;
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }


  mostrarGenericPopup(mensaje: string): void {
    const dialogRef = this.dialog.open(GenericPopupComponent, {
      width: '300px',
      data: {message: mensaje}
    });
  }

  mostrarConfirmationPopup(mensaje: string) {
    return this.dialog.open(ConfirmationPopupComponent, {
      width: '300px',
      data: { message: mensaje }
    });
  }

  activar(id: number) {
    this.medicosService.activate(id)
      .pipe(
        catchError((error) => {
          this.mostrarGenericPopup(error.error);
          return throwError(error);
        })
      )
      .subscribe(() => {
        this.close();
        this.mostrarGenericPopup("Medico activado correctamente.");
      });
  }

  eliminar(id: number) {
    const dialogRef = this.mostrarConfirmationPopup('eliminar')
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.medicosService.delete(id)
          .pipe(
            catchError((error) => {
              this.mostrarGenericPopup(error.error);
              return throwError(error);
            })
          )
          .subscribe(() => {
            this.close();
            this.mostrarGenericPopup("Solicitud eliminada correctamente.");
          });
      }
    });
  }
}
