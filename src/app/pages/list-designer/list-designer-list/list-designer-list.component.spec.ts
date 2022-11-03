import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ListDesignerListComponent} from './list-designer-list.component';

describe('ListDesignerListComponent', () => {
  let component: ListDesignerListComponent;
  let fixture: ComponentFixture<ListDesignerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDesignerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDesignerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
