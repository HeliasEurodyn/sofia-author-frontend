import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleDesignerFormComponent } from './rule-designer-form.component';

describe('RuleDesignerFormComponent', () => {
  let component: RuleDesignerFormComponent;
  let fixture: ComponentFixture<RuleDesignerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleDesignerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleDesignerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
