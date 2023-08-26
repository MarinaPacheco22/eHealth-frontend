import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {GenericPopupComponent} from "../generic-popup/generic-popup.component";
import {PruebaMedicaService} from "../../services/prueba-medica.service";

@Component({
  selector: 'app-add-results-popup',
  templateUrl: './add-results-popup.component.html',
  styleUrls: ['./add-results-popup.component.css']
})
export class AddResultsPopupComponent implements OnInit {
  resultsURL: string = '';
  prueba: any;

  constructor(public dialogRef: MatDialogRef<AddResultsPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router,
              private dialog: MatDialog,
              private pruebasService: PruebaMedicaService) {
    this.prueba = data.data;

  }

  ngOnInit(): void {
    console.log(this.prueba);
  }

  addAndViewSolicitud() {
    if (this.resultsURL === '') {
      this.mostrarErrorPopup("Por favor, introduce la URL de los resultados de la prueba.");
      return;
    } else {
      console.log(this.resultsURL);
      this.prueba.resultadosUrl = this.resultsURL;
      this.pruebasService.addResultUrl(this.prueba.id, this.resultsURL).subscribe(() => {
        console.log(this.prueba);
        this.mostrarGenericPopup("Resultados añadidos correctamente.");
      })
    }
  }

  copiarURL() {
    navigator.clipboard.readText().then(text => {
      this.resultsURL = text;
    }).catch(err => {
      console.error('No se pudo acceder al portapapeles:', err);
    });
  }

  mostrarErrorPopup(mensaje: string): void {
    this.dialog.open(GenericPopupComponent, {
      width: '300px',
      data: {message: mensaje}
    });
  }

  mostrarGenericPopup(mensaje: string): void {
    const dialog = this.dialog.open(GenericPopupComponent, {
      width: '300px',
      data: {message: mensaje}
    });
    dialog.afterClosed().subscribe(() => {
      this.dialogRef.close();
      this.router.navigate(['/solicitud-detalles', {consulta: JSON.stringify(this.prueba.solicitudConsultaOutDto)}]);
    })
  }







}
