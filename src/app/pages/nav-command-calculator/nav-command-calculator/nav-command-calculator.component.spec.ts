import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCommandCalculatorComponent } from './nav-command-calculator.component';

describe('NavCommandCalculatorComponent', () => {
  let component: NavCommandCalculatorComponent;
  let fixture: ComponentFixture<NavCommandCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavCommandCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavCommandCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
