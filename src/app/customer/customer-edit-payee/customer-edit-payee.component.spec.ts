import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEditPayeeComponent } from './customer-edit-payee.component';

describe('CustomerEditPayeeComponent', () => {
  let component: CustomerEditPayeeComponent;
  let fixture: ComponentFixture<CustomerEditPayeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerEditPayeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEditPayeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
