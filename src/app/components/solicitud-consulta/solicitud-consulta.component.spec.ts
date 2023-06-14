import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SolicitudConsultaComponent} from './solicitud-consulta.component';

describe('SolicitudConsultaComponent', () => {
  let component: SolicitudConsultaComponent;
  let fixture: ComponentFixture<SolicitudConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudConsultaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
