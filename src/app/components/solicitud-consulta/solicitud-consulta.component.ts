import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {Solicitud} from "../../model/solicitud.model";
import {GenericPopupComponent} from "../generic-popup/generic-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {RolService} from "../../services/rol.service";
import {SolicitudService} from "../../services/solicitud.service";


@Component({
  selector: 'app-solicitud-consulta',
  templateUrl: './solicitud-consulta.component.html',
  styleUrls: ['./solicitud-consulta.component.css']
})
export class SolicitudConsultaComponent {
  @ViewChild('adjuntosInput') adjuntosInput: ElementRef | undefined;
  solicitud: Solicitud;
  adjuntos: File[] = [];
  showNavBar: boolean = true;

  constructor(private router: Router,
              private dialog: MatDialog,
              private rolService: RolService,
              private solicitudService: SolicitudService) {
    this.solicitud = new Solicitud();
  }

  enviarSolicitud() {
    if (this.solicitud.descripcion == null || this.solicitud.descripcion == '') {
      this.mostrarGenericPopup("Por favor, complete el campo de descripcion de dolencias.")
    } else {
      const formDataSolicitud = new FormData();
      formDataSolicitud.append('descripcion', this.solicitud.descripcion);
      formDataSolicitud.append('pacienteId', this.rolService.getUserId());
      formDataSolicitud.append('medicoId', this.rolService.getMedicoAsignadoId());

      for (let i = 0; i < this.adjuntos.length; i++) {
        let archivo = this.adjuntos[i];
        formDataSolicitud.append('archivos', archivo);
      }
      formDataSolicitud.forEach(function(value, key) {
        console.log(key + ': ' + value);
      });
      try {
        this.solicitudService.createSolicitud(formDataSolicitud);
        this.router.navigate(['/consultas']);
        this.mostrarGenericPopup("Solicitud de consulta enviada correctamente.");
      } catch (e) {
        this.mostrarGenericPopup("Ha ocurrido un error al enviar la solicitud de consulta.");
      }
    }

  }

  adjuntosSeleccionados(files: FileList | null) {
    if (files && files.length > 0) {
      this.adjuntos = Array.from(files);
    } else {
      this.adjuntos = [];
    }
  }

  limpiarAdjuntos() {
    this.adjuntos = [];
    if (this.adjuntosInput) {
      this.adjuntosInput.nativeElement.value = '';
    }
  }

  back() {
    return this.router.navigate(['/consultas'])
  }

  eliminarAdjunto(index: number) {
    this.adjuntos.splice(index, 1);
  }

  mostrarGenericPopup(mensaje: string): void {
    const dialogRef = this.dialog.open(GenericPopupComponent, {
      width: '300px',
      data: {message: mensaje}
    });

    dialogRef.afterClosed().subscribe(() => {
      location.reload();
    })
  }
}
