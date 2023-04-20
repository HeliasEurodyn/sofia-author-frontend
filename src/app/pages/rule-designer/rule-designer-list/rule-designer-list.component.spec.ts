import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleDesignerListComponent } from './rule-designer-list.component';

describe('RuleDesignerListComponent', () => {
  let component: RuleDesignerListComponent;
  let fixture: ComponentFixture<RuleDesignerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleDesignerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleDesignerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
