import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TagDesignerFormComponent} from './tag-designer-form.component';

describe('TagDesginerFormComponent', () => {
  let component: TagDesignerFormComponent;
  let fixture: ComponentFixture<TagDesignerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagDesignerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagDesignerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
