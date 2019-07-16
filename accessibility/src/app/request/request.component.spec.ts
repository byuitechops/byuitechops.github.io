import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestComponent } from './request.component';

describe('RequestComponent', () => {
  let component: RequestComponent;
  let fixture: ComponentFixture<RequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestComponent);
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
