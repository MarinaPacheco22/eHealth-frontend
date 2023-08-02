import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pacientes-busqueda-filtrada',
  templateUrl: './pacientes-busqueda-filtrada.component.html',
  styleUrls: ['./pacientes-busqueda-filtrada.component.css']
})
export class PacientesBusquedaFiltradaComponent implements OnInit {

  nombre: string = '';
  apellidos: string = '';
  sexo: string = '';
  fumador: string = '';
  orderBy: string = '';

  ordenAscendente = true;

  @Output() searchFiltered = new EventEmitter<any>();

  opcionesOrdenar = [
    { valor: '', nombre: '' },
    { valor: 'nombre', nombre: 'Nombre' },
    { valor: 'apellidos', nombre: 'Apellidos' },
    { valor: 'fechaNacimiento', nombre: 'Fecha de nacimiento' },
    { valor: 'altura', nombre: 'Altura' },
    { valor: 'peso', nombre: 'Peso' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  realizarBusqueda() {
    const filtros = {
      nombre: this.nombre,
      apellidos: this.apellidos,
      sexo: this.sexo,
      fumador: this.fumador,
      orderBy: this.orderBy
    };
    this.searchFiltered.emit(filtros);
  }

  limpiarCampos() {
    this.nombre = '';
    this.apellidos = '';
    this.sexo = '';
    this.fumador = '';
    this.orderBy = '';
  }

  toggleOrden() {
    this.ordenAscendente = !this.ordenAscendente;
  }

}
