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
  paciente_id: number;
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
    this.paciente_id = Number(this.rolService.getUserId());
    this.solicitudService.getSolicitudesByPaciente(this.paciente_id)
      .pipe(
        catchError((error) => {
          alert(error.error);
          return throwError(error);
        })
      ).subscribe((response) => {
        response.body.forEach((solicitud:any) => {
          solicitud.fecha.monthValue = this.formatMonth(solicitud.fecha);
        })
      this.consultas = response.body;
    });
  }

  nuevaSolicitud() {
    this.router.navigate([('/solicitud-consulta')]);
  }

  showDetails(consulta: any) {
    const dialogRef = this.dialog.open(SolicitudDetailsPopupComponent, {
      panelClass: 'dialog-center',
      data: consulta
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  realizarBusquedaFiltrada(filters: any) {
    this.solicitudService.getSolicitudesFiltradasByPaciente(this.paciente_id, filters.estado, filters.especialidad, filters.fecha).subscribe(
      (response) => {
        console.log(response.body);
        if (response.body != null) {
          response.body.forEach((solicitud:any) => {
            solicitud.fecha.monthValue = this.formatMonth(solicitud.fecha);
          })
        }
        this.consultas = response.body;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  private formatMonth(date: any) {
    const monthValue = date.monthValue;
    if (monthValue < 10) {
      return '0' + monthValue;
    } else {
      return monthValue.toString();
    }
  }
}
