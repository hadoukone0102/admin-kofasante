import { TestBed } from '@angular/core/testing';

import { MassService } from './mass.service';

describe('MassService', () => {
  let service: MassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
