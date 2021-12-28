import { TestBed } from '@angular/core/testing';

import { TellerGuard } from './teller.guard';

describe('TellerGuard', () => {
  let guard: TellerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TellerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
