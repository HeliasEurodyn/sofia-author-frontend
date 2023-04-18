import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleDesignerComponent } from './rule-designer.component';

describe('RuleDesignerComponent', () => {
  let component: RuleDesignerComponent;
  let fixture: ComponentFixture<RuleDesignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleDesignerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
