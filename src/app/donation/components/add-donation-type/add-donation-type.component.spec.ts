import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDonationTypeComponent } from './add-donation-type.component';

describe('AddDonationTypeComponent', () => {
  let component: AddDonationTypeComponent;
  let fixture: ComponentFixture<AddDonationTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDonationTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDonationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
