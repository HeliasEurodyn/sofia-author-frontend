import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDesignerFormComponent } from './table-designer-form.component';

describe('TableDesignerFormComponent', () => {
  let component: TableDesignerFormComponent;
  let fixture: ComponentFixture<TableDesignerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDesignerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDesignerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
