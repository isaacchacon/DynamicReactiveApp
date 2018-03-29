import { Component,Input, OnInit } from '@angular/core';
import {FormGroup, FormArray} from '@angular/forms';

import {QuestionBase} from './question-base';
import {QuestionGroup} from './question-group';
import {DropdownQuestion} from './question-dropdown';
import {TextboxQuestion} from './question-textbox';
import {QuestionControlService} from '../services/question-control.service';
import { RadioQuestion } from './question-radio';
import { RemoteQuestionsService } from '../services/remote-questions.service';

@Component({
  selector: 'app-dynamic-apply-now',
  templateUrl: './dynamic-apply-now.component.html',
  styleUrls: ['./dynamic-apply-now.component.css'],
})
export class DynamicApplyNowComponent implements OnInit {
  
  dataRoot: FormGroup;
  payLoad = '';
  visualSections:QuestionGroup[];

  constructor(private qcs: QuestionControlService, private remoteQuestions:RemoteQuestionsService ) {
  }

  ngOnInit(){
    this.remoteQuestions.getRemoteQuestions().subscribe(result=> {
    //let result = this.getQuestions();
      this.dataRoot =<FormGroup> this.qcs.toFormGroup(result, false);
      this.visualSections =[];
      this.flattenQuestions(result, this.visualSections);
      this.visualSections.reverse();
    }, 
    error=>{console.log(error)});
  }

  removeLastRepeatingGroup(formArray:FormArray, questionGroup:QuestionGroup ){
    questionGroup.members.pop();
    formArray.removeAt(formArray.length-1);
  }

  private flattenQuestions(group:QuestionGroup, flattenedGroupArray:QuestionGroup[]){
    let flattenedGroup = new QuestionGroup(group.key,group.order,group.title,group.intro,group.repeating,[]);
    for(let i = 0;i<group.members[0].length;i++){
      if(Object.getOwnPropertyNames(group.members[0][i]).indexOf("title")>=0){
      //if(group.members[0][i] instanceof QuestionGroup){
        this.flattenQuestions(<QuestionGroup>group.members[0][i],flattenedGroupArray);
      }else{
        if(flattenedGroup.members.length ==0){
          flattenedGroup.members = [[group.members[0][i]]];
        }else{
          flattenedGroup.members[0].push(group.members[0][i]);
        }        
      }
    }
    flattenedGroupArray.push(flattenedGroup);
  }


  ///pending :find out what's the generic type of QUestionBase object.
  ///this code assumes that the type is string for all the questions.
  addRepeatingGroup(formArray:FormArray,questionGroup:QuestionGroup ){
    this.qcs.addRepeatingGroup(formArray, questionGroup);
    ///next section deep clones this group's questions and adds a new item to the array
    let clonedControlArray: QuestionBase<any>[] = [];
    for(let question of questionGroup.members[0]){
      let newObject:any = {};
      for(let propertyName in question){
        newObject[propertyName]= question[propertyName];
      }
      clonedControlArray.push(newObject);
    }
    questionGroup.members.push(clonedControlArray);
  }

  // questionToBeAddedDynamically:QuestionGroup= new QuestionGroup(
  //   "animals", 
  //   7,
  //   "Pets and Animals",
  //   "Please enter what kind of pet you have",
  //   false, //mark this group as a repeating
  //   [[
  //     new TextboxQuestion({
  //       key: 'petName',
  //       label: 'Pet Name',
  //       value: '',
  //       required: true,
  //       order: 1,
  //       validationErrors:{"required":"Pet Name Is Required"}
  //     }),
  //     new DropdownQuestion({
  //       key: 'petType',
  //       label: 'Pet Type',
  //       value: 'Cat',
  //       options: [["Dog","Dog"],["Cat","Cat"],["Fish","FSH"]],
  //       order: 2,
  //       validationErrors:{"required":"State Is Required"}
  //     })]]);

 
 

  // AddDynamicControls(){
  //   this.qcs.addGrouptoFormGroup(this.questionToBeAddedDynamically, this.dataRoot);
  //   this.visualSections.push(this.questionToBeAddedDynamically);
  //   this.groupAdded = true;
    
  // }
  // groupAdded:boolean;
  // ToggleLastGroup(){
  //   if(this.groupAdded)
  //   this.visualSections.pop();
  //   else
  //   this.visualSections.push(this.questionToBeAddedDynamically);
  //   this.groupAdded = !this.groupAdded;
  // }
 
  onSubmit() {
    this.payLoad = JSON.stringify(this.dataRoot.value);
  }

  

  getQuestions() {
    

    let questions: QuestionGroup={ key: null, order:1, title: 
      "Main Applicant's Personal Information", intro:'',repeating:false, 
      members:[[

      
      new TextboxQuestion({
        key: 'firstName',
        label: 'First Name',
        value: '',
        required: true,
        order: 1,
        validationErrors:{"required":"First Name Is Required"}
      }),
      new TextboxQuestion({
        key: 'lastName',
        label: 'Last Name',
        value: '',
        required: true,
        order: 2,
        validationErrors:{"required":"Last Name Is Required"}
      }),
      new TextboxQuestion({
        key: 'phone',
        label: 'Mobile Phone',
        value: '',
        type:'tel',
        required: true,
        order: 3,
        validationErrors:{"required":"Phone Is Required"}
      }),

      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        value:'',
        type: 'email',
        required: true, 
        order: 4,
        validationErrors:{"required":"An Email Address Is Required"}
      }),

      new TextboxQuestion({
        key: 'creditScore',
        label: 'Credit Score (If you know it)',
        value: '',
        order: 5
      }), 

      new QuestionGroup(
        "address", 
        6,
        "Main Applicant's 3 year Address History",
        "Please enter your address history for the last 3 years:",
        true, //mark this group as a repeating
        [[
          new TextboxQuestion({
            key: 'street',
            label: 'Street Address',
            value: '',
            required: true,
            order: 1,
            validationErrors:{"required":"Street Address Is Required"}
          }), 
          new TextboxQuestion({
            key: 'city',
            label: 'City',
            value: '',
            required: true,
            order: 1,
            validationErrors:{"required":"City Is Required"}
          }), 
          new DropdownQuestion({
        key: 'state',
        label: 'State',
        options: [["ALABAMA","AL"],["ALASKA","AK"],["ARIZONA ","AZ"],["ARKANSAS","AR"],["CALIFORNIA ","CA"],["COLORADO ","CO"],["CONNECTICUT","CT"],["DELAWARE","DE"],["FLORIDA","FL"],["GEORGIA","GA"],["HAWAII","HI"],["IDAHO","ID"],["ILLINOIS","IL"],["INDIANA","IN"],["IOWA","IA"],["KANSAS","KS"],["KENTUCKY","KY"],["LOUISIANA","LA"],["MAINE","ME"],["MARYLAND","MD"],["MASSACHUSETTS","MA"],["MICHIGAN","MI"],["MINNESOTA","MN"],["MISSISSIPPI","MS"],["MISSOURI","MO"],["MONTANA","MT"],["NEBRASKA","NE"],["NEVADA","NV"],["NEW HAMPSHIRE","NH"],["NEW JERSEY","NJ"],["NEW MEXICO","NM"],["NEW YORK","NY"],["NORTH CAROLINA","NC"],["NORTH DAKOTA","ND"],["OHIO","OH"],["OKLAHOMA","OK"],["OREGON","OR"],["PENNSYLVANIA","PA"],["RHODE ISLAND","RI"],["SOUTH CAROLINA","SC"],["SOUTH DAKOTA","SD"],["TENNESSEE","TN"],["TEXAS","TX"],["UTAH","UT"],["VERMONT","VT"],["VIRGINIA ","VA"],["WASHINGTON","WA"],["WEST VIRGINIA","WV"],["WISCONSIN","WI"],["WYOMING","WY"]],
        order: 3,
        validationErrors:{"required":"State Is Required"}
      }),

          new TextboxQuestion({
            key: 'zip',
            label: 'Zip Code',
            value: '',
            required: true,
            order: 1,
            minLength:5,
            maxLength:5,
            validationErrors:{"required":"Zip Code Is Required", "minlength":"Zip Code must be a 5 digit number"}
          }),
          new RadioQuestion({
            key: 'rentOrOwn',
            label: 'Did you Rent or Own this home?',
            options: [["Rent","Ren"],["Own","Own"]],
            order: 3,
            validationErrors:{"required":"Please specify if you rented or owned this place"}
          }),
          new TextboxQuestion({
            key: 'monthlyPayment',
            label: 'Monthly Payment',
            value: '',
            order: 1,       
            currency: true,
            validationErrors:{"pattern":"You must enter a valid money amount."}     
          }),
          

        ]])
      


    ]]}

    //questions.members.sort((a, b) => a.order - b.order);
    return questions;
  }

}
