import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestDocumentationDesignerFormComponent } from './rest-documentation-designer-form.component';

describe('RestDocumentationDesignerFormComponent', () => {
  let component: RestDocumentationDesignerFormComponent;
  let fixture: ComponentFixture<RestDocumentationDesignerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestDocumentationDesignerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestDocumentationDesignerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
