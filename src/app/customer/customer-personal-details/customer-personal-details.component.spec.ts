import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPersonalDetailsComponent } from './customer-personal-details.component';

describe('CustomerPersonalDetailsComponent', () => {
  let component: CustomerPersonalDetailsComponent;
  let fixture: ComponentFixture<CustomerPersonalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPersonalDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPersonalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
