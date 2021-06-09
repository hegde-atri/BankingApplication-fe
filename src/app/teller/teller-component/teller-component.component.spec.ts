import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TellerComponentComponent } from './teller-component.component';

describe('TellerComponentComponent', () => {
  let component: TellerComponentComponent;
  let fixture: ComponentFixture<TellerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TellerComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TellerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
