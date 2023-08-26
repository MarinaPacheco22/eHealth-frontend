import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RolService} from "../../services/rol.service";

@Component({
  selector: 'app-consultas-busqueda-filtrada',
  templateUrl: './consultas-busqueda-filtrada.component.html',
  styleUrls: ['./consultas-busqueda-filtrada.component.css']
})
export class ConsultasBusquedaFiltradaComponent implements OnInit {

  nombre: string = '';
  apellidos: string = '';
  estado: string = '';
  especialidad: string = '';
  fecha: string = '';
  user_type: string;
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

  constructor(public rolService: RolService) { }

  ngOnInit(): void {
    this.user_type = this.rolService.getUserType();
  }

  realizarBusqueda() {
    const filtros = {
      nombre: this.nombre,
      apellidos: this.apellidos,
      estado: this.estado,
      especialidad: this.especialidad,
      fecha: this.fecha
    };
    this.searchFiltered.emit(filtros);
  }

  limpiarCampos() {
    this.nombre = '';
    this.apellidos = '';
    this.estado = '';
    this.especialidad = '';
    this.fecha = '';
  }
}
