import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDesignerFormToolBoxComponent } from './form-designer-form-tool-box.component';

describe('FormDesignerFormToolBoxComponent', () => {
  let component: FormDesignerFormToolBoxComponent;
  let fixture: ComponentFixture<FormDesignerFormToolBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDesignerFormToolBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDesignerFormToolBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
