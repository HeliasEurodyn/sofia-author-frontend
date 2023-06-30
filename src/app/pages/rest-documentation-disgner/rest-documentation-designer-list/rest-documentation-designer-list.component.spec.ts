import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestDocumentationDesignerListComponent } from './rest-documentation-designer-list.component';

describe('RestDocumentationDesignerListComponent', () => {
  let component: RestDocumentationDesignerListComponent;
  let fixture: ComponentFixture<RestDocumentationDesignerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestDocumentationDesignerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestDocumentationDesignerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
