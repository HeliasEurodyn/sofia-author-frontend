import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDesignerListComponent } from './menu-designer-list.component';

describe('MenuDesignerListComponent', () => {
  let component: MenuDesignerListComponent;
  let fixture: ComponentFixture<MenuDesignerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuDesignerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDesignerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
