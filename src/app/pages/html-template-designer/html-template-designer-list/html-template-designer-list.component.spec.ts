import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlTemplateDesignerListComponent } from './html-template-designer-list.component';

describe('HtmlTemplateDesignerListComponent', () => {
  let component: HtmlTemplateDesignerListComponent;
  let fixture: ComponentFixture<HtmlTemplateDesignerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HtmlTemplateDesignerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlTemplateDesignerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
