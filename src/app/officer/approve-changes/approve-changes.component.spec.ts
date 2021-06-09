import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveChangesComponent } from './approve-changes.component';

describe('ApproveChangesComponent', () => {
  let component: ApproveChangesComponent;
  let fixture: ComponentFixture<ApproveChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveChangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
