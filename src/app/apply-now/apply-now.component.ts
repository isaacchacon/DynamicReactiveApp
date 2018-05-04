import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';

@Component({
  selector: 'app-apply-now',
  templateUrl: './apply-now.component.html',
  styleUrls: ['./apply-now.component.css']
})
export class ApplyNowComponent implements OnInit {
  ddlStates:[string, string][] = [["ALABAMA","AL"],["ALASKA","AK"],["ARIZONA ","AZ"],["ARKANSAS","AR"],["CALIFORNIA ","CA"],["COLORADO ","CO"],["CONNECTICUT","CT"],["DELAWARE","DE"],["FLORIDA","FL"],["GEORGIA","GA"],["HAWAII","HI"],["IDAHO","ID"],["ILLINOIS","IL"],["INDIANA","IN"],["IOWA","IA"],["KANSAS","KS"],["KENTUCKY","KY"],["LOUISIANA","LA"],["MAINE","ME"],["MARYLAND","MD"],["MASSACHUSETTS","MA"],["MICHIGAN","MI"],["MINNESOTA","MN"],["MISSISSIPPI","MS"],["MISSOURI","MO"],["MONTANA","MT"],["NEBRASKA","NE"],["NEVADA","NV"],["NEW HAMPSHIRE","NH"],["NEW JERSEY","NJ"],["NEW MEXICO","NM"],["NEW YORK","NY"],["NORTH CAROLINA","NC"],["NORTH DAKOTA","ND"],["OHIO","OH"],["OKLAHOMA","OK"],["OREGON","OR"],["PENNSYLVANIA","PA"],["RHODE ISLAND","RI"],["SOUTH CAROLINA","SC"],["SOUTH DAKOTA","SD"],["TENNESSEE","TN"],["TEXAS","TX"],["UTAH","UT"],["VERMONT","VT"],["VIRGINIA ","VA"],["WASHINGTON","WA"],["WEST VIRGINIA","WV"],["WISCONSIN","WI"],["WYOMING","WY"]];
get addressesProp(): FormArray{
  return this.dataRoot.get('addresses') as FormArray;
}

  dataRoot:FormGroup;
  constructor(private fb:FormBuilder) {
    this.dataRoot = fb.group({
      firstName: ['',Validators.required],
      lastName:  ['',Validators.required],
      phone:  ['',Validators.required],
      email:  ['',Validators.required],
      creditScore: '',
      addresses:fb.array([fb.group({
        street: ['',Validators.required],
        city:['',Validators.required],
        state:['',Validators.required],
        zip:['',[Validators.required, Validators.minLength(5), Validators.maxLength(5)]]
      })])
   });
  }

  ngOnInit() {
  }
  addAddress(){
    
    (<FormArray>this.dataRoot.get('addresses')).push(this.fb.group({
      street: ['',Validators.required],
      city:['',Validators.required],
      state:['',Validators.required],
      zip:['',Validators.required]
    }));
  }

  removeLastAddress(){
    let fa = (<FormArray>this.dataRoot.get('addresses'));
    fa.removeAt(fa.length-1);
  }
}
