import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ListDesignerTranslationFormComponent} from './list-designer-translation-form.component';

describe('ListDesignerTranslationFormComponent', () => {
  let component: ListDesignerTranslationFormComponent;
  let fixture: ComponentFixture<ListDesignerTranslationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDesignerTranslationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDesignerTranslationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
