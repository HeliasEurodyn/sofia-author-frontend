import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDesignerTranslationFormComponent } from './form-designer-translation-form.component';

describe('FormDesignerTranslationFormComponent', () => {
  let component: FormDesignerTranslationFormComponent;
  let fixture: ComponentFixture<FormDesignerTranslationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDesignerTranslationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDesignerTranslationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
