import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleFieldDesignerListComponent } from './rule-field-designer-list.component';

describe('RuleFieldDesignerListComponent', () => {
  let component: RuleFieldDesignerListComponent;
  let fixture: ComponentFixture<RuleFieldDesignerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleFieldDesignerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleFieldDesignerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
