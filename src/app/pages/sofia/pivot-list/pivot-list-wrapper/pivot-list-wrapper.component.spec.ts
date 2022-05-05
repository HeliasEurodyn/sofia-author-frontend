import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotListWrapperComponent } from './pivot-list-wrapper.component';

describe('PivotListWrapperComponent', () => {
  let component: PivotListWrapperComponent;
  let fixture: ComponentFixture<PivotListWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PivotListWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PivotListWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
