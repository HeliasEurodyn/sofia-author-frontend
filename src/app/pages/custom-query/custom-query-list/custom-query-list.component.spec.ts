import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomQueryListComponent} from './custom-query-list.component';

describe('CustomQueryListComponent', () => {
  let component: CustomQueryListComponent;
  let fixture: ComponentFixture<CustomQueryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomQueryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomQueryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
