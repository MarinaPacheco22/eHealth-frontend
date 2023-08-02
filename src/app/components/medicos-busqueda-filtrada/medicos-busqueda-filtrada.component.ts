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
  orderBy: string = '';

  @Output() searchFiltered = new EventEmitter<any>();

  especialidades: string[] = [
    'Alergología',
    'Cardiología',
    'Dermatología',
    'Endocrinología',
    'Gastroenterología',
    'Hematología',
    'Infectología',
    'Medicina familiar',
    'Neumología',
    'Neurología',
    'Oftalmología',
    'Oncología',
    'Ortopedia',
    'Otorrinolaringología',
    'Pediatría',
    'Psicología',
    'Psiquiatría',
    'Radiología',
    'Reumatología',
    'Urología'
  ];

  opcionesOrdenar = [
    { valor: '', nombre: '' },
    { valor: 'nombre', nombre: 'Nombre' },
    { valor: 'apellidos', nombre: 'Apellidos' },
    { valor: 'especialidad', nombre: 'Especialidad' },
  ];

  constructor() {}

  ngOnInit(): void {
  }


  realizarBusqueda() {
    const filtros = {
      nombre: this.nombre,
      apellidos: this.apellidos,
      especialidad: this.especialidad,
      activo: this.activo,
      orderBy: this.orderBy
    };
    this.searchFiltered.emit(filtros);
  }

  limpiarCampos() {
    this.nombre = '';
    this.apellidos = '';
    this.especialidad = '';
    this.activo = '';
    this.orderBy = '';
  }

}
