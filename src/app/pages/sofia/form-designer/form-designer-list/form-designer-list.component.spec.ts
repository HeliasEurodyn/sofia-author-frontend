import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDesignerListComponent } from './form-designer-list.component';

describe('FormDesignerListComponent', () => {
  let component: FormDesignerListComponent;
  let fixture: ComponentFixture<FormDesignerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDesignerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDesignerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
