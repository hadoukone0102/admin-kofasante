import { TestBed } from '@angular/core/testing';

import { ListAdminTypesResolver } from './list-admin-types.resolver';

describe('ListAdminTypesResolver', () => {
  let resolver: ListAdminTypesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListAdminTypesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
