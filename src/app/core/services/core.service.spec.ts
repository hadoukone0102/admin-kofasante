import { TestBed } from '@angular/core/testing';

import { PartialsService } from './core.service';

describe('PartialsService', () => {
  let service: PartialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
