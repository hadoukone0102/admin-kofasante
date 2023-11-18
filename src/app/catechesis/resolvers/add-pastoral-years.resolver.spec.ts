import { TestBed } from '@angular/core/testing';

import { AddPastoralYearsResolver } from './add-pastoral-years.resolver';

describe('AddPastoralYearsResolver', () => {
  let resolver: AddPastoralYearsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AddPastoralYearsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
