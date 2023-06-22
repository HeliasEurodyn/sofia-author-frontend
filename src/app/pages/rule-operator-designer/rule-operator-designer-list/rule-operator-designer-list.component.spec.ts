import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleOperatorDesignerListComponent } from './rule-operator-designer-list.component';

describe('RuleOperatorDesignerListComponent', () => {
  let component: RuleOperatorDesignerListComponent;
  let fixture: ComponentFixture<RuleOperatorDesignerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleOperatorDesignerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleOperatorDesignerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
