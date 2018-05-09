import { Component, Input, forwardRef } from '@angular/core';
import { QuestionBase }     from './question-base';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { Subscriber } from 'rxjs/Subscriber';

@Component({
  selector: 'app-dynamic-question',
  templateUrl: './dynamic-question.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicQuestionComponent),
      multi: true
    }
  ]
})
/**
 * Meant to be the class that implements the Control Value Accessor interface.
 */
export class DynamicQuestionComponent implements ControlValueAccessor {
  @Input() question: QuestionBase<any>;
  @Input() disabled = null;
  validationErrors = '';
  @Input() formControl:FormControl;
  @Input() idSuffix ='';
  
  answer:string;
  // Function to call when the rating changes.
  onChange = (answer: string) => {};
  // Function to call when the input is touched (when a star is clicked).
  onTouched = () => {};
  // Allows Angular to update the model (rating).
  // Update the model and changes needed for the view here.
  writeValue(answer: string): void {
    this.answer = answer;
    this.onChange(this.answer);
  }
  // Allows Angular to register a function to call when the model (rating) changes.
  // Save the function as a property to call later here.
  registerOnChange(fn: (answer: string) => void): void {
    this.onChange = fn;
  }
  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  // Allows Angular to disable the input.
  setDisabledState(isDisabled: boolean): void {
    if(isDisabled){
        this.disabled=true;
    }else{
        this.disabled=null;// null is better cause it won't show the disabled attribute at all.
    }
  }

  ngOnInit(){
    this.formControl.valueChanges.subscribe(data=> this.onValueChanged(data))
  }

  //@Input() idSuffix="";//utilized when this is inside a form array
  onValueChanged(data:any){
    this.validationErrors = '';
    const control = this.formControl;
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