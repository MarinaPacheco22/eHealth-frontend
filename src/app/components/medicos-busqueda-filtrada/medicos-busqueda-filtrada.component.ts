import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-medicos-busqueda-filtrada',
  templateUrl: './medicos-busqueda-filtrada.component.html',
  styleUrls: ['./medicos-busqueda-filtrada.component.css']
})
export class MedicosBusquedaFiltradaComponent implements OnInit {

  nombre: string = '';
  apellidos: string = '';
  especialidad: string = '';
  activo: string = '';

  @Output() searchFiltered = new EventEmitter<any>();

  especialidades: string[] = [
    'Alergologia',
    'Cardiologia',
    'Dermatologia',
    'Endocrinologia',
    'Gastroenterologia',
    'Hematologia',
    'Infectologia',
    'Medicina familiar',
    'Neumologia',
    'Neurologia',
    'Oftalmologia',
    'Oncologia',
    'Ortopedia',
    'Otorrinolaringologia',
    'Pediatria',
    'Psicologia',
    'Psiquiatria',
    'Radiologia',
    'Reumatologia',
    'Urologia'
  ];

  constructor() {}

  ngOnInit(): void {
  }


  realizarBusqueda() {
    const filtros = {
      nombre: this.nombre,
      apellidos: this.apellidos,
      especialidad: this.especialidad,
      activo: this.activo
    };
    this.searchFiltered.emit(filtros);
  }

  limpiarCampos() {
    this.nombre = '';
    this.apellidos = '';
    this.especialidad = '';
    this.activo = '';
  }

}
