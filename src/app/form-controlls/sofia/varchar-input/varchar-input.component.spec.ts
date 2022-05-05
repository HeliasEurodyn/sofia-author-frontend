import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarcharInputComponent } from './varchar-input.component';

describe('VarcharInputComponent', () => {
  let component: VarcharInputComponent;
  let fixture: ComponentFixture<VarcharInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarcharInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarcharInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
