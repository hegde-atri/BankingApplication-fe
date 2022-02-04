import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingsChartsComponent } from './spendings-charts.component';

describe('SpendingsChartsComponent', () => {
  let component: SpendingsChartsComponent;
  let fixture: ComponentFixture<SpendingsChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpendingsChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendingsChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
