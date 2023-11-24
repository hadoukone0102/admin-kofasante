import { TestBed } from '@angular/core/testing';

import { CatechesisAdultResolver } from './catechesis-adult.resolver';

describe('CatechesisAdultResolver', () => {
  let resolver: CatechesisAdultResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CatechesisAdultResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
