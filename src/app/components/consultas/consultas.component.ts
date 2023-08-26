import {Component, OnInit} from '@angular/core';
import {SolicitudService} from "../../services/solicitud.service";
import {RolService} from "../../services/rol.service";
import {catchError, throwError} from "rxjs";
import {Router} from "@angular/router";
import {SolicitudDetailsPopupComponent} from "../solicitud-details-popup/solicitud-details-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationPopupComponent} from "../confirmation-popup/confirmation-popup.component";
import {GenericPopupComponent} from "../generic-popup/generic-popup.component";

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {

  showNavBar: boolean = true;
  consultas: any = [];
  user_id: number;
  user_type: string;
  noDataMessage: string = "No hay solicitudes para mostrar.";

  constructor(private solicitudService: SolicitudService,
              private rolService: RolService,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {
    this.user_id = Number(this.rolService.getUserId());
    this.user_type = this.rolService.getUserType();
    if (this.user_type == 'paciente') {
      this.solicitudService.getSolicitudesByPaciente(this.user_id)
        .pipe(
          catchError((error) => {
            alert(error.error);
            return throwError(error);
          })
        ).subscribe((response) => {
        this.consultas = [];
        response.body.forEach((solicitud: any) => {
          solicitud.fecha.monthValue = this.format(solicitud.fecha.monthValue);
          solicitud.fecha.dayOfMonth = this.format(solicitud.fecha.dayOfMonth);
          switch (solicitud.estado) {
            case 'SOLICITUD_ENVIADA':
              solicitud.estado = "Solicitud enviada";
              break;
            case 'SOLICITUD_CERRADA':
              solicitud.estado = "Solicitud cerrada";
              break;
            case 'DERIVACION':
              solicitud.estado = "Solicitud derivada";
              break;
          }
          this.consultas.push(solicitud);
        })
      });
    } else {
      this.solicitudService.getSolicitudesByMedico(this.user_id)
        .pipe(
          catchError((error) => {
            alert(error.error);
            return throwError(error);
          })
        ).subscribe((response) => {
        this.consultas = [];
        console.log(response.body);
        response.body.forEach((solicitud: any) => {
          solicitud.fecha.monthValue = this.format(solicitud.fecha.monthValue);
          solicitud.fecha.dayOfMonth = this.format(solicitud.fecha.dayOfMonth);
          switch (solicitud.estado) {
            case 'SOLICITUD_ENVIADA':
              solicitud.estado = "Solicitud enviada";
              break;
            case 'SOLICITUD_CERRADA':
              solicitud.estado = "Solicitud cerrada";
              break;
            case 'DERIVACION':
              solicitud.estado = "Solicitud derivada";
              break;
          }
          this.consultas.push(solicitud);
        })
      });
    }
  }

  nuevaSolicitud() {
    this.router.navigate([('/solicitud-consulta')]);

  }

  verDetalles(consulta: any) {
    const dialogRef = this.dialog.open(SolicitudDetailsPopupComponent, {
      panelClass: 'dialog-center',
      data: consulta
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  verSolicitud(consulta: any) {
    this.router.navigate(['/solicitud-detalles', {consulta: JSON.stringify(consulta)}])
  }

  realizarBusquedaFiltrada(filters: any) {
    if (this.user_type == 'paciente') {
      console.log(filters.estado);
      this.solicitudService.getSolicitudesFiltradasByPaciente(this.user_id, filters.estado, filters.especialidad, filters.fecha).subscribe(
        (response) => {
          if (response.body != null) {
            this.consultas = [];
            response.body.forEach((solicitud: any) => {
              solicitud.fecha.monthValue = this.format(solicitud.fecha.monthValue);
              solicitud.fecha.dayOfMonth = this.format(solicitud.fecha.dayOfMonth);
              switch (solicitud.estado) {
                case 'SOLICITUD_ENVIADA':
                  solicitud.estado = "Solicitud enviada";
                  break;
                case 'SOLICITUD_CERRADA':
                  solicitud.estado = "Solicitud cerrada";
                  break;
                case 'DERIVACION':
                  solicitud.estado = "Solicitud derivada";
                  break;
              }
              this.consultas.push(solicitud);
            })
          }
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.solicitudService.getSolicitudesAbiertasFiltradasByMedico(this.user_id, filters.nombre, filters.apellidos, filters.fecha).subscribe(
        (response) => {
          if (response.body != null) {
            this.consultas = [];
            response.body.forEach((solicitud: any) => {
              solicitud.fecha.monthValue = this.format(solicitud.fecha.monthValue);
              solicitud.fecha.dayOfMonth = this.format(solicitud.fecha.dayOfMonth);
              switch (solicitud.estado) {
                case 'SOLICITUD_ENVIADA':
                  solicitud.estado = "Solicitud enviada";
                  break;
                case 'SOLICITUD_CERRADA':
                  solicitud.estado = "Solicitud cerrada";
                  break;
                case 'DERIVACION':
                  solicitud.estado = "Solicitud derivada";
                  break;
              }
              this.consultas.push(solicitud);
            })
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  private format(number: any) {
    const value = number;
    if (value < 10) {
      return '0' + value;
    } else {
      return value.toString();
    }
  }

  eliminarSolicitud(solicitud: any) {
    const dialogRef = this.mostrarConfirmationPopup("eliminar esta solicitud");
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.solicitudService.deleteSolicitud(solicitud.id).subscribe(() => {
          this.mostrarGenericPopup("Solicitud eliminada correctamente.");
        })
      }
    })
  }

  mostrarConfirmationPopup(mensaje: string) {
    return this.dialog.open(ConfirmationPopupComponent, {
      width: '300px',
      data: {message: mensaje}
    });
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
