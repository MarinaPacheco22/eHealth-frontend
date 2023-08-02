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
  files: SafeUrl[] = [];


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
          console.log(response.body);
          if (response.body == null) {
            this.mostrarGenericPopup("No hay archivos incluidos en esta solicitud.")
          } else {
            response.body.forEach((entry: any) => {
              const bytes = entry.bytes;
              let objectURL;
              if (entry.tipoContenido == 'video/mp4') {
                objectURL = 'data:video/mp4;base64,' + bytes;
              } else {
                objectURL = 'data:image/jpeg;base64,' + bytes;
              }
              let file = this.sanitizer.bypassSecurityTrustUrl(objectURL);
              this.files.push(file);
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

  isImage(file: SafeUrl): boolean {
    return file.toString().includes('data:image');
  }

  isVideo(file: SafeUrl): boolean {
    return file.toString().includes('data:video');
  }


}
