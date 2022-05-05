import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentDesignerFormComponent } from './component-designer-form.component';

describe('ComponentDesignerFormComponent', () => {
  let component: ComponentDesignerFormComponent;
  let fixture: ComponentFixture<ComponentDesignerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentDesignerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentDesignerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
