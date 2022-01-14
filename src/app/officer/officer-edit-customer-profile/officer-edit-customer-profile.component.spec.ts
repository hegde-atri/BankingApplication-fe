import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerEditCustomerProfileComponent } from './officer-edit-customer-profile.component';

describe('OfficerEditCustomerProfileComponent', () => {
  let component: OfficerEditCustomerProfileComponent;
  let fixture: ComponentFixture<OfficerEditCustomerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficerEditCustomerProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficerEditCustomerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
