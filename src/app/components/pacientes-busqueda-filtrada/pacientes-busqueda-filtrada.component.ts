import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pacientes-busqueda-filtrada',
  templateUrl: './pacientes-busqueda-filtrada.component.html',
  styleUrls: ['./pacientes-busqueda-filtrada.component.css']
})
export class PacientesBusquedaFiltradaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  nombre: string = '';
  apellidos: string = '';
  sexo: string = '';
  fumador: boolean;

  @Output() searchFiltered = new EventEmitter<any>();

  realizarBusqueda() {
    const filtros = {
      nombre: this.nombre,
      apellidos: this.apellidos,
      sexo: this.sexo,
      fumador: this.fumador
    };
    this.searchFiltered.emit(filtros);
  }

  limpiarCampos() {
    this.nombre = '';
    this.apellidos = '';
    this.sexo = '';
    this.fumador = null;
  }

}
