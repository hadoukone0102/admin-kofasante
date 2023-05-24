import { TestBed } from '@angular/core/testing';

import { ListBasketDonationResolver } from './list-basket-donation.resolver';

describe('ListBasketDonationResolver', () => {
  let resolver: ListBasketDonationResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListBasketDonationResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
