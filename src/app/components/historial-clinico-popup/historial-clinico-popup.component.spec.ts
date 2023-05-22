import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialClinicoPopupComponent } from './historial-clinico-popup.component';

describe('HistorialClinicoPopupComponent', () => {
  let component: HistorialClinicoPopupComponent;
  let fixture: ComponentFixture<HistorialClinicoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialClinicoPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialClinicoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
