import { TestBed } from '@angular/core/testing';

import { ListDisabledCountAdminResolver } from './list-disabled-account-admin.resolver';

describe('ListDisabledCountAdminResolver', () => {
  let resolver: ListDisabledCountAdminResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListDisabledCountAdminResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
