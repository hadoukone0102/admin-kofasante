import { TestBed } from '@angular/core/testing';

import { MassDayById } from './mass-by-id.resolver';

describe('MassDayById', () => {
  let resolver: MassDayById;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MassDayById);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
