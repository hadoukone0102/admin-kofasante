import { TestBed } from '@angular/core/testing';

import { DisabledDonationTypeResolver } from './disabled-donation-type.resolver';

describe('DisabledDonationTypeResolver', () => {
  let resolver: DisabledDonationTypeResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DisabledDonationTypeResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
