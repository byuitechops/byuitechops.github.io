import { TestBed } from '@angular/core/testing';

import { DupCheckerService } from './dup-checker.service';

describe('DupCheckerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DupCheckerService = TestBed.get(DupCheckerService);
    expect(service).toBeTruthy();
  });
});
