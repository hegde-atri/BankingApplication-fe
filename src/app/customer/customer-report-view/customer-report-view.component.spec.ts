import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerReportViewComponent } from './customer-report-view.component';

describe('CustomerReportViewComponent', () => {
  let component: CustomerReportViewComponent;
  let fixture: ComponentFixture<CustomerReportViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerReportViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
