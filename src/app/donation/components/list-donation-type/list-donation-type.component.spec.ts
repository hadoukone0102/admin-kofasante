import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDonationTypeComponent } from './list-donation-type.component';

describe('ListDonationTypeComponent', () => {
  let component: ListDonationTypeComponent;
  let fixture: ComponentFixture<ListDonationTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDonationTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDonationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
