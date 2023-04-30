import { TestBed } from '@angular/core/testing';

import { ListNoAnonymousOrgaResolver } from './list-no-anonymous-orga.resolver';

describe('ListNoAnonymousOrgaResolver', () => {
  let resolver: ListNoAnonymousOrgaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListNoAnonymousOrgaResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
