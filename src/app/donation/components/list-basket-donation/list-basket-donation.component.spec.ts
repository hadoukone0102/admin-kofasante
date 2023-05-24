import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBasketDonationComponent } from './list-basket-donation.component';

describe('ListBasketDonationComponent', () => {
  let component: ListBasketDonationComponent;
  let fixture: ComponentFixture<ListBasketDonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBasketDonationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBasketDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
