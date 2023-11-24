import { TestBed } from '@angular/core/testing';

import { ListCatechesisResolver } from './list-catechesis.resolver';

describe('ListCatechesisResolver', () => {
  let resolver: ListCatechesisResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListCatechesisResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
