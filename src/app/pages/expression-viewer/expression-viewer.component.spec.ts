import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionViewerComponent } from './expression-viewer.component';

describe('ExpressionViewerComponent', () => {
  let component: ExpressionViewerComponent;
  let fixture: ComponentFixture<ExpressionViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpressionViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
