import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningsChartsComponent } from './earnings-charts.component';

describe('EarningsChartsComponent', () => {
  let component: EarningsChartsComponent;
  let fixture: ComponentFixture<EarningsChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarningsChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EarningsChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
