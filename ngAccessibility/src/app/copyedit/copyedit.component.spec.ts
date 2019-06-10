import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyeditComponent } from './copyedit.component';

describe('CopyeditComponent', () => {
  let component: CopyeditComponent;
  let fixture: ComponentFixture<CopyeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
