import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerCreateCustomerAccountComponent } from './officer-create-customer-account.component';

describe('OfficerCreateCustomerAccountComponent', () => {
  let component: OfficerCreateCustomerAccountComponent;
  let fixture: ComponentFixture<OfficerCreateCustomerAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficerCreateCustomerAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficerCreateCustomerAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
