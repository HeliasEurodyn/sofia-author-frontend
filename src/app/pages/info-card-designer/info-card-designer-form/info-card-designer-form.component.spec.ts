import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCardDesignerFormComponent } from './info-card-designer-form.component';

describe('InfoCardDesignerFormComponent', () => {
  let component: InfoCardDesignerFormComponent;
  let fixture: ComponentFixture<InfoCardDesignerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoCardDesignerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCardDesignerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
