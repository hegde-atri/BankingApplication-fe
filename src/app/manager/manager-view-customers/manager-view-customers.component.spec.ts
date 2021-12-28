import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerViewCustomersComponent } from './manager-view-customers.component';

describe('ManagerViewCustomersComponent', () => {
  let component: ManagerViewCustomersComponent;
  let fixture: ComponentFixture<ManagerViewCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerViewCustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerViewCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
