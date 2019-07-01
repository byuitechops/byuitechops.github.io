import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditComponent } from './view-edit.component';

describe('ViewEditComponent', () => {
  let component: ViewEditComponent;
  let fixture: ComponentFixture<ViewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


/****************************************************************************
 * There is no real reason to touch this page if you do not know what you are
 * doing. Please don't break this site.
 ****************************************************************************/
