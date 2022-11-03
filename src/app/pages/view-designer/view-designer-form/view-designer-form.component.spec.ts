import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewDesignerFormComponent} from './view-designer-form.component';

describe('ViewDesignerFormComponent', () => {
  let component: ViewDesignerFormComponent;
  let fixture: ComponentFixture<ViewDesignerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDesignerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDesignerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
