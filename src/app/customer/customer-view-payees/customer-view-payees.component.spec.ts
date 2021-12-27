import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerViewPayeesComponent } from './customer-view-payees.component';

describe('CustomerViewPayeesComponent', () => {
  let component: CustomerViewPayeesComponent;
  let fixture: ComponentFixture<CustomerViewPayeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerViewPayeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerViewPayeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
