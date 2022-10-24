import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlDashboardComponent } from './html-dashboard.component';

describe('HtmlDashboardComponent', () => {
  let component: HtmlDashboardComponent;
  let fixture: ComponentFixture<HtmlDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmlDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
