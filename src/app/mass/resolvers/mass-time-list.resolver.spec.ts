import { TestBed } from '@angular/core/testing';

import { MassTimeListResolver } from './mass-time-list.resolver';

describe('MassTimeListResolver', () => {
  let resolver: MassTimeListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MassTimeListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
