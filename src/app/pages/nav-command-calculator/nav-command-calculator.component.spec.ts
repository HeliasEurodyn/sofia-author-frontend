import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavCommandCalculatorPageComponent} from './nav-command-calculator-page.component';

describe('ExpressionViewerComponent', () => {
  let component: NavCommandCalculatorPageComponent;
  let fixture: ComponentFixture<NavCommandCalculatorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavCommandCalculatorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavCommandCalculatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
