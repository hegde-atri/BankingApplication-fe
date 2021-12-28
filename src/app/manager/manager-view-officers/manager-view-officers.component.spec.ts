import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerViewOfficersComponent } from './manager-view-officers.component';

describe('ManagerViewOfficersComponent', () => {
  let component: ManagerViewOfficersComponent;
  let fixture: ComponentFixture<ManagerViewOfficersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerViewOfficersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerViewOfficersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
