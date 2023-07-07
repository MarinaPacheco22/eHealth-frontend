import {Component, OnInit} from '@angular/core';
import {catchError, throwError} from "rxjs";
import {SolicitudService} from "../../services/solicitud.service";
import {GenericPopupComponent} from "../generic-popup/generic-popup.component";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent implements OnInit {

  consultaId: number;
  images: SafeUrl[] = [];


  constructor(private solicitudService: SolicitudService,
              private sanitizer: DomSanitizer,
              private dialog: MatDialog,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.consultaId = Number(params.get('consultaId'));
      this.solicitudService.getArchivosBySolicitudId(this.consultaId)
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
    });

  }

  mostrarGenericPopup(mensaje: string): void {
    this.dialog.open(GenericPopupComponent, {
      width: '300px',
      data: {message: mensaje}
    });
  }

}
