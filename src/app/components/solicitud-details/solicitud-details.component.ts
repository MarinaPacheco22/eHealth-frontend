import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {GenericPopupComponent} from "../generic-popup/generic-popup.component";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, throwError} from "rxjs";
import {SolicitudService} from "../../services/solicitud.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {MedicoDetailsPopupComponent} from "../medico-details-popup/medico-details-popup.component";
import {ResponsePopupComponent} from "../response-popup/response-popup.component";

@Component({
  selector: 'app-solicitud-details',
  templateUrl: './solicitud-details.component.html',
  styleUrls: ['./solicitud-details.component.css']
})
export class SolicitudDetailsComponent implements OnInit {

  consulta: any;
  anyArchivo: boolean;
  images: SafeUrl[] = [];

  constructor(private dialog: MatDialog,
              private route: ActivatedRoute,
              private solicitudService: SolicitudService,
              private sanitizer: DomSanitizer,
              private router: Router) {
  }

  ngOnInit(): void {
    const consultaParam = this.route.snapshot.paramMap.get('consulta');
    let consulta = JSON.parse(consultaParam);
    consulta.pacienteOutDto.fechaNacimiento = this.formatearFecha(consulta.pacienteOutDto.fechaNacimiento);
    this.consulta = consulta;
    this.anyArchivo = this.consulta.numArchivos != 0;
    if (this.anyArchivo) {
      this.solicitudService.getArchivosBySolicitudId(this.consulta.id)
        .pipe(
          catchError((error) => {
            this.mostrarGenericPopup("Error al cargar los archivos")
            return throwError(error);
          })
        )
        .subscribe((response) => {
          if (response.body == null) {
            this.mostrarGenericPopup("No hay archivos incluidos en esta solicitud.")
          } else {
            response.body.forEach((entry: any) => {
              const bytes = entry.archivo.bytes;
              let objectURL = 'data:image/jpeg;base64,' + bytes;
              let image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
              this.images.push(image);
            })

          }
        })
    }
  }


  mostrarGenericPopup(mensaje: string): void {
    this.dialog.open(GenericPopupComponent, {
      width: '300px',
      data: {message: mensaje}
    });
  }

  responder() {
    this.dialog.open(ResponsePopupComponent, {
      panelClass: 'dialog-center',
      data: this.consulta
    });
  }

  derivar() {

  }

  solicitarPrueba() {

  }

  back() {
    this.router.navigate(['/consultas']);
  }

  formatearFecha(fecha: string) {
    const [day, month, year] = fecha.split('-');
    const diaConCeros = day.padStart(2, '0');
    const mesConCeros = month.padStart(2, '0');
    return `${diaConCeros}-${mesConCeros}-${year}`;
  }
}
