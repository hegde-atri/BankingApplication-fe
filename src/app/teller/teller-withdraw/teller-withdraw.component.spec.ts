import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TellerWithdrawComponent } from './teller-withdraw.component';

describe('TellerWithdrawComponent', () => {
  let component: TellerWithdrawComponent;
  let fixture: ComponentFixture<TellerWithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TellerWithdrawComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TellerWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
