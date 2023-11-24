import { TestBed } from '@angular/core/testing';

import { CatechesisYoungResolver } from './catechesis-young.resolver';

describe('CatechesisYoungResolver', () => {
  let resolver: CatechesisYoungResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CatechesisYoungResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
