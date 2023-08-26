import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResultsPopupComponent } from './add-results-popup.component';

describe('AddResultsPopupComponent', () => {
  let component: AddResultsPopupComponent;
  let fixture: ComponentFixture<AddResultsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddResultsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddResultsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
