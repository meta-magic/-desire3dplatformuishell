import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement }    from '@angular/core';
import {FormsModule} from "@angular/forms";
import { AmexioTextField } from './textfield.component';
import { AmexioInputHelperComponent } from './input.helper.component';


describe('amexio-text-field' , ()=> {
    let comp: AmexioTextField;
    let fixture: ComponentFixture<AmexioTextField>;
    let de: DebugElement;  
    let el: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
        imports : [FormsModule],
        declarations: [ AmexioTextField, AmexioInputHelperComponent ], 
        });
        fixture = TestBed.createComponent(AmexioTextField);  
        comp = fixture.componentInstance;
        de = fixture.debugElement.children[0];
        el = de.nativeElement;
    });

    it('Display correct label',()=>{
        let labelValue = 'Address';
        comp.fieldlabel = labelValue; 
        fixture.detectChanges(); 
        expect(el.textContent).toContain(labelValue); 
        
    });

});
