import { TestBed } from '@angular/core/testing';

import { DonationNoAnonymousOrgaResolver } from './donation-no-anonymous-orga.resolver';

describe('DonationNoAnonymousOrgaResolver', () => {
  let resolver: DonationNoAnonymousOrgaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DonationNoAnonymousOrgaResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
