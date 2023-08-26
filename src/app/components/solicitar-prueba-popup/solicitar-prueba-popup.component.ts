import {Component, Inject, OnInit} from '@angular/core';
import {PruebaMedicaService} from "../../services/prueba-medica.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {GenericPopupComponent} from "../generic-popup/generic-popup.component";

@Component({
  selector: 'app-solicitar-prueba-popup',
  templateUrl: './solicitar-prueba-popup.component.html',
  styleUrls: ['./solicitar-prueba-popup.component.css']
})
export class SolicitarPruebaPopupComponent implements OnInit {

  solicitud: any;
  nuevaPruebaNombre: string = '';
  pruebas: { nombre: string, seleccionada: boolean, fechaCita: any, consulta: string }[] = [
    { nombre: 'Hemograma completo (CBC)', seleccionada: false, fechaCita: null, consulta: '' },
    { nombre: 'Perfil de lípidos', seleccionada: false, fechaCita: null, consulta: '' },
    { nombre: 'Prueba de función hepática', seleccionada: false, fechaCita: null, consulta: '' },
    { nombre: 'Prueba de función renal', seleccionada: false, fechaCita: null, consulta: '' },
    { nombre: 'Electrocardiograma (ECG o EKG)', seleccionada: false, fechaCita: null, consulta: '' },
    { nombre: 'Tomografía computarizada (TC)', seleccionada: false, fechaCita: null, consulta: '' },
    { nombre: 'Resonancia magnética (RM)', seleccionada: false, fechaCita: null, consulta: '' },
    { nombre: 'Colonoscopia', seleccionada: false, fechaCita: null, consulta: '' },
    { nombre: 'Endoscopia', seleccionada: false, fechaCita: null, consulta: '' },
    { nombre: 'Prueba de esfuerzo', seleccionada: false, fechaCita: null, consulta: '' },
    { nombre: 'Mamografía', seleccionada: false, fechaCita: null, consulta: '' },
    { nombre: 'Ecografía', seleccionada: false, fechaCita: null, consulta: '' },
    { nombre: 'Prueba de Papanicolaou (Pap)', seleccionada: false, fechaCita: null, consulta: '' },
    { nombre: 'Radiografía', seleccionada: false, fechaCita: null, consulta: '' },
    { nombre: 'Análisis de orina', seleccionada: false, fechaCita: null, consulta: '' },
    { nombre: 'Prueba de sangre oculta en heces', seleccionada: false, fechaCita: null, consulta: '' },
    { nombre: 'Pruebas de alergia', seleccionada: false, fechaCita: null, consulta: '' },
    { nombre: 'Pruebas de función pulmonar', seleccionada: false, fechaCita: null, consulta: '' },
    { nombre: 'Prueba de glucosa en sangre', seleccionada: false, fechaCita: null, consulta: '' }
  ];

  constructor(public dialogRef: MatDialogRef<SolicitarPruebaPopupComponent>,
              public pruebaService: PruebaMedicaService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog) {
    this.solicitud = data.consulta;
}

  ngOnInit(): void {
  }

  agregarPrueba() {
    if (this.nuevaPruebaNombre.trim() !== '') {
      this.pruebas.push({ nombre: this.nuevaPruebaNombre, seleccionada: true, fechaCita: null, consulta: ''});
      this.nuevaPruebaNombre = '';
    }
  }

  solicitar() {
    const pruebasSeleccionadas = this.pruebas.filter(prueba => prueba.seleccionada);
    pruebasSeleccionadas.forEach(pruebaSeleccionada => {
      const toCreate = {
        prueba: pruebaSeleccionada.nombre,
        fechaHoraCita: pruebaSeleccionada.fechaCita,
        solicitudId: this.solicitud.id,
        consulta: pruebaSeleccionada.consulta
      };
      this.pruebaService.createPrueba(toCreate).subscribe(
        () => {
          this.mostrarGenericPopup("Prueba pedida con éxito.")
          this.dialogRef.close();
        },
        () => {
          console.error("Error al pedir la prueba.")
        }
      );
    });
  }

  mostrarGenericPopup(mensaje: string): void {
    this.dialog.open(GenericPopupComponent, {
      width: '300px',
      data: {message: mensaje}
    });
  }
}
