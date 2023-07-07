import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesBusquedaFiltradaComponent } from './pacientes-busqueda-filtrada.component';

describe('PacientesBusquedaFiltradaComponent', () => {
  let component: PacientesBusquedaFiltradaComponent;
  let fixture: ComponentFixture<PacientesBusquedaFiltradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacientesBusquedaFiltradaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacientesBusquedaFiltradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
