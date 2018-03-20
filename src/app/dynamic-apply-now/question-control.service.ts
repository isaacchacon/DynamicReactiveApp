import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl, FormArray } from '@angular/forms';

import { QuestionBase } from './question-base';
import {QuestionGroup} from './question-group';
import { TextboxQuestion } from './question-textbox';

@Injectable()
export class QuestionControlService {
  constructor(private fb:FormBuilder) { }


  addRepeatingGroup(formArray:FormArray, questionGroup:QuestionGroup){
    //let's do this dynamically:
    formArray.push(this.toFormGroup(questionGroup, true));
  }

  ///WIll try to use this as a unique master method with internal Form Groups.
  ///Eventually will also consider FormArrrays.
  toFormGroup(questionGroup: QuestionGroup, skipArrayCreation:boolean ):AbstractControl {
    let result :AbstractControl;
    let group: any = {};

    questionGroup.members[0].forEach(questionOrGroup => {
      //if(Object.keys(questionOrGroup).indexOf("members")>=0){
        // for instanceof to work we needed to create object through constructor?
      if(questionOrGroup instanceof QuestionGroup){
        group[questionOrGroup.key]= this.toFormGroup(<QuestionGroup>questionOrGroup, false);
      }
      else{
        let question = <QuestionBase<any>> questionOrGroup;
        let  validators:ValidatorFn[] = [];
        if(question.required){
          validators.push(Validators.required);
        }
        let objectProperties = Object.getOwnPropertyNames(question);
        if(objectProperties.indexOf("minLength")>0||objectProperties.indexOf("maxLength")>0){
          let textBoxQuestion = question as TextboxQuestion;
          if(textBoxQuestion.minLength){
            validators.push(Validators.minLength(textBoxQuestion.minLength));
          }
          if(textBoxQuestion.maxLength){
            validators.push(Validators.maxLength(textBoxQuestion.maxLength));
          }
        }
           group[question.key] = new FormControl(question.value,{validators: validators, updateOn:"blur"});
      }
    });
    result =  new FormGroup(group);
    if(questionGroup.repeating&& !skipArrayCreation){
      result = new FormArray([result]);
    }
    return result;
  }
  // toFormGroup(questions: QuestionBase<any>[] ) {
  //   let group: any = {};

  //   questions.forEach(question => {
  //     group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
  //                                             : new FormControl(question.value || '');
  //   });
  //   return new FormGroup(group);
  // }
}