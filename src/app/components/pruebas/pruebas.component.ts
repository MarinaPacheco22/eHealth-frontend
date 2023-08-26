import { Component, OnInit } from '@angular/core';
import {SolicitudService} from "../../services/solicitud.service";
import {RolService} from "../../services/rol.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {PruebaMedicaService} from "../../services/prueba-medica.service";
import {AddResultsPopupComponent} from "../add-results-popup/add-results-popup.component";

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css']
})
export class PruebasComponent implements OnInit {


  showNavBar: boolean = true;
  pruebas: any = [];
  user_id: number;
  user_type: string;
  noDataMessage: string = "No hay pruebas pendientes.";

  constructor(private solicitudService: SolicitudService,
              private rolService: RolService,
              private dialog: MatDialog,
              private router: Router,
              private pruebasService: PruebaMedicaService,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.user_id = Number(this.rolService.getUserId());
    this.user_type = this.rolService.getUserType();
    if (this.user_type === 'medico') {
      this.pruebasService.getPruebasWithoutResultsByMedico(this.user_id).subscribe((response) => {
        this.pruebas = response.body;
      });
    } else {
      this.pruebasService.getPruebasByPaciente(this.user_id).subscribe((response) => {
        console.log(response.body);
        this.pruebas = response.body;
      })
    }

  }

  addResults(prueba: any) {
    this.matDialog.open(AddResultsPopupComponent, {
      panelClass: 'dialog-center',
      data: {data: prueba}
    });
  }

  verResultados(prueba: any) {
    window.open(prueba.resultadosUrl, '_blank');
  }
}
