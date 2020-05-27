import { TestBed } from '@angular/core/testing';

import { AuthRoleAdminGuard } from './auth-role-admin.guard';

describe('AuthRoleAdminGuard', () => {
  let guard: AuthRoleAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthRoleAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
