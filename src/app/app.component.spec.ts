import { TestBed, async } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';
import { ApplyNowComponent} from './apply-now/apply-now.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DynamicApplyNowComponent } from './dynamic-apply-now/dynamic-apply-now.component';
import {DynamicFormQuestionComponent} from './dynamic-apply-now/dynamic-form-question.component';
import { APP_BASE_HREF } from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ApplyNowComponent,
        WelcomeComponent,
        DynamicApplyNowComponent,
        DynamicFormQuestionComponent
      ], imports:[
        BrowserModule, AppRoutingModule, ReactiveFormsModule
      ], 
      providers:[
        { provide: APP_BASE_HREF, useValue : '/' }
      ]


    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  
 
});
