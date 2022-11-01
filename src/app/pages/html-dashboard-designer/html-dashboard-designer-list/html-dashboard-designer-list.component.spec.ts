import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HtmlDashboardDesignerListComponent} from './html-dashboard-designer-list.component';

describe('HtmlDashboardDesignerListComponent', () => {
  let component: HtmlDashboardDesignerListComponent;
  let fixture: ComponentFixture<HtmlDashboardDesignerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmlDashboardDesignerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlDashboardDesignerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
