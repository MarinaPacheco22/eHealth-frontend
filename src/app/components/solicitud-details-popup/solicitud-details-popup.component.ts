import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {GenericPopupComponent} from "../generic-popup/generic-popup.component";
import {ConfirmationPopupComponent} from "../confirmation-popup/confirmation-popup.component";

@Component({
  selector: 'app-solicitud-details-popup',
  templateUrl: './solicitud-details-popup.component.html',
  styleUrls: ['./solicitud-details-popup.component.css']
})
export class SolicitudDetailsPopupComponent implements OnInit {

  consulta: any;

  constructor(public dialogRef: MatDialogRef<SolicitudDetailsPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialog,
              private router: Router) {
    this.consulta = data;
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
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      width: '300px',
      data: { message: mensaje }
    });
  }

  activar(id: number) {
  }

  eliminar(id: number) {
  }

}
