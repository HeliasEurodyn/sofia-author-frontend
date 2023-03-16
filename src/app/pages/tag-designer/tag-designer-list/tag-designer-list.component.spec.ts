import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TagDesignerListComponent} from './tag-designer-list.component';

describe('TagDesginerListComponent', () => {
  let component: TagDesignerListComponent;
  let fixture: ComponentFixture<TagDesignerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagDesignerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagDesignerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
