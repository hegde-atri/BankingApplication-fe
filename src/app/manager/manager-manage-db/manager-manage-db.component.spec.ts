import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerManageDbComponent } from './manager-manage-db.component';

describe('ManagerManageDbComponent', () => {
  let component: ManagerManageDbComponent;
  let fixture: ComponentFixture<ManagerManageDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerManageDbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerManageDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
