import { TestBed } from '@angular/core/testing';

import { QuestListOriginalResolver } from './quest-list-original.resolver';

describe('QuestListOriginalResolver', () => {
  let resolver: QuestListOriginalResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(QuestListOriginalResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
