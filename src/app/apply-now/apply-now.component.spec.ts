import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyNowComponent } from './apply-now.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ApplicationComponent', () => {
  let component: ApplyNowComponent;
  let fixture: ComponentFixture<ApplyNowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyNowComponent ],
      imports:[ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
