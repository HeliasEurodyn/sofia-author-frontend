import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDesignerFormComponent } from './chart-designer-form.component';

describe('ChartDesignerFormComponent', () => {
  let component: ChartDesignerFormComponent;
  let fixture: ComponentFixture<ChartDesignerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartDesignerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartDesignerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
