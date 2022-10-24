import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDesignerFormComponent } from './report-designer-form.component';

describe('ReportDesignerFormComponent', () => {
  let component: ReportDesignerFormComponent;
  let fixture: ComponentFixture<ReportDesignerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDesignerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDesignerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
