import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineDesignerListComponent } from './timeline-designer-list.component';

describe('TimelineDesignerListComponent', () => {
  let component: TimelineDesignerListComponent;
  let fixture: ComponentFixture<TimelineDesignerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineDesignerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineDesignerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
