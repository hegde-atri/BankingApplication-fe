import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAccountSummaryComponent } from './customer-account-summary.component';

describe('CustomerAccountSummaryComponent', () => {
  let component: CustomerAccountSummaryComponent;
  let fixture: ComponentFixture<CustomerAccountSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerAccountSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAccountSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
