import { TestBed } from '@angular/core/testing';

import { MassTimeByIdResolver } from './mass-time-by-id.resolver';

describe('MassTimeByIdResolver', () => {
  let resolver: MassTimeByIdResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MassTimeByIdResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
