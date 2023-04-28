import { TestBed } from '@angular/core/testing';

import { DonationNoAnonymousPersoResolver } from './donation-no-anonymous-perso.resolver';

describe('DonationNoAnonymousPersoResolver', () => {
  let resolver: DonationNoAnonymousPersoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DonationNoAnonymousPersoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
