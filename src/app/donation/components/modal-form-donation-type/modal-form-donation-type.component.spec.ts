import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormDonationTypeTableComponent } from './modal-form-donation-type.component';

describe('ModalFormDonationTypeTableComponent', () => {
  let component: ModalFormDonationTypeTableComponent;
  let fixture: ComponentFixture<ModalFormDonationTypeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFormDonationTypeTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFormDonationTypeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
