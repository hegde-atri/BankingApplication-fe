import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTransactionHistoryComponent } from './customer-transaction-history.component';

describe('CustomerTransactionHistoryComponent', () => {
  let component: CustomerTransactionHistoryComponent;
  let fixture: ComponentFixture<CustomerTransactionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerTransactionHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTransactionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
