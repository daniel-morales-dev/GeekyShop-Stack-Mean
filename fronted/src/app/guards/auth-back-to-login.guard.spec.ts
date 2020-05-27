import { TestBed } from '@angular/core/testing';

import { AuthBackToLoginGuard } from './auth-back-to-login.guard';

describe('AuthBackToLoginGuard', () => {
  let guard: AuthBackToLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthBackToLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
