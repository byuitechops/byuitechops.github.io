import { TestBed } from '@angular/core/testing';

import { DuplicateService } from './duplicate.service';

describe('DuplicateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DuplicateService = TestBed.get(DuplicateService);
    expect(service).toBeTruthy();
  });
});
