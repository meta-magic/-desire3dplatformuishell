/**
 * Created by dattaram on 28/3/18.
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'canvas-icon-search',
  template: `
    <amexio-window [show-window]="iconWindow"
                   type="window" [closable]="true" [footer]="true" (close)="closeIconWindow()">
      <amexio-header>
        Icons
      </amexio-header>
      <amexio-body>
        <amexio-row>
          <amexio-column [size]="12">
            <amexio-card  [header]="false"
                          [footer]="true"
                          [footer-align]="'left'"[body-height]="55">
              <amexio-body>
                <amexio-row>
                  <amexio-column size="1" *ngFor="let iconObject of finalIconList" >
                    <div class="select-icon" (click)="iconSelect(iconObject.iconName)">
                      <amexio-image
                                    [icon-class]="iconObject.iconName+' fa-2x'">
                      </amexio-image>
                    </div>
                  </amexio-column>
                </amexio-row>
              </amexio-body>
              <amexio-action>
              <amexio-row>
              <amexio-column size="12">
              <amexio-text-input  [(ngModel)]="selectedIcon"
                                       place-holder="Search icon" (keyup)="onSearchIconChange($event)" >
                    </amexio-text-input>
              </amexio-column>
            <!--<amexio-column size="4">
              <amexio-dropdown [(ngModel)]="iconSize"
              [place-holder]="'Choose size'"
              name="iconSize"
               [data]="iconSizeList"
              [readonly]="true"
              [display-field]="'iconSizeName'"
              [value-field]="'iconSizeName'">
              </amexio-dropdown>
              </amexio-column>-->

              </amexio-row>
              </amexio-action>
            </amexio-card>
          </amexio-column>
        </amexio-row>

      </amexio-body>
      <amexio-action>
            <amexio-button [label]="'Cancel'" [type]="'secondary'" (onClick)="closeIconWindow();"></amexio-button>
            <amexio-button [label]="'Select'" [type]="'primary'" (onClick)="onIconSave();"></amexio-button>

      </amexio-action>
    </amexio-window>

  `
})
export class CanvasIconSearchComponent implements OnInit {
  @Input() componentInstance: any;
  @Input() iconWindow: boolean;
  @Input() ischild: boolean;
  @Input() key: any;

  @Output() getSelectedIcon: EventEmitter<any> = new EventEmitter<any>();

  finalIconList: any;
  iconList: any;
  // iconSizeList: any[] = [];
  // iconSize: any;
  @Input() selectedIcon: any;
  constructor(private _httpClient: HttpClient) {
    this.getIconData();
  }

  ngOnInit() {
    // this.iconSizeList = [
    //   {
    //     iconSizeName: 'fa 2x'
    //   },
    //   {
    //     iconSizeName: 'fa 3x'
    //   },
    //   {
    //     iconSizeName: 'fa 4x'
    //   },
    //   {
    //     iconSizeName: 'fa 5x'
    //   }
    // ];

  //   if (this.selectedIcon) {
  //     this.iconSize = this.selectedIcon.slice(-5);
  //     this.selectedIcon = this.selectedIcon.slice(0, -5);
  //   } else {
  //     this.iconSize = 'fa 2x';
  //   }
  }

  onFontSizeClick(data: any) {
    if (data.iconName && this.selectedIcon) {
      this.selectedIcon.substring(0, this.selectedIcon.length - 4);
    }
  }
  //
  onSearchIconChange(event: any) {
    this.finalIconList = [];
    if (event == '' || !event) {
      this.finalIconList = this.iconList;
    } else {
      let keyword: any = event.target.value;
      if (keyword != null && keyword != ' ') {
        let search_term = keyword.toLowerCase();
        this.iconList.forEach((item: any) => {
          if (item != null) {
            if (item['iconName'].toLowerCase().includes(search_term)) {
              this.finalIconList.push(item);
            }
            // if (item['iconName'].toLowerCase().indexOf(' ' + search_term)) {
            //   this.finalIconList.push(item);
            // }
          }
        });
      }
    }
  }
  closeIconWindow() {
    this.iconWindow = false;
  }

  iconSelect(iconName: any) {
    this.selectedIcon = iconName;
  }

  getIconData() {
    let responseData: any;
    this._httpClient.get('assets/dna/icon/faicon.json').subscribe(
      response => {
        responseData = response;
      },
      err => {},
      () => {
        this.iconList = responseData.data;
        this.finalIconList = responseData.data;
      }
    );
  }

  onIconSave() {
    this.selectedIcon = this.selectedIcon ;
    this.getSelectedIcon.emit(this.selectedIcon);
  }
}
