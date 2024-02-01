import { TestBed } from '@angular/core/testing';

import { ListAnalyseResolver } from './list-analyse.resolver';

describe('ListAnalyseResolver', () => {
  let resolver: ListAnalyseResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListAnalyseResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
