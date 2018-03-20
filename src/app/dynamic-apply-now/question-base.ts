export class QuestionBase<T>{
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
    validationErrors:{[x:string]:string}
  
    constructor(options: {
        value?: T,
        key?: string,
        label?: string,
        required?: boolean,
        order?: number,
        controlType?: string,
        validationErrors?:{[x:string]:string}
      } = {}) {
      this.value = options.value;
      this.key = options.key || '';
      this.label = options.label || '';
      this.required = !!options.required;
      this.order = options.order === undefined ? 1 : options.order;
      this.controlType = options.controlType || '';
      this.validationErrors = options.validationErrors || {};
    }
  }