import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {GenericPopupComponent} from "../generic-popup/generic-popup.component";

@Component({
  selector: 'app-solicitud-details-popup',
  templateUrl: './solicitud-details-popup.component.html',
  styleUrls: ['./solicitud-details-popup.component.css']
})

export class SolicitudDetailsPopupComponent implements OnInit {

  consulta: any;
  anyArchivo: boolean;
  image: any;

  constructor(public dialogRef: MatDialogRef<SolicitudDetailsPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialog) {
    this.consulta = data;
    this.anyArchivo = data.numArchivos.length === 0;
  }

  ngOnInit(): void {
    if(this.anyArchivo == true) {
    }
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
