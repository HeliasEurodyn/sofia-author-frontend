import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LanguageDesignerListComponent} from './language-designer-list.component';

describe('LanguageDesignerListComponent', () => {
  let component: LanguageDesignerListComponent;
  let fixture: ComponentFixture<LanguageDesignerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageDesignerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageDesignerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
