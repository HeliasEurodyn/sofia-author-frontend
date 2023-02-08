import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveElementModalComponent } from './remove-element-modal.component';

describe('RemoveElementModalComponent', () => {
  let component: RemoveElementModalComponent;
  let fixture: ComponentFixture<RemoveElementModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveElementModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveElementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
