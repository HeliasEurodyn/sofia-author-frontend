import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppViewDesignerListComponent } from './app-view-designer-list.component';

describe('AppViewDesignerListComponent', () => {
  let component: AppViewDesignerListComponent;
  let fixture: ComponentFixture<AppViewDesignerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppViewDesignerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppViewDesignerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
