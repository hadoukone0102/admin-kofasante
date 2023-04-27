import { TestBed } from '@angular/core/testing';

import { DonationsResolver } from './donations.resolver';

describe('DonationsResolver', () => {
  let resolver: DonationsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DonationsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
