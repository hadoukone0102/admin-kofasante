import { TestBed } from '@angular/core/testing';

import { HeadOfCatechesisGuard } from './head-of-catechesis.guard';

describe('HeadOfCatechesisGuard', () => {
  let guard: HeadOfCatechesisGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HeadOfCatechesisGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
