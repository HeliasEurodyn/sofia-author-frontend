import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardDesignerListComponent} from './dashboard-designer-list.component';

describe('DashboardDesignerListComponent', () => {
  let component: DashboardDesignerListComponent;
  let fixture: ComponentFixture<DashboardDesignerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDesignerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDesignerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
