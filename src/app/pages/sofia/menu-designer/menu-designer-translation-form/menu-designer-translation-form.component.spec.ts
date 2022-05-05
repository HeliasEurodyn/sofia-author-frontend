import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDesignerTranslationFormComponent } from './menu-designer-translation-form.component';

describe('MenuDesignerTranslationFormComponent', () => {
  let component: MenuDesignerTranslationFormComponent;
  let fixture: ComponentFixture<MenuDesignerTranslationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuDesignerTranslationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDesignerTranslationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
