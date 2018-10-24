import { Component, Input, OnInit, AfterContentInit } from '@angular/core';
import { AccordionTabComponent } from './accordion.pane';

@Component({
  selector: 'accordion',
  template: `
    <ng-content></ng-content>
  `
})
export class AccordionComponent implements OnInit, AfterContentInit {
  @Input('expand-all') expandAll: boolean;

  @Input('transparent') isTransparent: boolean;

  @Input('angle-icon') angleIcon: boolean;

  @Input('tabs') queryTabs: AccordionTabComponent[];

  accordionCollections: AccordionTabComponent[];

  constructor() {}

  ngOnInit() {
    this.queryTabs.forEach(node =>
      node.emittedEvent.subscribe((eventdata: any) =>
        this.activateAccordionPane(eventdata)
      )
    );

    this.queryTabs.forEach(node => {
      if (this.expandAll) node.active = true;
      else if (node.active) node.active = true;
      else node.active = false;

      if (this.isTransparent) node.isTransparent = true;

      if (this.angleIcon) node.angleIcon = true;
    });
  }

  ngAfterContentInit() {}

  activateAccordionPane(node: AccordionTabComponent) {
    this.accordionCollections.forEach(tab => {
      if (tab == node) {
        tab.active = node.active;
      } else {
        tab.active = false;
      }
    });
  }
}
