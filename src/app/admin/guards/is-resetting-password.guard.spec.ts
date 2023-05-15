import { TestBed } from '@angular/core/testing';

import { IsResettingPasswordGuard } from './is-resetting-password.guard';

describe('IsResettingPasswordGuard', () => {
  let guard: IsResettingPasswordGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsResettingPasswordGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
