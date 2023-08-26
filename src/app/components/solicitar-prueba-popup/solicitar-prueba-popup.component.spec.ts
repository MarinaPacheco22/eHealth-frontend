import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarPruebaPopupComponent } from './solicitar-prueba-popup.component';

describe('SolicitarPruebaPopupComponent', () => {
  let component: SolicitarPruebaPopupComponent;
  let fixture: ComponentFixture<SolicitarPruebaPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitarPruebaPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitarPruebaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
