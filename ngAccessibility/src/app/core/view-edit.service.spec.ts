import { TestBed } from '@angular/core/testing';

import { ViewEditService } from './view-edit.service';

describe('ViewEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewEditService = TestBed.get(ViewEditService);
    expect(service).toBeTruthy();
  });
});
