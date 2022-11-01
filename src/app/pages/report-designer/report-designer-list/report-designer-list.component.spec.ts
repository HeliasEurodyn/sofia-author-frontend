import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReportDesignerListComponent} from './report-designer-list.component';

describe('ReportDesignerListComponent', () => {
  let component: ReportDesignerListComponent;
  let fixture: ComponentFixture<ReportDesignerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDesignerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDesignerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
