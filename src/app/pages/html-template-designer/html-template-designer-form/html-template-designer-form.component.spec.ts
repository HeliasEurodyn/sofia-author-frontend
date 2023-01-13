import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlTemplateDesignerFormComponent } from './html-template-designer-form.component';

describe('HtmlTemplateDesignerFormComponent', () => {
  let component: HtmlTemplateDesignerFormComponent;
  let fixture: ComponentFixture<HtmlTemplateDesignerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HtmlTemplateDesignerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlTemplateDesignerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
