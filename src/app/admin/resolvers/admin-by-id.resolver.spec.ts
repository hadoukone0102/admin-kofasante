import { TestBed } from '@angular/core/testing';

import { AdminByIdResolver } from './admin-by-id.resolver';

describe('AdminByIdResolver', () => {
  let resolver: AdminByIdResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AdminByIdResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
