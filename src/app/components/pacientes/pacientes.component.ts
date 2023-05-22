import { Component, OnInit } from '@angular/core';
import {PacientesService} from "../../services/pacientes.service";
import {catchError, throwError} from "rxjs";
import {RolService} from "../../services/rol.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {HistorialClinicoPopupComponent} from "../historial-clinico-popup/historial-clinico-popup.component";

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  public pacientesAsignados: any;
  public medicoId: number = 8;
  showNavBar: boolean = true;

  constructor(
    private pacientesService: PacientesService,
    private rolService: RolService,
    private router: Router,
    private dialog: MatDialog
  ) {
  }

  getPacientesAsignados() {
    this.pacientesAsignados = [];
    if (this.rolService.getUserType() == 'admin') {
      this.pacientesService.getAllPacientes()
        .pipe(
          catchError((error) => {
            alert(error.error);
            return throwError(error);
          })
        )
        .subscribe(response => {
          console.log(response.body);
          this.pacientesAsignados = response.body;
        });
    } else {
      this.pacientesService.getPacientesByMedico(this.medicoId)
        .pipe(
          catchError((error) => {
            alert(error.error);
            return throwError(error);
          })
        )
        .subscribe(response => {
          this.pacientesAsignados = response.body;
        });
    }
  }

  ngOnInit(): void {
    this.rolService.setUserType('admin');
    this.getPacientesAsignados();
  }

  mostrarHistorial() {
    this.dialog.open(HistorialClinicoPopupComponent, {
      panelClass: 'dialog-center'
    });
  }
}
