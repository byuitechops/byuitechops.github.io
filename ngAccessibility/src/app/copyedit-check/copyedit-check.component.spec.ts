import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyeditCheckComponent } from './copyedit-check.component';

describe('CopyeditCheckComponent', () => {
  let component: CopyeditCheckComponent;
  let fixture: ComponentFixture<CopyeditCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyeditCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyeditCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
