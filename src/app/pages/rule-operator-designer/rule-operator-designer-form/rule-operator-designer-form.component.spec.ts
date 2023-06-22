import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleOperatorDesignerFormComponent } from './rule-operator-designer-form.component';

describe('RuleOperatorDesignerFormComponent', () => {
  let component: RuleOperatorDesignerFormComponent;
  let fixture: ComponentFixture<RuleOperatorDesignerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleOperatorDesignerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleOperatorDesignerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
