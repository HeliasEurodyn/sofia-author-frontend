import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchDesignerFormComponent} from './search-designer-form.component';

describe('SearchDesignerFormComponent', () => {
  let component: SearchDesignerFormComponent;
  let fixture: ComponentFixture<SearchDesignerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDesignerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDesignerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
