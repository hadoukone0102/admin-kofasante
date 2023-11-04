import { TestBed } from '@angular/core/testing';

import { QuestListsResolver } from './quest-lists.resolver';

describe('QuestListsResolver', () => {
  let resolver: QuestListsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(QuestListsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
