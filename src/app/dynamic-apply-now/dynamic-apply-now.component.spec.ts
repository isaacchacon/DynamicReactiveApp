import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicApplyNowComponent } from './dynamic-apply-now.component';

describe('DynamicApplyNowComponent', () => {
  let component: DynamicApplyNowComponent;
  let fixture: ComponentFixture<DynamicApplyNowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicApplyNowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicApplyNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
