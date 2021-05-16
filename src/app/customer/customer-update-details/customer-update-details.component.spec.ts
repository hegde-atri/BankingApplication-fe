import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUpdateDetailsComponent } from './customer-update-details.component';

describe('CustomerUpdateDetailsComponent', () => {
  let component: CustomerUpdateDetailsComponent;
  let fixture: ComponentFixture<CustomerUpdateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerUpdateDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerUpdateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
