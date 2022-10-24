import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageDesignerFormComponent } from './language-designer-form.component';

describe('LanguageDesignerFormComponent', () => {
  let component: LanguageDesignerFormComponent;
  let fixture: ComponentFixture<LanguageDesignerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageDesignerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageDesignerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
