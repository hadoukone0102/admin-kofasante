import { TestBed } from '@angular/core/testing';

import { ListAllResolver } from './list-all.resolver';

describe('ListAllResolver', () => {
  let resolver: ListAllResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListAllResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
