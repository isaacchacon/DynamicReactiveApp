import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl, FormArray } from '@angular/forms';

import { QuestionBase } from '../dynamic-apply-now/./question-base';
import {QuestionGroup} from '../dynamic-apply-now/./question-group';
import { TextboxQuestion } from '../dynamic-apply-now/./question-textbox';

import * as moment from 'moment';
@Injectable()
export class QuestionControlService {
  constructor(private fb:FormBuilder) { }


  addRepeatingGroup(formArray:FormArray, questionGroup:QuestionGroup){
    //let's do this dynamically:
    formArray.push(this.toFormGroup(questionGroup, true));
  }

  addGrouptoFormGroup(questionGroup:QuestionGroup, rootFormGroup:FormGroup){
    rootFormGroup.addControl(questionGroup.key, this.toFormGroup(questionGroup,true));
  }

  ///WIll try to use this as a unique master method with internal Form Groups.
  ///Eventually will also consider FormArrrays.
  toFormGroup(questionGroup: QuestionGroup, skipArrayCreation:boolean ):AbstractControl {
    let result :AbstractControl;
    let group: any = {};

    questionGroup.members[0].forEach(questionOrGroup => {
      //if(Object.keys(questionOrGroup).indexOf("members")>=0){
        // for instanceof to work we needed to create object through constructor.
        //if getting it from json, won't work.
      if(Object.getOwnPropertyNames(questionOrGroup).indexOf("title")>=0){
      //if(questionOrGroup instanceof QuestionGroup){
        group[questionOrGroup.key]= this.toFormGroup(<QuestionGroup>questionOrGroup, false);
      }
      else{
        let question = <QuestionBase<any>> questionOrGroup;
        let  validators:ValidatorFn[] = [];
        if(question.required){
          validators.push(Validators.required);
        }
        let objectProperties = Object.getOwnPropertyNames(question);
        if(objectProperties.indexOf("minLength")>0||objectProperties.indexOf("maxLength")>0||
            objectProperties.indexOf("currency")){
          let textBoxQuestion = question as TextboxQuestion;
          if(textBoxQuestion.minLength){
            validators.push(Validators.minLength(textBoxQuestion.minLength));
          }
          if(textBoxQuestion.maxLength){
            validators.push(Validators.maxLength(textBoxQuestion.maxLength));
          }
          if(textBoxQuestion.currency){
            validators.push(Validators.pattern(/(?=.*\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|0)?(\.\d{1,2})?$/))
          }
        }
        if(question.controlType=='date'){
          //add custom datePicker validator for blur event:
          validators.push(abstractControl=>{
            let validStrings = ["MM/DD/YYYY", "MM/DD/YY", "M/D/YYYY", "M/D/YY"];
            let inputValue= abstractControl.value;
            if(typeof inputValue !== "string")// means this is a valid Date object.
            return null;
            if(validStrings.some(stringFormat=> moment(inputValue, stringFormat, true).isValid()))
            return null;
            return {'matDatepickerParse': {value:abstractControl.value}};
          });
        }
           group[question.key] = new FormControl(question.value,{validators: validators, 
            updateOn:question.controlType=="dropdown"?"change":"blur"});
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