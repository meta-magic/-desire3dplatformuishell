import {ChangeDetectionStrategy, ChangeDetectorRef, Input} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'tab-code',
  template: `
  <div *ngIf="showLoader" class="loadingnav"></div>
           <amexio-label size="'small'">
              <ng-container *ngIf="sourceCode">
                  <prism-block [code]="sourceCode" [language]="fileType"></prism-block>
              </ng-container>
            </amexio-label>
`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabcodeComponent implements OnInit {
  sourceCode: string;
  fileType: string;
  showLoader: boolean;
  constructor(public _http: HttpClient, private _cdr: ChangeDetectorRef) {}
  ngOnInit() {}
  getFileDataBtnClick(data: any) {
    if (!data.children) {
      if (data.leaf) {
        let filedata: any;
        const sourcePathJSON: any = {};
        sourcePathJSON['sourcePath'] = data.sourcePath;
        this.showLoader = true;
        this._http.post('/api/codepipeline/cps/fetchsourcecode', sourcePathJSON).subscribe(
          res => {
            filedata = res;
          },
          err => {
            console.log('Error occured');
            this.showLoader = false;
          },
          () => {
            const responseData = JSON.parse(filedata.response);
            this.sourceCode = '';
            if (responseData.source) {
              this.sourceCode = responseData.source;
              if (responseData.fileType) {
                 if (responseData.fileType == 'ts') {
                  this.fileType = 'typescript';
                } else {
                   this.fileType = responseData.fileType;
                }
              } else {
                this.fileType = 'html';
              }
              this.showLoader = false;
              this._cdr.detectChanges();
            }
          }
        );
      }
    }
  }
}
