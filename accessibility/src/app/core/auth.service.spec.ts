import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});


/****************************************************************************
 * There is no real reason to touch this page if you do not know what you are
 * doing. Please don't break this site.
 ****************************************************************************/
