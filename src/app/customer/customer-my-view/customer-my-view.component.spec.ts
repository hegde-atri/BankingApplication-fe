import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMyViewComponent } from './customer-my-view.component';

describe('CustomerMyViewComponent', () => {
  let component: CustomerMyViewComponent;
  let fixture: ComponentFixture<CustomerMyViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerMyViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerMyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
