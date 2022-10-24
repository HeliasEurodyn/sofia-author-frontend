import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomQueryFormComponent } from './custom-query-form.component';

describe('CustomQueryFormComponent', () => {
  let component: CustomQueryFormComponent;
  let fixture: ComponentFixture<CustomQueryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomQueryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomQueryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
