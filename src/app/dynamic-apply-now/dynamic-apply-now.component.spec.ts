import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicApplyNowComponent } from './dynamic-apply-now.component';
import {DynamicFormQuestionComponent} from '../dynamic-apply-now/dynamic-form-question.component';
import {FormArray} from '@angular/forms';
import { format } from 'url';
import { by } from 'protractor';
import { By } from '@angular/platform-browser';

describe('DynamicApplyNowComponent', () => {
  let component: DynamicApplyNowComponent;
  let fixture: ComponentFixture<DynamicApplyNowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicApplyNowComponent, DynamicFormQuestionComponent ], imports:[ReactiveFormsModule]
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

  it('should create the FormGroup root Object', ()=>{
    expect(component.dataRoot).toBeTruthy();
  })

  it('should create the visual sections', ()=>{
    expect(component.visualSections).toBeTruthy();
  })

  it('root section should have key as falsey, and visual sections should have at least 1 section', ()=>{
    expect(component.visualSections[0].key).toBeFalsy();
  })

  it('should show some labels including \'Credit Score \'', ()=>{
    const htmlElement:HTMLElement = fixture.nativeElement;
    expect(htmlElement.textContent).toContain("Credit Score");
    
  });

  it('Should show 2 panel sections with their corresponding title', ()=>{
    const htmlElement:HTMLElement = fixture.nativeElement;
    let listOfHeaders: NodeListOf<HTMLHeadingElement> =  htmlElement.querySelectorAll("h3");
    expect(listOfHeaders.item(0).textContent).
      toBe('Main Applicant\'s Personal Information',   "First heading should read 'Main Applicant's Personal Information'");
    expect(listOfHeaders.length).toBe(2, "Expecting 2 h3 elements in the html")
  })


  it('Should programmatically add a new repeating group', ()=>{
     let initialFormArrayLength:number;
     let initialQuestionGroupLength:number;
     let formArray = <FormArray>component.dataRoot.get('address');
     initialFormArrayLength = formArray.length;
     let questionGroup = component.visualSections.find(questionGroup=> questionGroup.key=="address");
     initialQuestionGroupLength = questionGroup.members.length;
     component.addRepeatingGroup(formArray, questionGroup); 
     expect(formArray.length).toBe(initialFormArrayLength+1, "Form Array added a new FormGroup!!!");
     expect(questionGroup.members.length).toBe(initialQuestionGroupLength+1, "new array of QUestionBase has been added!!");
     fixture.detectChanges();
     const htmlElement:HTMLElement = fixture.nativeElement;
     expect(htmlElement.textContent).toContain("address #2", "It Should show address # 2");
  });

  it("Should validate: 'Zip Code must be a 5 digit number.'", ()=>{
    const htmlElement:HTMLElement  = fixture.nativeElement;
    let debugElement = fixture.debugElement.query(By.css("#zip0"));
    let htmlInputElement: HTMLInputElement = debugElement.nativeElement;
    htmlInputElement.value = "9393";
    htmlInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    htmlInputElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(htmlElement.textContent).toContain("Zip Code must be a 5 digit number.");
  });

//pending : test validation messages after the blur event
// pending: Test tthe add / remove buttons.
//pending : Test the submit button.





});
