/**
 * Created by ketangote on 12/1/17.
 */

import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChild
} from '@angular/core';
import { TabPill } from './tab.pill.component';

@Component({
  selector: 'tab-view',
  template: `
    <div class="tabwrapper">
      <div *ngIf="showprev" class="tabnavigation float-left" (click)="previous()"><i class="fa fa-angle-left fa-2x" aria-hidden="true"></i></div>
      <div *ngIf="shownext" class="tabnavigation float-right" (click)="next()"><i class="fa fa-angle-right  fa-2x" aria-hidden="true"></i></div>
      <ul #tab class="tab">
        <li class="tablistitems">
          <div *ngFor="let tabnode of tabPills"  class="tablink activetab" [ngClass]="{'activetab':tabnode.active}" (click)="onTabClick(tabnode)">
            <div class="table">
              <div class="tablerow">
                <div *ngIf="tabnode.iconClass" class="tablecol">
                  <span class="{{tabnode.iconClass}}"  aria-hidden="true"></span>
                </div>
                <div class="tablecol">
                  {{tabnode.title}}
                </div>
                <div *ngIf="closable" class="tablecol" >
                  <i class="fa fa-times" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>


    <div class="tabcontent">
      <ng-content></ng-content>
    </div>


  `
})
export class TabComponent implements OnInit, AfterViewInit, AfterContentInit {
  @Input() closable: boolean;

  @Input() position: string;

  @Input() tabPills: TabPill[];

  @ViewChild('tab', { read: ElementRef })
  public tabs: ElementRef;

  @ContentChildren(TabPill) queryTabs: QueryList<TabPill>;

  @Output() onClick: any = new EventEmitter<any>();

  @Input() tabLocalData: any;

  tabPreviewData: any;

  showprev: boolean = false;

  shownext: boolean = false;

  content: string;

  constructor(public render: Renderer2) {}

  ngOnInit() {
    //render tab pills from binded input
  }

  ngAfterViewInit() {
    if (
      this.tabs.nativeElement.scrollWidth > this.tabs.nativeElement.clientWidth
    ) {
      this.shownext = true;
    }
  }

  ngAfterContentInit() {}

  onTabClick(tab: any) {
    for (let i = 0; i < this.tabPills.length; i++) {
      if (this.tabPills[i] === tab) {
        this.tabPills[i]['active'] = true;
        this.onClick.emit(tab);
      } else {
        this.tabPills[i]['active'] = false;
      }
    }

    // this.content = tab.title;
  }

  next() {
    let nxt = this.tabs.nativeElement;
    nxt.scrollLeft = nxt.scrollLeft + 200;

    if (nxt.scrollWidth - nxt.offsetWidth - nxt.scrollLeft <= 0) {
      this.shownext = false;
    }
    this.showprev = true;
  }

  previous() {
    let prev = this.tabs.nativeElement;
    prev.scrollLeft = prev.scrollLeft - 200;

    if (prev.scrollLeft == 0) {
      this.showprev = false;
    }
    this.shownext = true;
  }

  closeTab(tabNode: TabPill) {
    const newTab: TabPill[] = [];
    const tabs = this.tabs;
    let index = 0;
    let tabHighlightIndex = 0;

    this.tabPills.forEach(tab => {
      tab.active = false;
      if (tab.tabId == tabNode.tabId) {
        tabHighlightIndex = index;
      }
      if (tab.tabId != tabNode.tabId) {
        newTab.push(tab);
      }
      index++;
    });

    if (tabHighlightIndex == newTab.length) {
      tabHighlightIndex--;
    }
    this.activateTab(newTab[tabHighlightIndex].tabId);
    this.tabPills = newTab;
    if (this.tabPills.length == 1) {
      this.closable = false;
    }
  }

  activateTab(tabId: number) {
    const tabs = this.tabs;
    this.tabPills.forEach(tab => {
      tab.active = false;
      if (tab.tabId == tabId) {
        tab.active = true;
      }
    });
  }
}
