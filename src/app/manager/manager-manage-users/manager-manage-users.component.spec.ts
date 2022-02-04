import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerManageUsersComponent } from './manager-manage-users.component';

describe('ManagerManageUsersComponent', () => {
  let component: ManagerManageUsersComponent;
  let fixture: ComponentFixture<ManagerManageUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerManageUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerManageUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
