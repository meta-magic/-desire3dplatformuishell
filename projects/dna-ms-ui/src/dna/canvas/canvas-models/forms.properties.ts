/**
 * Created by pratik on 21/2/18.
 */
export interface FormsInterface {
  placeholder?: string;
  disabled?: boolean;
  errorMsg?: string;
  hasLabel?: boolean;
  fieldLabel?: string;
  name: string;

  /*validation related attribute*/

  fieldIcon?: string;
  maxLength?: number;
  minLength?: number;
  maxErrorMsg?: string;
  minErrorMsg?: string;
  allowBlank?: boolean;
  iconFeedBack?: boolean;
  pattern?: string;
  checked?: boolean;

  /*style related attribute*/

  fontStyle?: string;
  fontSize?: number;
  fontFamily?: string;
  enablePopOver?: boolean;
  popoverPlacement?: string;

  /* validation properties*/

  isComponentValid: boolean;

  isBinded?: boolean;
}

export class ModelClass {
  modelName: string;
  modelFieldKey: string;
  constructor() {
    this.modelFieldKey = '';
    this.modelName = '';
  }
}
