import {Component, OnInit} from '@angular/core';
import {SolicitudService} from "../../services/solicitud.service";
import {RolService} from "../../services/rol.service";
import {catchError, throwError} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";
import {SolicitudDetailsPopupComponent} from "../solicitud-details-popup/solicitud-details-popup.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {

  showNavBar: boolean = true;
  consultas: any;
  user_id: number;
  user_type: string;
  noDataMessage: string = "No hay solicitudes para mostrar.";

  constructor(private solicitudService: SolicitudService,
              private rolService: RolService,
              private dialog: MatDialog,
              private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
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
        console.log(response.body);
        response.body.forEach((solicitud: any) => {
          solicitud.fecha.monthValue = this.format(solicitud.fecha.monthValue);
          solicitud.fecha.dayOfMonth = this.format(solicitud.fecha.dayOfMonth);
        })
        this.consultas = response.body;
      });
    } else {
      this.solicitudService.getSolicitudesByMedico(this.user_id)
        .pipe(
          catchError((error) => {
            alert(error.error);
            return throwError(error);
          })
        ).subscribe((response) => {
        console.log(response.body);
        response.body.forEach((solicitud: any) => {
          solicitud.fecha.monthValue = this.format(solicitud.fecha.monthValue);
          solicitud.fecha.dayOfMonth = this.format(solicitud.fecha.dayOfMonth);
        })
        this.consultas = response.body;
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
      this.solicitudService.getSolicitudesFiltradasByPaciente(this.user_id, filters.estado, filters.especialidad, filters.fecha).subscribe(
        (response) => {
          console.log(response.body);
          if (response.body != null) {
            response.body.forEach((solicitud: any) => {
              solicitud.fecha.monthValue = this.format(solicitud.fecha.monthValue);
              solicitud.fecha.dayOfMonth = this.format(solicitud.fecha.dayOfMonth);
            })
          }
          this.consultas = response.body;
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.solicitudService.getSolicitudesFiltradasByMedico(this.user_id, filters.nombre, filters.apellidos, filters.fecha).subscribe(
        (response) => {
          console.log(response.body);
          if (response.body != null) {
            response.body.forEach((solicitud: any) => {
              console.log(solicitud.fecha);
              solicitud.fecha.monthValue = this.format(solicitud.fecha.monthValue);
              solicitud.fecha.dayOfMonth = this.format(solicitud.fecha.dayOfMonth);
            })
          }
          this.consultas = response.body;
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
}
