import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleFieldDesignerFormComponent } from './rule-field-designer-form.component';

describe('RuleFieldDesignerFormComponent', () => {
  let component: RuleFieldDesignerFormComponent;
  let fixture: ComponentFixture<RuleFieldDesignerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleFieldDesignerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleFieldDesignerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
