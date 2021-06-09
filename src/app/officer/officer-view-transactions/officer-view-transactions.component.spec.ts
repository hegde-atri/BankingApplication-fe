import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerViewTransactionsComponent } from './officer-view-transactions.component';

describe('OfficerViewTransactionsComponent', () => {
  let component: OfficerViewTransactionsComponent;
  let fixture: ComponentFixture<OfficerViewTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficerViewTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficerViewTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
