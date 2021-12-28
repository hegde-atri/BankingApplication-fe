import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerManageDbComponent } from './officer-manage-db.component';

describe('OfficerManageDbComponent', () => {
  let component: OfficerManageDbComponent;
  let fixture: ComponentFixture<OfficerManageDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficerManageDbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficerManageDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
