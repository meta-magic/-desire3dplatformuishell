/**
 * Created by pratik on 1/12/17.
 */

/*
 Component Name : Amexio Dropdown
 Component Selector :  <amexio-dropdown>
 Component Description : Drop-Down component has been created to render N numbers of drop-down items based on data-set configured. Data-set can be configured using HTTP call OR Define fix number of dropdown-items. User can configure different attributes for enabling filter, multi-select, maximum selection in case of multi select.


*/
import {
  Component,
  ElementRef,
  ContentChild,
  TemplateRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonDataService } from 'amexio-ng-extensions';

const noop = () => {};

export const CUSTOM_DROPDOWN_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmexioNewDropDownComponent),
  multi: true
};

@Component({
  selector: 'amexio-new-dropdown',
  template: `

    <div class="inputgroup" #rootDiv>

      <label *ngIf="haslabel" [style.font-style]="fontstyle" [style.font-family]="fontfamily" [style.font-size]="fontsize">
        {{fieldlabel}}
      </label>

      <input type="hidden"
             [ngModel]="value"
             (ngModelChange)="onChange($event)"
             #inp="ngModel"
      />

      <input type="text" class="input-control"
             [value]="getDisplayText()"
             [ngClass]="{'input-control-error' : inp.invalid && (inp.dirty || inp.touched),'input-control-success' : inp.valid && (inp.dirty || inp.touched)}"
             (blur)="onblur()"
             (click)="onDropDownClick($event)"
             (focus)="onFocus(rootDiv)"
             (input)="onInput(inp)"
             [attr.placeholder]="placeholder"
             [readonly]="readonly ? true : null"
             [attr.disabled]="disabled ? true: null"
             [required]="allowblank ? true: null" (keyup)="onDropDownSearchKeyUp($event)" (keydown)="navigateKey($event)"/>


      <span class="drodown-caret-down" (click)="onIconClick()">
      <amexio-form-icon key="dropdown_caret" *ngIf="!maskloader" ></amexio-form-icon>
      <i class="fa fa-spinner fa-spin" *ngIf="maskloader"></i>
    </span>

      <span #dropdownitems class="dropdown" [ngClass]="{'dropdown-up' : posixUp}" [ngStyle]="{'display': showToolTip ? 'block' : 'none'}">
          <ul class="dropdown-list">

            <li class="list-items" [ngClass]="{'list-items-selected':item.selected}" *ngFor="let item of filteredOptions" (click)="onItemSelect(item)">
              <ng-container *ngIf="bodyTemplate">
                <ng-template [ngTemplateOutlet]="bodyTemplate" [ngTemplateOutletContext]="{ $implicit: { text : item }, row: item }">
                  </ng-template>
                </ng-container>
              <ng-container *ngIf="!bodyTemplate">
                <span>{{item[displayfield]}}</span>
              </ng-container>            <span style="float : right">{{item?.checked ? '&#10004;': ''}}</span>
            </li>
             <ng-template *ngIf="filteredOptions.length < 1">
               <li class="list-items">No Options</li>
             </ng-template>
          </ul>
        </span>
      <span class="inputfieldbar"></span>
    </div>


    <span *ngIf="iconfeedback && (inp.invalid && (inp.dirty || inp.touched) || inp.valid)"
          class="input-control-feedback">
          <span *ngIf="inp.invalid && (inp.dirty || inp.touched)">&#9888;</span>
          <span *ngIf="inp.valid && (inp.dirty || inp.touched)"> &#10004;</span>

        </span>

    <span *ngIf="showToolTip && enablepopover" class="tooltiptext">
          <div [innerHTML]="helpInfoMsg"></div>
  </span>





  `,
  providers: [CUSTOM_DROPDOWN_CONTROL_VALUE_ACCESSOR]
})
export class AmexioNewDropDownComponent
  implements OnInit, ControlValueAccessor {
  /*
  Properties
  name : field-label
  datatype : string
  version : 4.0 onwards
  default :
  description : The label of this field
  */
  @Input('field-label') fieldlabel: string;

  /*
  Properties
  name : allow-blank
  datatype : string
  version : 4.0 onwards
  default :
  description : Sets if field is required
  */
  @Input('allow-blank') allowblank: boolean;

  /*
  Properties
  name : data
  datatype : any
  version : 4.0 onwards
  default :
  description : Local data for dropdown.
  */
  @Input('data')
  set data(values: any) {
    if (values != null) {
      this.setData(values);
    }
  }

  /*
  Properties
  name : data-reader
  datatype : string
  version : 4.0 onwards
  default :
  description : Key in JSON datasource for records
  */
  @Input('data-reader') datareader: string;

  /*
  Properties
  name : http-method
  datatype : string
  version : 4.0 onwards
  default :
  description : Type of HTTP call, POST,GET.
  */
  @Input('http-method') httpmethod: string;

  /*
  Properties
  name : http-url
  datatype : string
  version : 4.0 onwards
  default :
  description : REST url for fetching datasource.
  */
  @Input('http-url') httpurl: string;

  /*
  Properties
  name : display-field
  datatype : string
  version : 4.0 onwards
  default :
  description : Name of key inside response data to display on ui.
  */
  @Input('display-field') displayfield: string;

  /*
  Properties
  name : value-field
  datatype : string
  version : 4.0 onwards
  default :
  description : Name of key inside response data.use to send to backend
  */
  @Input('value-field') valuefield: string;

  /*
  Properties
  name : search
  datatype : boolean
  version : 4.0 onwards
  default : false
  description : true for search box enable
  */
  @Input() search: boolean;

  /*
     Properties
     name : readonly
     datatype : boolean
     version : 4.2.1 onwards
     default : false
     description : true for set dropdown input readonly.
     */
  @Input() readonly: boolean;

  /*
  Properties
  name : multi-select
  datatype : boolean
  version : 4.0 onwards
  default : false
  description : true for select multiple options
  */
  @Input('multi-select') multiselect: boolean;

  @ViewChild('dropdownitems', { read: ElementRef })
  public dropdownitems: ElementRef;

  helpInfoMsg: string;

  displayValue: any;

  _errormsg: string;

  filteredOptions: any[] = [];

  get errormsg(): string {
    return this._errormsg;
  }

  /*
  Properties
  name : error-msg
  datatype : string
  version : 4.0 onwards
  default :
  description : Sets the error message
  */
  @Input('error-msg')
  set errormsg(value: string) {
    this.helpInfoMsg = value + '<br/>';
  }

  /*
  Events
  name : onBlur
  datatype : any
  version : 4.0 onwards
  default :
  description : 	On blur event
  */
  @Output() onBlur: any = new EventEmitter<any>();

  /*
  Events
  name : input
  datatype : any
  version : none
  default :
  description : 	On input event field.
  */
  @Output() input: any = new EventEmitter<any>();

  /*
  Events
  name : focus
  datatype : any
  version : none
  default :
  description : On field focus event
  */
  @Output() focus: any = new EventEmitter<any>();

  /*
  Events
  name : onSingleSelect
  datatype : any
  version : none
  default :
  description : Fire when drop down item selected.
  */
  @Output() onSingleSelect: any = new EventEmitter<any>();

  /*
  Events
  name : onMultiSelect
  datatype : any
  version :none
  default :
  description : Fire when multiple record select in drop down.this event is only applied when multi-select=true

  */
  @Output() onMultiSelect: any = new EventEmitter<any>();

  /*
  Events
  name : onClick
  datatype : any
  version :none
  default :
  description : On record select event.this event is only for normal dropdown.

  */
  @Output() onClick: any = new EventEmitter<any>();

  showToolTip: boolean;

  /*
  Properties
  name : place-holder
  datatype : string
  version : 4.0 onwards
  default :
  description : 	Show place-holder inside dropdown component*/
  @Input('place-holder') placeholder: string;

  /*
  Properties
  name : disabled
  datatype :  boolean
  version : 4.0 onwards
  default : false
  description : If true will not react on any user events and show disable icon over*/
  @Input() disabled: boolean;

  /*
  Properties
  name : icon-feedback
  datatype : boolean
  version : 4.0 onwards
  default : false
  description : */
  @Input('icon-feedback') iconfeedback: boolean;
  /*
  Properties
  name : font-style
  datatype : string
  version : 4.0 onwards
  default :
  description : Set font-style to field
  */
  @Input('font-style') fontstyle: string;
  /*
  Properties
  name : font-family
  datatype : string
  version : 4.0 onwards
  default :
  description : Set font-family to field
  */
  @Input('font-family') fontfamily: string;
  /*
  Properties
  name : font-size
  datatype : string
  version : 4.0 onwards
  default :
  description : Set font-size to field
  */
  @Input('font-size') fontsize: string;
  /*
  Properties
  name : has-label
  datatype : boolean
  version : 4.0 onwards
  default : false
  description : flag to set label
  */
  @Input('has-label') haslabel: boolean = true;
  /*
  Properties
  name : enable-popover
  datatype : boolean
  version : 4.0 onwards
  default :false
  description : Set enable / disable popover.
  */
  @Input('enable-popover') enablepopover: boolean;

  @ContentChild('amexioBodyTmpl') bodyTemplate: TemplateRef<any>;

  posixUp: boolean;

  isComponentValid: boolean;

  @HostListener('document:click', ['$event.target'])
  @HostListener('document: touchstart', ['$event.target'])
  public onElementOutClick(targetElement: HTMLElement) {
    let parentFound = false;
    while (targetElement != null && !parentFound) {
      if (targetElement === this.element.nativeElement) {
        parentFound = true;
      }
      targetElement = targetElement.parentElement;
    }
    if (!parentFound) {
      this.showToolTip = false;
    }
  }

  responseData: any;

  previousData: any;

  viewData: any;

  multiselectValues: any[] = [];

  maskloader: boolean = true;

  constructor(
    public dataService: CommonDataService,
    public element: ElementRef,
    public renderer: Renderer2
  ) {}

  ngOnInit() {
    this.isComponentValid = this.allowblank;
    if (this.placeholder == '' || this.placeholder == null)
      this.placeholder = 'Choose Option';
    if (this.httpmethod && this.httpurl) {
      this.dataService.fetchData(this.httpurl, this.httpmethod).subscribe(
        response => {
          this.responseData = response;
        },
        error => {},
        () => {
          this.setData(this.responseData);
        }
      );
    } else if (this.data) {
      this.previousData = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
  }
  setData(httpResponse: any) {
    //Check if key is added?
    let responsedata = httpResponse;
    if (this.datareader != null) {
      this.multiselectValues = [];
      let dr = this.datareader.split('.');
      if (dr) {
        for (let ir = 0; ir < dr.length; ir++) {
          responsedata = responsedata[dr[ir]];
        }
      }
    } else {
      responsedata = httpResponse;
    }
    if (responsedata) {
      this.viewData = responsedata.sort(
        (a: any, b: any) =>
          a[this.displayfield].toLowerCase() !==
          b[this.displayfield].toLowerCase()
            ? a[this.displayfield].toLowerCase() <
              b[this.displayfield].toLowerCase()
              ? -1
              : 1
            : 0
      );
      this.filteredOptions = this.viewData;
    }
    if (this.multiselect) {
      let preSelectedMultiValues: string = '';
      let optionsChecked: any[] = [];
      this.viewData.forEach((row: any) => {
        if (row.hasOwnProperty('checked') && row.checked) {
          optionsChecked.push(row[this.valuefield]);
          this.multiselectValues.push(row);
          preSelectedMultiValues == ''
            ? (preSelectedMultiValues += row[this.displayfield])
            : (preSelectedMultiValues += ',' + row[this.displayfield]);
        }
      });
      //this.value = optionsChecked;
      this.displayValue = preSelectedMultiValues;
      this.onMultiSelect.emit(this.multiselectValues);
    }

    //Set user selection
    if (this.value != null) {
      let valueKey = this.valuefield;
      let displayKey = this.displayfield;
      let val = this.value;

      this.viewData.forEach((item: any) => {
        if (item[valueKey] == val) {
          this.isComponentValid = true;
          this.displayValue = item[displayKey];
          // this.onSingleSelect.emit(item);
        }
      });
    }
    this.maskloader = false;
  }
  onItemSelect(row: any) {
    if (this.multiselect) {
      let optionsChecked: any[] = [];
      this.multiselectValues = [];
      if (row.hasOwnProperty('checked')) {
        row.checked = !row.checked;
        this.filteredOptions.forEach((row: any) => {
          if (row.checked) {
            optionsChecked.push(row[this.valuefield]);
            this.multiselectValues.push(row);
          }
        });
        this.value = optionsChecked;
        this.onMultiSelect.emit(this.multiselectValues);
      }
    } else {
      this.value = row[this.valuefield]; //Issue here?
      this.displayValue = row[this.displayfield];

      this.multiselect ? (this.showToolTip = true) : (this.showToolTip = false);
      this.onSingleSelect.emit(row);
    }
    this.isComponentValid = true;
  }

  setMultiSelectData() {
    this.multiselectValues = [];
    if (this.value.length > 0) {
      let modelValue = this.value;
      this.filteredOptions.forEach(test => {
        modelValue.forEach((mdValue: any) => {
          if (test[this.valuefield] == mdValue) {
            if (test.hasOwnProperty('checked')) {
              test.checked = true;
            }
            this.multiselectValues.push(test);
          }
        });
      });
    }
  }
  navigateKey(event: any) {}
  getDisplayText(): string {
    if (this.value != null || this.value != '' || this.value != '') {
      if (this.multiselect) {
        this.setMultiSelectData();
        let multiselectDisplayString: any = '';
        this.multiselectValues.forEach((row: any) => {
          multiselectDisplayString == ''
            ? (multiselectDisplayString += row[this.displayfield])
            : (multiselectDisplayString += ',' + row[this.displayfield]);
        });
        if (this.multiselectValues.length > 0) {
          return multiselectDisplayString;
        } else {
          return '';
        }
      } else {
        this.displayValue = '';
        this.filteredOptions.forEach(test => {
          if (test[this.valuefield] == this.value) {
            this.displayValue = test[this.displayfield];
          }
        });
        return this.displayValue == undefined ? '' : this.displayValue;
      }
    }
  }
  onDropDownClick(event: any) {
    this.onClick.emit(event);
  }
  onChange(event: any) {
    this.value = event;
  }

  onInput(input: any) {
    this.input.emit();
    this.isComponentValid = input.valid;
    //this.input.emit(this.value);
  }

  selectedindex: number = 0;
  scrollposition: number = 30;

  onDropDownSearchKeyUp(event: any) {
    if (this.search) {
      let keyword = event.target.value;
      if (keyword != null && keyword != '' && keyword != ' ') {
        this.filteredOptions = [];
        let search_Term = keyword.toLowerCase();
        this.viewData.forEach((row: any) => {
          //row.selected = true;
          if (row[this.displayfield].toLowerCase().startsWith(search_Term)) {
            this.filteredOptions.push(row);
          }
        });
      }
      if (keyword == '') {
        this.filteredOptions = this.viewData;
        //this.selectedindex = 0;
      }
    }
    if (event.keyCode === 40 || event.keyCode === 38 || event.keyCode === 13) {
      this.navigateUsingKey(event);
    }
  }

  navigateUsingKey(event: any) {
    if (this.selectedindex > this.filteredOptions.length) {
      this.selectedindex = 0;
    }
    if (
      event.keyCode === 40 ||
      (event.keyCode === 38 && this.selectedindex < this.filteredOptions.length)
    ) {
      if (!this.showToolTip) {
        this.showToolTip = true;
      }
      let prevselectedindex = 0;
      if (this.selectedindex === 0) {
        this.selectedindex = 1;
      } else {
        prevselectedindex = this.selectedindex;
        if (event.keyCode === 40) {
          this.selectedindex++;
          if (this.selectedindex > 5) {
            this.dropdownitems.nativeElement.scroll(0, this.scrollposition);
            this.scrollposition = this.scrollposition + 30;
          }
        } else if (event.keyCode === 38) {
          this.selectedindex--;
          if (this.scrollposition >= 0 && this.selectedindex > 1) {
            this.dropdownitems.nativeElement.scroll(0, this.scrollposition);
            this.scrollposition = this.scrollposition - 30;
          }
          if (this.selectedindex === 1) {
            this.scrollposition = 30;
          }

          if (this.selectedindex <= 0) {
            //this.selectedindex = 1;
          }
        }
      }

      if (this.filteredOptions[this.selectedindex]) {
        this.filteredOptions[this.selectedindex].selected = true;
      }
      if (this.filteredOptions[prevselectedindex]) {
        this.filteredOptions[prevselectedindex].selected = false;
      }
    }
    if (event.keyCode === 13 && this.filteredOptions[this.selectedindex]) {
      this.onItemSelect(this.filteredOptions[this.selectedindex]);
    }
  }

  // The internal dataviews model
  private innerValue: any = '';

  //Placeholders for the callbacks which are later provided
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  //get accessor
  get value(): any {
    return this.innerValue;
  }

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v != null) {
      if (v !== this.innerValue) {
        this.innerValue = v;
        this.onChangeCallback(v);
      }
    }
  }

  //Set touched on blur
  onblur() {
    this.onTouchedCallback();
    this.onBlur.emit();
  }

  onFocus(elem: any) {
    this.showToolTip = true;
    this.posixUp = this.getListPosition(elem);
    this.focus.emit();
  }

  getListPosition(elementRef: any): boolean {
    let dropdownHeight: number = 325; //must be same in dropdown.scss
    if (
      window.screen.height - elementRef.getBoundingClientRect().bottom <
      dropdownHeight
    ) {
      return true;
      //  return false;
    } else {
      return false;
    }
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (!this.allowblank) {
      if (value != null) {
        if (value !== this.innerValue) {
          if (this.viewData && this.viewData.length > 0) {
            this.viewData.forEach((item: any) => {
              if (item[this.valuefield] == value) {
                this.isComponentValid = true;
              }
            });
          }
          this.innerValue = value;
        }
      } else {
        this.value = '';
        this.isComponentValid = false;
      }
    }
    /*if(value != null) {
        if (value !== this.innerValue) {
          this.innerValue = value;
        }
      } else {
        this.value = '';
      }*/
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  onIconClick() {
    if (!this.disabled) this.showToolTip = !this.showToolTip;
  }
}
