import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentDesignerListComponent } from './component-designer-list.component';

describe('ComponentDesignerListComponent', () => {
  let component: ComponentDesignerListComponent;
  let fixture: ComponentFixture<ComponentDesignerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentDesignerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentDesignerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
