import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlDashboardDesignerFormComponent } from './html-dashboard-designer-form.component';

describe('HtmlDashboardDesignerFormComponent', () => {
  let component: HtmlDashboardDesignerFormComponent;
  let fixture: ComponentFixture<HtmlDashboardDesignerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmlDashboardDesignerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlDashboardDesignerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
