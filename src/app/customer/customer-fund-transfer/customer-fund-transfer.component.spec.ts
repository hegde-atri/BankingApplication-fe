import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFundTransferComponent } from './customer-fund-transfer.component';

describe('CustomerFundTransferComponent', () => {
  let component: CustomerFundTransferComponent;
  let fixture: ComponentFixture<CustomerFundTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerFundTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFundTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
