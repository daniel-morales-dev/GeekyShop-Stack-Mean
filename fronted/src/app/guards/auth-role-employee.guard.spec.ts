import { TestBed } from '@angular/core/testing';

import { AuthRoleEmployeeGuard } from './auth-role-employee.guard';

describe('AuthRoleEmployeeGuard', () => {
  let guard: AuthRoleEmployeeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthRoleEmployeeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
