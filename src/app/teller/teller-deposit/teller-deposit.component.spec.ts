import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TellerDepositComponent } from './teller-deposit.component';

describe('TellerDepositComponent', () => {
  let component: TellerDepositComponent;
  let fixture: ComponentFixture<TellerDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TellerDepositComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TellerDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
