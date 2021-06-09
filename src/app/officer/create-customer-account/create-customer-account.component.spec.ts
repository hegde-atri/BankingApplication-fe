import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomerAccountComponent } from './create-customer-account.component';

describe('CreateCustomerAccountComponent', () => {
  let component: CreateCustomerAccountComponent;
  let fixture: ComponentFixture<CreateCustomerAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCustomerAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCustomerAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
