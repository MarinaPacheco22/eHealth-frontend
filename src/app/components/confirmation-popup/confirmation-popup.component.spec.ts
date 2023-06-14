import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ComfirmationPopupComponent} from './confirmation-popup.component';

describe('ComfirmationPopupComponent', () => {
  let component: ComfirmationPopupComponent;
  let fixture: ComponentFixture<ComfirmationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComfirmationPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComfirmationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
