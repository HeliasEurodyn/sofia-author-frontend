import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ListDesignerFormComponent} from './list-designer-form.component';

describe('ListDesignerFormComponent', () => {
  let component: ListDesignerFormComponent;
  let fixture: ComponentFixture<ListDesignerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDesignerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDesignerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
