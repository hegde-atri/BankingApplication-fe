import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TellerNavbarComponent } from './teller-navbar.component';

describe('TellerNavbarComponent', () => {
  let component: TellerNavbarComponent;
  let fixture: ComponentFixture<TellerNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TellerNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TellerNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
