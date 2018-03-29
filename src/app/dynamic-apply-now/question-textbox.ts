import { QuestionBase } from './question-base';

export class TextboxQuestion extends QuestionBase<string> {
  controlType = 'textbox';
  type: "text";
  minLength?:number;
  maxLength?:number;
  currency?:boolean;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
    this.minLength = options['minLength']||null;// if null then [attr.minLength] won't add that property.
    this.maxLength = options['maxLength']||null;
    if(options['currency']){
      this.currency = true;
    }
  }
}