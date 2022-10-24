import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDesignerListComponent } from './chart-designer-list.component';

describe('ChartDesignerListComponent', () => {
  let component: ChartDesignerListComponent;
  let fixture: ComponentFixture<ChartDesignerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartDesignerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartDesignerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
