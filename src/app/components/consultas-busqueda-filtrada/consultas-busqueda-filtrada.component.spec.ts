import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasBusquedaFiltradaComponent } from './consultas-busqueda-filtrada.component';

describe('BusquedaFiltradaComponent', () => {
  let component: ConsultasBusquedaFiltradaComponent;
  let fixture: ComponentFixture<ConsultasBusquedaFiltradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultasBusquedaFiltradaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultasBusquedaFiltradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
