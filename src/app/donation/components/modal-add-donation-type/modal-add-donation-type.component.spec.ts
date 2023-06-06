import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddDonationTypeComponent } from './modal-add-donation-type.component';

describe('ModalAddDonationTypeComponent', () => {
  let component: ModalAddDonationTypeComponent;
  let fixture: ComponentFixture<ModalAddDonationTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddDonationTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddDonationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
