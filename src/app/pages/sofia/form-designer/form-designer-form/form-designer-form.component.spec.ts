import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDesignerFormComponent } from './form-designer-form.component';

describe('FormDesignerFormComponent', () => {
  let component: FormDesignerFormComponent;
  let fixture: ComponentFixture<FormDesignerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDesignerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDesignerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
