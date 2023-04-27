import { TestBed } from '@angular/core/testing';

import { AdminsResolver } from './admins.resolver';

describe('AdminsResolver', () => {
  let resolver: AdminsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AdminsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
