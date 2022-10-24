import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDesignerListComponent } from './search-designer-list.component';

describe('SearchDesignerListComponent', () => {
  let component: SearchDesignerListComponent;
  let fixture: ComponentFixture<SearchDesignerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDesignerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDesignerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
