import {QuestionBase} from './question-base';
export class QuestionGroup{
    constructor(public key: string, public order:number, public title:string, public intro:string, 
        public repeating:boolean,public members:(QuestionBase<any>|QuestionGroup)[][]){    
    }
}