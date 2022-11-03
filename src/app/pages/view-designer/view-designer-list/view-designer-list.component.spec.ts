import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewDesignerListComponent} from './view-designer-list.component';

describe('ViewDesignerListComponent', () => {
  let component: ViewDesignerListComponent;
  let fixture: ComponentFixture<ViewDesignerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDesignerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDesignerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
