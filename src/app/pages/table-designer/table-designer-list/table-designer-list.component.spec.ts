import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDesignerListComponent } from './table-designer-list.component';

describe('TableDesignerListComponent', () => {
  let component: TableDesignerListComponent;
  let fixture: ComponentFixture<TableDesignerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDesignerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDesignerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
