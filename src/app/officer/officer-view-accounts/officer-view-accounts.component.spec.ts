import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerViewAccountsComponent } from './officer-view-accounts.component';

describe('OfficerViewAccountsComponent', () => {
  let component: OfficerViewAccountsComponent;
  let fixture: ComponentFixture<OfficerViewAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficerViewAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficerViewAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
