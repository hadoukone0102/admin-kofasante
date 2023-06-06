import { TestBed } from '@angular/core/testing';

import { DonationTypeByIdResolver } from './donation-type-by-id.resolver';

describe('DonationTypeByIdResolver', () => {
  let resolver: DonationTypeByIdResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DonationTypeByIdResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
