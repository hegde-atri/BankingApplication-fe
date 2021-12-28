import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerViewTellersComponent } from './manager-view-tellers.component';

describe('ManagerViewTellersComponent', () => {
  let component: ManagerViewTellersComponent;
  let fixture: ComponentFixture<ManagerViewTellersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerViewTellersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerViewTellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
