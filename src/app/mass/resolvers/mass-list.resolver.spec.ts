import { TestBed } from '@angular/core/testing';

import { MassListResolver } from './mass-list.resolver';

describe('MassListResolver', () => {
  let resolver: MassListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MassListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
