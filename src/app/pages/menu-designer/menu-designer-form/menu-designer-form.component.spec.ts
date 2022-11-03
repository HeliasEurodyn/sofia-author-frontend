import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MenuDesignerFormComponent} from './menu-designer-form.component';

describe('MenuDesignerFormComponent', () => {
  let component: MenuDesignerFormComponent;
  let fixture: ComponentFixture<MenuDesignerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuDesignerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDesignerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
