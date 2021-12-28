import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerCreateUserComponent } from './manager-create-user.component';

describe('ManagerCreateUserComponent', () => {
  let component: ManagerCreateUserComponent;
  let fixture: ComponentFixture<ManagerCreateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerCreateUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerCreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
