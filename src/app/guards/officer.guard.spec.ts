import { TestBed } from '@angular/core/testing';

import { OfficerGuard } from './officer.guard';

describe('OfficerGuard', () => {
  let guard: OfficerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OfficerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
