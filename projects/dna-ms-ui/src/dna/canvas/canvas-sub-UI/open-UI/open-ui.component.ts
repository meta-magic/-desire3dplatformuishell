/**
 * Created by dattaram on 21/6/18.
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RestCallService } from '../../canvas-service/restcall.service';

@Component({
  selector: 'open-ui',
  template: `
    <amexio-window body-height="70" [vertical-position]="'center'" [horizontal-position]="'center'" [show]="show" (showChange)="closeWindow()"  footer-align="right" header="true"
                   type="window" [closable]="true">
      <amexio-header>Open UI</amexio-header>
      <amexio-body>
          <amexio-row>
            <amexio-column [size]="12">
              <amexio-treeview  [http-url]="'/api/dna/design/findAll'" [http-method]="'get'" [data-reader]="'response'"
                               (nodeClick)="onOpenUI($event)">
              </amexio-treeview>
            </amexio-column>
          </amexio-row>
      </amexio-body>
    </amexio-window>
  `
})
export class OpenUIComponent implements OnInit {
  @Input() show: boolean;
  @Output() showChange: EventEmitter<any> = new EventEmitter();
  @Output() onOpenClick: EventEmitter<any> = new EventEmitter();
  uiList: any[] = []
  constructor(public _restCallService: RestCallService) {}

  ngOnInit() {
   // this.getUIData();
  }

  getUIData() {
    let response: any;
    this._restCallService
      .getRestCall(
        '/api/dna/design/findAll'
      )
      .subscribe(
        res => {
          response = res;
        },
        err => {},
        () => {
          if (response.success) {
            this.uiList = response.response;
          }
        }
      );
  }

  closeWindow() {
    this.show = false;
    this.showChange.emit(this.show);
  }

  onOpenUI(data: any) {
    if (data.leaf) {
      let uiJson: any;
      this._restCallService
        .getRestCall('/api/dna/design/findById/' + data.id)
        .subscribe(
          response => {
            uiJson = response.response;
          },
          err => {},
          () => {
            if (uiJson != null) {
              this.onOpenClick.emit(uiJson);
            }
          }
        );
    }
  }
}
