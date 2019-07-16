import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscribeComponent } from './transcribe.component';

describe('TranscribeComponent', () => {
  let component: TranscribeComponent;
  let fixture: ComponentFixture<TranscribeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranscribeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscribeComponent);
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
