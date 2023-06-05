import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDonationTypeComponent } from './edit-donation-type.component';

describe('EditDonationTypeComponent', () => {
  let component: EditDonationTypeComponent;
  let fixture: ComponentFixture<EditDonationTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDonationTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDonationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
