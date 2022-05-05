import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDesignerFormComponent } from './dashboard-designer-form.component';

describe('DashboardDesignerFormComponent', () => {
  let component: DashboardDesignerFormComponent;
  let fixture: ComponentFixture<DashboardDesignerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDesignerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDesignerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
