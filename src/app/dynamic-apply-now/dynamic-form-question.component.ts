import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';

import { QuestionBase }     from './question-base';

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html'
})
export class DynamicFormQuestionComponent {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;

  validationErrors = '';


  ngOnInit(){
    this.form.controls[this.question.key].valueChanges.subscribe(data=> this.onValueChanged(data))
  }

  onValueChanged(data:any){
    this.validationErrors = '';
    const control = this.form.controls[this.question.key];
    if (control && control.dirty && !control.valid) {
		   for (const key in control.errors) {
         if(this.question.validationErrors[key]){
            this.validationErrors += this.question.validationErrors[key] + '. ';
         }else{
            this.validationErrors+=key +' error not defined in JSON.';
         }
       }
    }
  }
}