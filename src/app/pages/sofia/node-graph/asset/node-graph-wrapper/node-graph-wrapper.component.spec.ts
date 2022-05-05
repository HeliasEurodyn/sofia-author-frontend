import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeGraphWrapperComponent } from './node-graph-wrapper.component';

describe('NodeGraphWrapperComponent', () => {
  let component: NodeGraphWrapperComponent;
  let fixture: ComponentFixture<NodeGraphWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeGraphWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeGraphWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
