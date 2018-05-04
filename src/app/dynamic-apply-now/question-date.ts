import { QuestionBase } from './question-base';
import * as moment from 'moment';

export class DateQuestion extends QuestionBase<string> {
  controlType = 'date';
  type: "text";
  minDate?:string;
  maxDate?:string;
  minDateMoment?:moment.Moment;
  maxDateMoment?:moment.Moment;


  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
    this.minDate =options['minDate'] || '';
    this.maxDate = options['maxDate'] || '';
    this.maxDateMoment = this.maxDate?this.maxDate=="Today"?moment():moment(this.maxDate): null;
    this.minDateMoment = this.minDate?this.minDate=="Today"?moment():moment(this.minDate): null;
  }
}
