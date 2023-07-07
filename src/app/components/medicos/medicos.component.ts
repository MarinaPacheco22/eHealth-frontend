import {Component, OnInit} from '@angular/core';
import {RolService} from "../../services/rol.service";
import {catchError, throwError} from "rxjs";
import {MedicosService} from "../../services/medicos.service";
import {MatDialog} from "@angular/material/dialog";
import {MedicoDetailsPopupComponent} from "../medico-details-popup/medico-details-popup.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {

  public medicos: any;
  showNavBar: boolean = true;
  modo: string
  noDataMessage: string;

  constructor(
    private medicosService: MedicosService,
    private rolService: RolService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
  }

  getMedicos() {
    this.medicos = [];
    this.route.queryParams.subscribe(params => {
      this.modo = params['modo'];

      if (this.modo === 'medicos') {
        this.noDataMessage = "No hay medicos para mostrar.";
        this.medicosService.getAllMedicos()
        .pipe(
          catchError((error) => {
            alert(error.error);
            return throwError(error);
          })
        )
        .subscribe(response => {
          console.log(response.body);
          this.medicos = response.body;
        });

      } else if (this.modo === 'solicitudes') {
        this.noDataMessage = "No hay solicitudes pendientes.";
        this.medicosService.getDesactivatedMedicos()
          .pipe(
            catchError((error) => {
              alert(error.error);
              return throwError(error);
            })
          )
          .subscribe(response => {
            this.medicos = response.body;
          });
      }
    });

  }

  ngOnInit(): void {
    this.getMedicos();
  }

  revisar(medico: any) {
    const dialogRef = this.dialog.open(MedicoDetailsPopupComponent, {
      panelClass: 'dialog-center',
      data: medico
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });

  }

  isEmpty() {
    return this.medicos.length == 0;
  }


  realizarBusquedaFiltrada(filters: any) {
    this.medicosService.getMedicosFiltrados(filters.nombre, filters.apellidos, filters.especialidad, filters.activo).subscribe(
      (response) => {
        this.medicos = response.body;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
