import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MedicoDetailsPopupComponent} from './medico-details-popup.component';

describe('MedicoDetailsPopupComponent', () => {
  let component: MedicoDetailsPopupComponent;
  let fixture: ComponentFixture<MedicoDetailsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicoDetailsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicoDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
