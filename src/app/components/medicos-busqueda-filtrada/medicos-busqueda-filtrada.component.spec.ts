import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicosBusquedaFiltradaComponent } from './medicos-busqueda-filtrada.component';

describe('MedicosBusquedaFiltradaComponent', () => {
  let component: MedicosBusquedaFiltradaComponent;
  let fixture: ComponentFixture<MedicosBusquedaFiltradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicosBusquedaFiltradaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicosBusquedaFiltradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
