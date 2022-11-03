import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FlowboardDesignerFormComponent} from './flowboard-designer-form.component';

describe('FlowboardDesignerFormComponent', () => {
  let component: FlowboardDesignerFormComponent;
  let fixture: ComponentFixture<FlowboardDesignerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowboardDesignerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowboardDesignerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
