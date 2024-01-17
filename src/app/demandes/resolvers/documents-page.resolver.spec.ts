import { TestBed } from '@angular/core/testing';

import { DocumentsPageResolver } from './documents-page.resolver';

describe('DocumentsPageResolver', () => {
  let resolver: DocumentsPageResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DocumentsPageResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
