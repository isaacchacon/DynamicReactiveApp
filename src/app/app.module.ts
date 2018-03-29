import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';
import { ApplyNowComponent} from './apply-now/apply-now.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DynamicApplyNowComponent } from './dynamic-apply-now/dynamic-apply-now.component';
import {DynamicFormQuestionComponent} from './dynamic-apply-now/dynamic-form-question.component';
import {HttpClientModule} from '@angular/common/http';
import {RemoteQuestionsService} from './services/remote-questions.service';
import { QuestionControlService } from './services/question-control.service';


@NgModule({
  declarations: [
    AppComponent,
    ApplyNowComponent,
    WelcomeComponent,
    DynamicApplyNowComponent,
    DynamicFormQuestionComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule
  ],
  providers: [ RemoteQuestionsService, QuestionControlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
