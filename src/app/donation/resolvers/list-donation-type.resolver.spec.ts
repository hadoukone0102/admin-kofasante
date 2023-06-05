import { TestBed } from '@angular/core/testing';

import { ListDonationTypeResolver } from './list-donation-type.resolver';

describe('ListDonationTypeResolver', () => {
  let resolver: ListDonationTypeResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListDonationTypeResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
