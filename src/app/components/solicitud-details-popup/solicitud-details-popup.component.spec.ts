import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SolicitudDetailsPopupComponent} from './solicitud-details-popup.component';

describe('SolicitudDetailsPopupComponent', () => {
  let component: SolicitudDetailsPopupComponent;
  let fixture: ComponentFixture<SolicitudDetailsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudDetailsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
