import { TestBed } from '@angular/core/testing';

import { ListPastoralYearsResolver } from './list-pastoral-years.resolver';

describe('ListPastoralYearsResolver', () => {
  let resolver: ListPastoralYearsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListPastoralYearsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
