import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-consultas-busqueda-filtrada',
  templateUrl: './consultas-busqueda-filtrada.component.html',
  styleUrls: ['./consultas-busqueda-filtrada.component.css']
})
export class ConsultasBusquedaFiltradaComponent implements OnInit {

  estado: string = '';
  especialidad: string = '';
  fecha: string = '';
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

  constructor() { }

  ngOnInit(): void {
  }

  realizarBusqueda() {
    const filtros = {
      estado: this.estado,
      especialidad: this.especialidad,
      fecha: this.fecha
    };
    this.searchFiltered.emit(filtros);
  }

  limpiarCampos() {
    this.estado = null;
    this.especialidad = null;
    this.fecha = null;
  }
}
