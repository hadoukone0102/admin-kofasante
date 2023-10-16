import { TestBed } from '@angular/core/testing';

import { MassRequestService } from './mass-request.service';

describe('MassRequestService', () => {
  let service: MassRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MassRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
