import { TestBed } from '@angular/core/testing';

import { AdminNotifResolver } from './admin-notif.resolver';

describe('AdminNotifResolver', () => {
  let resolver: AdminNotifResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AdminNotifResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
