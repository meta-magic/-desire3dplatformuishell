import { ValueAccessorBase } from './value-accessor';
import { InputValidator } from './input.validator';
import { OnChanges, AfterViewInit, AfterViewChecked, OnInit } from '@angular/core';

export class BaseInput<T> extends ValueAccessorBase<T> 
                                    implements InputValidator{
  
    protected valid : boolean = true;

    focus(event:any){
        this.checkValidity();
    }

    input(event:any){
        this.checkValidity();
    }

    blur(event:any){
        this.checkValidity();
    }

    change(event:any){
        this.checkValidity();
    }

    checkValidity(){
    }
    
    validateOnInit(){
        return true;
    }

    isValid() {
        return true;
    }
    
}