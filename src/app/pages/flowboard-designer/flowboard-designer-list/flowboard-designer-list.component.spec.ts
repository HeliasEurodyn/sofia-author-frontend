import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FlowboardDesignerListComponent} from './flowboard-designer-list.component';

describe('FlowboardDesignerListComponent', () => {
  let component: FlowboardDesignerListComponent;
  let fixture: ComponentFixture<FlowboardDesignerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowboardDesignerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowboardDesignerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
