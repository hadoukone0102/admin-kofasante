import { TestBed } from '@angular/core/testing';

import { QuestTypeByIdResolver } from './quest-type-by-id.resolver';

describe('QuestTypeByIdResolver', () => {
  let resolver: QuestTypeByIdResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(QuestTypeByIdResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
