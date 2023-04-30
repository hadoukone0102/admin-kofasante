import { TestBed } from '@angular/core/testing';

import { ListNoAnonymousPersoResolver } from './list-no-anonymous-perso.resolver';

describe('ListNoAnonymousPersoResolver', () => {
  let resolver: ListNoAnonymousPersoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListNoAnonymousPersoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
