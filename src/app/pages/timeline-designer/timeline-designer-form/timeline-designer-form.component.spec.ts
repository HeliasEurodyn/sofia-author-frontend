import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineDesignerFormComponent } from './timeline-designer-form.component';

describe('TimelineDesignerFormComponent', () => {
  let component: TimelineDesignerFormComponent;
  let fixture: ComponentFixture<TimelineDesignerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineDesignerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineDesignerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
