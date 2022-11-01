import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InfoCardDesignerListComponent} from './info-card-designer-list.component';

describe('InfoCardDesignerListComponent', () => {
  let component: InfoCardDesignerListComponent;
  let fixture: ComponentFixture<InfoCardDesignerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoCardDesignerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCardDesignerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
