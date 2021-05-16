import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRegisterPayeeComponent } from './customer-register-payee.component';

describe('CustomerRegisterPayeeComponent', () => {
  let component: CustomerRegisterPayeeComponent;
  let fixture: ComponentFixture<CustomerRegisterPayeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerRegisterPayeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRegisterPayeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
