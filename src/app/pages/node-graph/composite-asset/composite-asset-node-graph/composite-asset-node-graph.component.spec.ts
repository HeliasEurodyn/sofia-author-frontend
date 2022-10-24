import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositeAssetNodeGraphComponent } from './composite-asset-node-graph.component';

describe('CompositeAssetNodeGraphComponent', () => {
  let component: CompositeAssetNodeGraphComponent;
  let fixture: ComponentFixture<CompositeAssetNodeGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompositeAssetNodeGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompositeAssetNodeGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
