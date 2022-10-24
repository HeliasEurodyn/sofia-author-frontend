import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XlsImportDesignerListComponent } from './xls-import-designer-list.component';

describe('XlsImportDesignerListComponent', () => {
  let component: XlsImportDesignerListComponent;
  let fixture: ComponentFixture<XlsImportDesignerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XlsImportDesignerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XlsImportDesignerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
