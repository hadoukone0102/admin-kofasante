import { TestBed } from '@angular/core/testing';

import { AdminInfoResolver } from './admin-info.resolver';

describe('AdminInfoResolver', () => {
  let resolver: AdminInfoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AdminInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
