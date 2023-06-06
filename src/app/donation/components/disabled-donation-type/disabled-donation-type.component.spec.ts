import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisabledDonationTypeComponent } from './disabled-donation-type.component';

describe('DisabledDonationTypeComponent', () => {
  let component: DisabledDonationTypeComponent;
  let fixture: ComponentFixture<DisabledDonationTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisabledDonationTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisabledDonationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
