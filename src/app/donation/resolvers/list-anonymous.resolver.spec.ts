import { TestBed } from '@angular/core/testing';

import { ListAnonymousResolver } from './list-anonymous.resolver';

describe('ListAnonymousResolver', () => {
  let resolver: ListAnonymousResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListAnonymousResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
