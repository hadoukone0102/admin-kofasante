import { TestBed } from '@angular/core/testing';

import { DonationNotifResolver } from './donation-notif.resolver';

describe('DonationNotifResolver', () => {
  let resolver: DonationNotifResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DonationNotifResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
