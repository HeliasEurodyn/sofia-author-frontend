import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {XlsImportDesignerFormComponent} from './xls-import-designer-form.component';

describe('XlsImportDesignerFormComponent', () => {
  let component: XlsImportDesignerFormComponent;
  let fixture: ComponentFixture<XlsImportDesignerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XlsImportDesignerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XlsImportDesignerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
