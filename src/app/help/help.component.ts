        
import {Component,OnInit,} from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
    selector : 'help-component',
    templateUrl : './help.component.html'
})
export class HelpComponent implements OnInit{
    helpImageData:any;
    constructor(private http:HttpClient){
    
    }

  ngOnInit(){
   this.getHelpImageData();
}
  getHelpImageData(){
       let helpData:any;
    this.http.get('assets/images/images-help/help.json').subscribe(
      response=>{
        helpData=response;
      },
      error=>{

      },
      ()=>{
        this.helpImageData=helpData;
      }
    );

  }
    }




