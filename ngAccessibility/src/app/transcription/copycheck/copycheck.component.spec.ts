import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopycheckComponent } from './copycheck.component';

describe('CopycheckComponent', () => {
  let component: CopycheckComponent;
  let fixture: ComponentFixture<CopycheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopycheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopycheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
