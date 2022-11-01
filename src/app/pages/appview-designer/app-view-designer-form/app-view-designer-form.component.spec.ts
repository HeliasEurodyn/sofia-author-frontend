import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AppViewDesignerFormComponent} from './app-view-designer-form.component';

describe('AppViewDesignerFormComponent', () => {
  let component: AppViewDesignerFormComponent;
  let fixture: ComponentFixture<AppViewDesignerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppViewDesignerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppViewDesignerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
