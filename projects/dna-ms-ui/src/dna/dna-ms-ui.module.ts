import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AmexioChartsModule,
  AmexioDashBoardModule,
  AmexioMapModule,
  AmexioWidgetModule
} from 'amexio-ng-extensions';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

/* BC AND DOMAIN IMPORTS */

import {BoundedContextComponent} from './module-domain-definition/module/bounded.context.component';
import {DomainComponent} from './module-domain-definition/domain/domain.component';
import {BoundedContextDefinitionComponent} from './module-domain-definition/module/bounded.context.definition.component';
import {BoundedContextDefinitionService} from './module-domain-definition/module/bounded.context.definition.service';
import {DnaNotificationComponent} from './notification/dna.notification.component';


/* SERVICE DEFINITION IMPORTS */
import {OperationDefinationComponent} from './service-defination/operation.defination.component';
import {ServiceDefinationComponent} from './service-defination/service.defination.component';
import {ServiceOperationDefinationComponent} from './service-defination/service.operation.defination.component';

/* DATA MODEL IMPORTS*/

import {DataModelComponent} from './data-model-definition/data.model.component';


/* Menu Builder IMPORTS*/

import {MenuBuilderComponent} from './menu-builder/menu.builder.component';



/* CANVAS COMPONENT IMPORTS */

import { CanvasComponent } from './canvas/canvas.component';
import { EventHandlerService } from './canvas/canvas-service/event.service';
import { CanvasTextInputComponent } from './canvas/canvas-component/textinput/textinput.component';
import { TextInputPropertyComponent } from './canvas/canvas-component/textinput/textinput.property';
import { RestCallService } from './canvas/canvas-service/restcall.service';
import { EditorStateService } from './canvas/canvas-service/editor.state';
import { DragDropEventService } from './canvas/canvas-service/dragdrop.event.service';
import { CanvasRowComponent } from './canvas/canvas-component/row/row.component';
import { RowPropertyComponent } from './canvas/canvas-component/row/row.property';
import { ColumnPropertyComponent } from './canvas/canvas-component/column/column.property';
import { CanvasColumnComponent } from './canvas/canvas-component/column/column.comoponent';
import { CanvasEmailComponent } from './canvas/canvas-component/emailinput/emailinput.component';
import { EmailInputPropertyComponent } from './canvas/canvas-component/emailinput/email.property';
import { CanvasRatingComponent } from './canvas/canvas-component/rating/rating.component';
import { RatingPropertyComponent } from './canvas/canvas-component/rating/rating.property';
import { CheckBoxComponent } from './canvas/canvas-component/checkbox/checkbox.component';
import { CheckBoxPropertyComponent } from './canvas/canvas-component/checkbox/checkbox.property';
import { CheckBoxGroupCanvasComponent } from './canvas/canvas-component/checkbox-group/checkbox.group.component';
import { CheckBoxGroupPropertyComponent } from './canvas/canvas-component/checkbox-group/checkbox.group.property';
import { DateTimePickerCanvasComponent } from './canvas/canvas-component/datetime-picker/datetime.picker.component';
import { DateTimePickerPropertyComponent } from './canvas/canvas-component/datetime-picker/datetime.picker.property';
import { DropDownCanvasComponent } from './canvas/canvas-component/dropdown/dropdown.component';
import { DropDownPropertyComponent } from './canvas/canvas-component/dropdown/dropdown.property';
import { FileUploadPropertyComponent } from './canvas/canvas-component/fileupload/fileupload.property';
import { FileUploadCanvasComponent } from './canvas/canvas-component/fileupload/fileupload.component';
import { SliderPropertyComponent } from './canvas/canvas-component/slider/slider.property';
import { CanvasSliderComponent } from './canvas/canvas-component/slider/slider.component';
import { CanvasTypeAheadComponent } from './canvas/canvas-component/typeahead/typeahead.component';
import { TypeAheadPropertyComponent } from './canvas/canvas-component/typeahead/typeahead.property';
import { LabelComponent} from './canvas/canvas-component/label/label.component';
import { NumberFieldDemoComponent } from './canvas/canvas-component/number-field/numberfield.component';
import { NumberFieldPropertyComponent } from './canvas/canvas-component/number-field/numberfield.property';
import { PasswordCanvasComponent } from './canvas/canvas-component/password-field/password.field.component';
import { PasswordPropertyComponent } from './canvas/canvas-component/password-field/property.field.property';
import { RadioGroupcanvasComponent } from './canvas/canvas-component/radio-group/radio.group.component';
import { RadioGroupPropertyComponent } from './canvas/canvas-component/radio-group/radio.group.property';
import { LabelPropertyComponent } from './canvas/canvas-component/label/label.property';
import { CanvasTagInputComponent } from './canvas/canvas-component/taginput/taginput.component';
import { TagInputPropertyComponent } from './canvas/canvas-component/taginput/taginput.property';
import { TextAreaInputPropertyComponent } from './canvas/canvas-component/textarea/textarea.property';
import { CanvasTextAreaInputComponent } from './canvas/canvas-component/textarea/textarea.component';
import { TogglePropertyComponent } from './canvas/canvas-component/toggle/toggle.property';
import { CanvasToggleComponent } from './canvas/canvas-component/toggle/toggle.component';
import { TimePickerPropertyComponent } from './canvas/canvas-component/timepicker/timepicker.property.component';
import { TimePickerCanvasComponent } from './canvas/canvas-component/timepicker/timepicker.canvas.component';
import { ButtonCanvasComponent } from './canvas/canvas-component/button/button.canvas.component';
import { ButtonPropertyComponent } from './canvas/canvas-component/button/button.property.component';
import { ButtonGroupComponent } from './canvas/canvas-component/buttongroup/buttongroup.component';
import { ButtonGroupPropertyComponent } from './canvas/canvas-component/buttongroup/buttongroup.property';
import { CanvasButtonGroupActionComponent } from './canvas/canvas-component/buttongroup/buttongroup.action.component';
import { PaginatorCanvasComponent } from './canvas/canvas-component/paginator/paginator.canvas.component';
import { PaginatorPropertyComponent } from './canvas/canvas-component/paginator/paginator.property.component';
import { ProgressBarComponent } from './canvas/canvas-component/progress-bar/progress.bar.component';
import { ProgressBarPropertyComponent } from './canvas/canvas-component/progress-bar/progress.bar.property';
import { CanvasCardComponent } from './canvas/canvas-component/card/card.component';
import { CanvasCardBodyComponent } from './canvas/canvas-component/card/card.body.component';
import { CanvasCardActionComponent } from './canvas/canvas-component/card/card.action.component';
import { CardPropertyComponent } from './canvas/canvas-component/card/card.property';
import { CanvasCardHeaderComponent } from './canvas/canvas-component/card/card.header.component';
import { CanvasIconComponent } from './canvas/canvas-component/icon/icon.component';
import { IconPropertyComponent } from './canvas/canvas-component/icon/icon.property';
import { DataSourceComponent } from './canvas/datasource/datasource.component';
import { CanvasStepBoxComponent } from './canvas/canvas-component/stepbox/stepbox.component';
import { CanvasStepBoxBlockComponent } from './canvas/canvas-component/stepbox/stepbox-block.component';
import { StepboxPropertyComponent } from './canvas/canvas-component/stepbox/stepbox.property';
import { StepBoxBlockPropertyComponent } from './canvas/canvas-component/stepbox/stepbox-block.property';
import { ImagePropertyComponent } from './canvas/canvas-component/image/image.property';
import { CanvasImageComponent } from './canvas/canvas-component/image/image.component';
import { ResponseMapperComponent } from './canvas/datasource/response.mapper';
import { AmexioTreeViewComponentCanvas } from './canvas/local-components/tree.component';
import { VideoPropertyComponent } from './canvas/canvas-component/video/video.property';
import { CanvasVideoComponent } from './canvas/canvas-component/video/video.component';
import { FieldSetPropertyComponent } from './canvas/canvas-component/fieldset/fieldset.property';
import { CanvasFieldSetComponent } from './canvas/canvas-component/fieldset/fieldset.component';
import { PanelPropertyComponent } from './canvas/canvas-component/panel/panel.property';
import { CanvasPanelComponent } from './canvas/canvas-component/panel/panel.component';
import { CanvasTabContainerComponent } from './canvas/canvas-component/tab/tab.container.component';
import { TabContainerPropertyComponent } from './canvas/canvas-component/tab/tab.container.property';
import { CanvasItemSelectorComponent } from './canvas/canvas-component/itemselector/itemselector.component';
import { ItemSelectorPropertyComponent } from './canvas/canvas-component/itemselector/itemselector.property';
import { CanvasDataGridComponent } from './canvas/canvas-component/datagrid/datagrid.component';
import { DatagridPropertyComponent } from './canvas/canvas-component/datagrid/datagrid.property';
import { CanvasDataGridColumnComponent } from './canvas/canvas-component/datagrid/datagrid.column.component';
import { CanvasTreeComponent } from './canvas/canvas-component/tree/tree.component';
import { TreePropertyComponent } from './canvas/canvas-component/tree/tree.property';
import { CanvasListboxComponent } from './canvas/canvas-component/listbox/listbox.component';
import { ListboxPropertyComponent } from './canvas/canvas-component/listbox/listbox.property';
import { TabComponent } from './canvas/local-components/tab/basic/tab.component';
import { TabPill } from './canvas/local-components/tab/basic/tab.pill.component';
import { CanvasTreeDataTableComponent } from './canvas/datasource/local-datasource-tree-datagrid/local.treedatatable.component';
import { CanvasTreeColumnComponent } from './canvas/datasource/local-datasource-tree-datagrid/local-tree.column';
import { TabPillPropertyComponent } from './canvas/canvas-component/tab/tabpill.property.component';
import { VerticalTabComponent } from './canvas/local-components/tab/vertical/vertical.tab.component';
import { VerticalTabPropertyComponent } from './canvas/canvas-component/tab/verticaltab/vertical.tab.container.property';
import { CanvasVerticalTabComponent } from './canvas/canvas-component/tab/verticaltab/vertical.tab.container.component';
import { VerticalRightTabComponent } from './canvas/local-components/tab/right-vertical/right.vertical.tab.component';
import { CanvasVerticalRightTabComponent } from './canvas/canvas-component/tab/right-vertical-tab/right.vertical.tab.container.component';
import { VerticalRightTabPropertyComponent } from './canvas/canvas-component/tab/right-vertical-tab/right.vertical.tab.container.property';
import { AccordionComponent } from './canvas/local-components/accordion/accordion.component';
import { AccordionTabComponent } from './canvas/local-components/accordion/accordion.pane';
import { CanvasAccordionContainerComponent } from './canvas/canvas-component/accordion/accordion.component';
import { AccordionContainerPropertyComponent } from './canvas/canvas-component/accordion/accordion.property.component';
import { AccordionTabPropertyComponent } from './canvas/canvas-component/accordion/accordion.tab.property.component';
import { CanvasChildtreeDataTableComponent } from './canvas/datasource/local-datasource-tree-datagrid/child.datatable.component';
import { ButtonDropDownCanvasComponent } from './canvas/canvas-component/buttondropdown/button.canvas.component';
import { ButtonDropDownPropertyComponent } from './canvas/canvas-component/buttondropdown/button.property.component';
import { CanvasBorderLayoutComponent } from './canvas/canvas-component/borderlayout/canvas.borderlayout.component';
import { CanvasNorthBorderComponent } from './canvas/canvas-component/borderlayout/canvas.border.north.component';
import { CanvasEastBorderComponent } from './canvas/canvas-component/borderlayout/canvas.border.east.component';
import { CanvasCenterBorderComponent } from './canvas/canvas-component/borderlayout/canvas.border.center.component';
import { CanvasSouthComponentComponent } from './canvas/canvas-component/borderlayout/cavnvas.border.south.component';
import { BorderPropertyComponent } from './canvas/canvas-component/borderlayout/border.property';
import { CanvasWestComponentComponent } from './canvas/canvas-component/borderlayout/canvas.border.west.component';
import { CanvasDataPointComponent } from './canvas/canvas-component/datapoint/canvas.datapoint.component';
import { DatapointPropertyComponent } from './canvas/canvas-component/datapoint/canvas.datapoint.property.component';
import { DatapointWestPropertyComponent } from './canvas/canvas-component/datapoint/canvas.datapoint.west.property';
import { CanvasDataPointWestComponentComponent } from './canvas/canvas-component/datapoint/canvas.datapoint.west.component';
import { CanvasButtonLinkComponent } from './canvas/canvas-component/buttondropdown/buttondropdown.link.component';
import { CanvasDataPointEastComponentComponent } from './canvas/canvas-component/datapoint/canvas.datapoint.east.component';
import { DatapointEastPropertyComponent } from './canvas/canvas-component/datapoint/canvas.datapoint.east.property';
import { CanvasDataPointCenterComponent } from './canvas/canvas-component/datapoint/canvas.datapoint.center.component';
import { CanvasDataPointSouthComponent } from './canvas/canvas-component/datapoint/canvas.datapoint.south.component';
import { CanvasDataPointNorthComponentComponent } from './canvas/canvas-component/datapoint/canvas.datapoint.north.component';
import { EmptyBorderPropertyComponent } from './canvas/canvas-component/borderlayout/empty.property.pane';
import { CanvasLocalDataPointsComponent } from './canvas/local-components/datapoints/datapoints.component';
import { AreachartPropertyComponent } from './canvas/canvas-component/charts/areachart/areachart.property';
import { CanvasAreachartComponent } from './canvas/canvas-component/charts/areachart/areachart.component';
import { BarchartPropertyComponent } from './canvas/canvas-component/charts/barchart/barchart.property';
import { CanvasBarchartComponent } from './canvas/canvas-component/charts/barchart/barchart.component';
import { BubblechartPropertyComponent } from './canvas/canvas-component/charts/bubblechart/bubblechart.property';
import { CanvasBubblechartComponent } from './canvas/canvas-component/charts/bubblechart/bubblechart.component';
import { CandlestickchartPropertyComponent } from './canvas/canvas-component/charts/candlestickchart/candlestickchart.property';
import { CanvasCandlestickchartComponent } from './canvas/canvas-component/charts/candlestickchart/candlestickchart.component';
import { CandlestickwaterfallchartPropertyComponent } from './canvas/canvas-component/charts/candlestickwaterfallchart/candlestickwaterfallchart.property';
import { CanvasCandlestickwaterfallchartComponent } from './canvas/canvas-component/charts/candlestickwaterfallchart/candlestickwaterfallchart.component';
import { ChartProperties } from './canvas/canvas-component/charts/chartproperties/chartproperties';
import { ColumnchartPropertyComponent } from './canvas/canvas-component/charts/columnchart/columnchart.property';
import { CanvasColumnchartComponent } from './canvas/canvas-component/charts/columnchart/columnchart.component';
import { CombochartPropertyComponent } from './canvas/canvas-component/charts/combochart/combochart.property';
import { CanvasCombochartComponent } from './canvas/canvas-component/charts/combochart/combochart.component';
import { DonutchartPropertyComponent } from './canvas/canvas-component/charts/donutchart/donutchart.property';
import { CanvasDonutchartComponent } from './canvas/canvas-component/charts/donutchart/donutchart.component';
import { HistogramchartPropertyComponent } from './canvas/canvas-component/charts/histogramchart/histogramchart.property';
import { CanvasHistogramchartComponent } from './canvas/canvas-component/charts/histogramchart/histogramchart.component';
import { LinechartPropertyComponent } from './canvas/canvas-component/charts/linechart/linechart.property';
import { CanvasLinechartComponent } from './canvas/canvas-component/charts/linechart/linechart.component';
import { PiechartPropertyComponent } from './canvas/canvas-component/charts/piechart/piechart.property';
import { CanvasPiechartComponent } from './canvas/canvas-component/charts/piechart/piechart.component';
import { ScatterchartPropertyComponent } from './canvas/canvas-component/charts/scatterchart/scatterchart.property';
import { CanvasScatterchartComponent } from './canvas/canvas-component/charts/scatterchart/scatterchart.component';
import { GuagechartPropertyComponent } from './canvas/canvas-component/dashboards/gaugechart.property';
import { CanvasGaugechartComponent } from './canvas/canvas-component/dashboards/gaugechart.component';
import { TimelinechartPropertyComponent } from './canvas/canvas-component/charts/timelinechart/timelinechart.property';
import { CanvasTimelinechartComponent } from './canvas/canvas-component/charts/timelinechart/timelinechart.component';
import { GeochartPropertyComponent } from './canvas/canvas-component/maps/geochart/geochart.property';
import { CanvasGeochartComponent } from './canvas/canvas-component/maps/geochart/geochart.component';
import { TreemapchartPropertyComponent } from './canvas/canvas-component/maps/treemap/treemapchart.property';
import { CanvasTreemapchartComponent } from './canvas/canvas-component/maps/treemap/treemapchart.component';
import { ButtonFloatCanvasComponent } from './canvas/canvas-component/button-floating/buttonfloat.canvas.component';
import { ButtonFloatPropertyComponent } from './canvas/canvas-component/button-floating/buttonfloat.property.component';
import { ButtonFloatGroupCanvasComponent } from './canvas/canvas-component/button-floating-group/button.floating.group.component';
import { ButtonFloatGroupPropertyComponent } from './canvas/canvas-component/button-floating-group/button.floating.group.property';
import { CanvasBreaklineComponent } from './canvas/canvas-component/breakline/breakline.component';
import { BreakLinePropertyComponent } from './canvas/canvas-component/breakline/breakline.property';
import { CanvasIconSearchComponent } from './canvas/canvas-icon-search/custom.icon.search.component';
import { EventRelationShipComponent } from './canvas/event-relationship/event.relationship';
import { BoxComponent } from './canvas/canvas-component/box/box.component';
import { BoxPropertyComponent } from './canvas/canvas-component/box/box.property.component';
import { CanvasFormComponent } from './canvas/canvas-component/form/form.component';
import { CanvasFormHeaderComponent } from './canvas/canvas-component/form/form.header.component';
import { CanvasFormActionComponent } from './canvas/canvas-component/form/form.action.component';
import { CanvasFormBodyComponent } from './canvas/canvas-component/form/form.body.component';
import { FormPropertyComponent } from './canvas/canvas-component/form/form.property';
import { TreeViewComponent } from './canvas/event-relationship/tree/treenode.component';
import { EventRelationshipService } from './canvas/canvas-service/event-relationship.service';
import { ShowEventListComponent } from './canvas/local-components/event-list/show-event-list.component';
import { RootPaneComponent } from './canvas/canvas-component/root-pane/root-pane.component';
import { NotificationService } from './canvas/canvas-service/notification.service';
import { SharedDataService } from './canvas/canvas-service/shared-data.service';
import { CreateUIComponent } from './canvas/canvas-sub-UI/create-UI/create-ui.component';
import { OpenUIComponent } from './canvas/canvas-sub-UI/open-UI/open-ui.component';
import { ServiceBlockBehaviour } from './canvas/event-relationship/relationship-component/serviceblock.component';
import { UpdateModelBlockBehaviour } from './canvas/event-relationship/relationship-component/updatemodelBlock.component';
import { ServiceBidingComponent } from './canvas/event-relationship/service-binding/servicebinding.component';
import { UpdateModelComponent } from './canvas/event-relationship/updatemodel/update-model.component';
import { BehaviourComponent } from './canvas/canvas-component/behaviour/behaviour.component';
import { NotificationModelComponent } from './canvas/event-relationship/notification/notification.component';
import { NotificationBlockBehaviour } from './canvas/event-relationship/relationship-component/notificationblock.component';
import { NavigateBlockBehaviour } from './canvas/event-relationship/relationship-component/navigateblock.component';
import { NavigateModelComponent } from './canvas/event-relationship/navigate/navigate.component';
import { AmexioNewDropDownComponent } from './canvas/local-components/drop/dropdown.component';
import { CreateModelComponent } from './canvas/canvas-sub-UI/create-model-UI/createmodel.component';
import { ModelMapComponent } from './canvas/canvas-sub-UI/model-mapping/model.mapping.component';
import {CanvasNotificationComponent} from './canvas/canvas-sub-UI/notification/notification.component';
import {LiveCodeComponent} from './preview/livecodecomponent';
import {ElseBlockBehaviour} from './canvas/event-relationship/relationship-component/elseblock.component';
import {ElseIfBlockBehaviour} from './canvas/event-relationship/relationship-component/elseIfblock.component';
import {ConditionTreeComponent} from './canvas/event-relationship/condition/condition.tree.component';
import {ConditionBindingComponent} from './canvas/event-relationship/condition/condition.component';
import {PlatformCommonsModule} from 'platform-commons';
import {CookieService} from 'ngx-cookie-service';
import {ConditionBlockBehaviour} from "./canvas/event-relationship/relationship-component/ifblock.component";
import {IfBlockBehaviour} from "./canvas/event-relationship/relationship-component/condition.block.component";




const routes: Routes = [
  {
    path: 'data-model',
    component: DataModelComponent
  },
  {
    path: 'menu-builder',
    component: MenuBuilderComponent
  },
  {
    path: 'service-defination',
    component: ServiceOperationDefinationComponent
  },
  {
    path: 'canvas',
    component: CanvasComponent
  },
  {
    path: 'preview',
    component: LiveCodeComponent
  },
  {
    path: 'boundedcontextDefinition', component: BoundedContextDefinitionComponent,
    children: [
      {
        path: 'boundedContext', component: BoundedContextComponent
      },
      {
        path: 'module/:BContextId',
        component: DomainComponent
      },
      {
        path: 'module',
        component: DomainComponent
      },
      {
        path: 'module/:domainId',
        component: DomainComponent
      }
    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AmexioChartsModule,
    AmexioDashBoardModule,
    AmexioMapModule,
    AmexioWidgetModule,
    HttpClientModule,
    PlatformCommonsModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [
    /* BOUNDED CONTEXT AND DOMAIN UI COMPONENTS */
    BoundedContextComponent,
    BoundedContextDefinitionComponent,
    DomainComponent,
    DnaNotificationComponent,

    /* SERVICE DEFINITION COMPONENTS */
    OperationDefinationComponent,
    ServiceDefinationComponent,
    ServiceOperationDefinationComponent,

    /* DATA MODEL COMPONENTS */
    DataModelComponent,

    /*Menu Builder COMPONENTS */
    MenuBuilderComponent,


    /* CANVAS COMPONENTS */
    LiveCodeComponent,
    CanvasNotificationComponent,
    CreateModelComponent,
    ModelMapComponent,
    CanvasComponent,
    DataModelComponent,

    AmexioNewDropDownComponent,
    NotificationModelComponent,

    BehaviourComponent,
    NavigateModelComponent,
    NavigateBlockBehaviour,
    ServiceBlockBehaviour,
    UpdateModelBlockBehaviour,
    NotificationBlockBehaviour,

    ServiceBidingComponent,
    UpdateModelComponent,

    CreateUIComponent,
    OpenUIComponent,

    ShowEventListComponent,
    TreeViewComponent,
    EventRelationShipComponent,
    CanvasTreeDataTableComponent,
    CanvasChildtreeDataTableComponent,
    CanvasTreeColumnComponent,
    CanvasComponent,

    RootPaneComponent,

    CanvasTextInputComponent,
    TextInputPropertyComponent,

    CanvasRowComponent,
    RowPropertyComponent,

    CanvasColumnComponent,
    ColumnPropertyComponent,

    CanvasEmailComponent,
    EmailInputPropertyComponent,

    CanvasRatingComponent,
    RatingPropertyComponent,

    CheckBoxComponent,
    CheckBoxPropertyComponent,

    CheckBoxGroupCanvasComponent,
    CheckBoxGroupPropertyComponent,

    SliderPropertyComponent,
    CanvasSliderComponent,

    DateTimePickerCanvasComponent,
    DateTimePickerPropertyComponent,

    DropDownPropertyComponent,
    DropDownCanvasComponent,

    FileUploadPropertyComponent,
    FileUploadCanvasComponent,

    CanvasTypeAheadComponent,
    TypeAheadPropertyComponent,

    LabelComponent,
    LabelPropertyComponent,

    NumberFieldDemoComponent,
    NumberFieldPropertyComponent,

    PasswordCanvasComponent,
    PasswordPropertyComponent,

    RadioGroupcanvasComponent,
    RadioGroupPropertyComponent,

    CanvasTagInputComponent,
    TagInputPropertyComponent,

    CanvasTextAreaInputComponent,
    TextAreaInputPropertyComponent,

    CanvasToggleComponent,
    TogglePropertyComponent,

    TimePickerCanvasComponent,
    TimePickerPropertyComponent,

    ButtonCanvasComponent,
    ButtonPropertyComponent,

    ButtonGroupComponent,
    ButtonGroupPropertyComponent,
    CanvasButtonGroupActionComponent,

    PaginatorCanvasComponent,
    PaginatorPropertyComponent,

    ProgressBarComponent,
    ProgressBarPropertyComponent,
    PaginatorPropertyComponent,
    CanvasCardComponent,
    CanvasCardBodyComponent,
    CanvasCardActionComponent,
    CardPropertyComponent,
    CanvasCardHeaderComponent,

    IconPropertyComponent,
    CanvasIconComponent,
    DataSourceComponent,
    /*stepbox*/
    CanvasStepBoxComponent,
    CanvasStepBoxBlockComponent,
    StepboxPropertyComponent,
    StepBoxBlockPropertyComponent,
    ImagePropertyComponent,
    CanvasImageComponent,
    ResponseMapperComponent,
    VideoPropertyComponent,
    CanvasVideoComponent,
    AmexioTreeViewComponentCanvas,
    CanvasFieldSetComponent,
    FieldSetPropertyComponent,
    CanvasPanelComponent,
    PanelPropertyComponent,
    FieldSetPropertyComponent,

    /*tab conatiner*/

    CanvasTabContainerComponent,
    TabContainerPropertyComponent,

    CanvasItemSelectorComponent,
    ItemSelectorPropertyComponent,
    /*datagrid*/
    CanvasDataGridComponent,
    DatagridPropertyComponent,
    CanvasDataGridColumnComponent,
    CanvasTreeComponent,
    TreePropertyComponent,
    CanvasListboxComponent,
    ListboxPropertyComponent,
    TabComponent,
    TabPill,
    TabPillPropertyComponent,
    VerticalTabComponent,
    VerticalTabPropertyComponent,
    CanvasVerticalTabComponent,
    VerticalRightTabComponent,
    CanvasVerticalRightTabComponent,
    VerticalRightTabPropertyComponent,
    AccordionComponent,
    AccordionTabComponent,
    CanvasAccordionContainerComponent,
    AccordionContainerPropertyComponent,
    AccordionTabPropertyComponent,
    ButtonDropDownCanvasComponent,
    CanvasButtonLinkComponent,
    ButtonDropDownPropertyComponent,
    CanvasBorderLayoutComponent,
    CanvasNorthBorderComponent,
    CanvasEastBorderComponent,
    CanvasCenterBorderComponent,
    CanvasWestComponentComponent,
    CanvasSouthComponentComponent,
    BorderPropertyComponent,
    CanvasDataPointComponent,
    DatapointPropertyComponent,
    DatapointWestPropertyComponent,
    CanvasDataPointWestComponentComponent,
    CanvasDataPointEastComponentComponent,
    DatapointEastPropertyComponent,
    CanvasDataPointCenterComponent,
    CanvasDataPointSouthComponent,
    CanvasDataPointNorthComponentComponent,
    EmptyBorderPropertyComponent,
    CanvasLocalDataPointsComponent,

    AreachartPropertyComponent,
    CanvasAreachartComponent,
    BarchartPropertyComponent,
    CanvasBarchartComponent,
    BubblechartPropertyComponent,
    CanvasBubblechartComponent,
    CandlestickchartPropertyComponent,
    CanvasCandlestickchartComponent,
    CandlestickwaterfallchartPropertyComponent,
    CanvasCandlestickwaterfallchartComponent,
    ChartProperties,
    ColumnchartPropertyComponent,
    CanvasColumnchartComponent,
    CombochartPropertyComponent,
    CanvasCombochartComponent,
    DonutchartPropertyComponent,
    CanvasDonutchartComponent,
    HistogramchartPropertyComponent,
    CanvasHistogramchartComponent,
    LinechartPropertyComponent,
    CanvasLinechartComponent,
    PiechartPropertyComponent,
    CanvasPiechartComponent,
    ScatterchartPropertyComponent,
    CanvasScatterchartComponent,
    TimelinechartPropertyComponent,
    CanvasTimelinechartComponent,
    CanvasGeochartComponent,
    GuagechartPropertyComponent,
    CanvasGaugechartComponent,
    GeochartPropertyComponent,
    TreemapchartPropertyComponent,
    CanvasTreemapchartComponent,
    ButtonFloatCanvasComponent,
    ButtonFloatPropertyComponent,
    ButtonFloatGroupCanvasComponent,
    ButtonFloatGroupPropertyComponent,
    CanvasBreaklineComponent,
    BreakLinePropertyComponent,

    /*icon search*/
    CanvasIconSearchComponent,

    /*box component*/
    BoxComponent,
    BoxPropertyComponent,
    // FORM
    CanvasFormComponent,
    CanvasFormBodyComponent,
    CanvasFormActionComponent,
    CanvasFormHeaderComponent,
    FormPropertyComponent,


    /*CONDITION UI*/

    ElseBlockBehaviour,
    ElseIfBlockBehaviour,
    ConditionBlockBehaviour,
    ConditionBindingComponent,
    ConditionTreeComponent,
    IfBlockBehaviour

  ],
  exports: [
    /* BOUNDED CONTEXT AND DOMAIN UI COMPONENTS */
    LiveCodeComponent,
    BoundedContextComponent,
    BoundedContextDefinitionComponent,
    DomainComponent,
    DnaNotificationComponent,

    /* SERVICE DEFINITION COMPONENTS */
    OperationDefinationComponent,
    ServiceDefinationComponent,
    ServiceOperationDefinationComponent,

    /* DATA MODEL COMPONENTS */
    DataModelComponent,

    /* Menu Builder COMPONENTS*/
    MenuBuilderComponent,

    CanvasNotificationComponent,
    CreateModelComponent,
    ModelMapComponent,
    CanvasComponent,
    DataModelComponent,

    AmexioNewDropDownComponent,
    NotificationModelComponent,

    BehaviourComponent,
    NavigateModelComponent,
    NavigateBlockBehaviour,
    ServiceBlockBehaviour,
    UpdateModelBlockBehaviour,
    NotificationBlockBehaviour,

    ServiceBidingComponent,
    UpdateModelComponent,

    CreateUIComponent,
    OpenUIComponent,

    ShowEventListComponent,
    TreeViewComponent,
    EventRelationShipComponent,
    CanvasTreeDataTableComponent,
    CanvasChildtreeDataTableComponent,
    CanvasTreeColumnComponent,
    CanvasComponent,

    RootPaneComponent,

    CanvasTextInputComponent,
    TextInputPropertyComponent,

    CanvasRowComponent,
    RowPropertyComponent,

    CanvasColumnComponent,
    ColumnPropertyComponent,

    CanvasEmailComponent,
    EmailInputPropertyComponent,

    CanvasRatingComponent,
    RatingPropertyComponent,

    CheckBoxComponent,
    CheckBoxPropertyComponent,

    CheckBoxGroupCanvasComponent,
    CheckBoxGroupPropertyComponent,

    SliderPropertyComponent,
    CanvasSliderComponent,

    DateTimePickerCanvasComponent,
    DateTimePickerPropertyComponent,

    DropDownPropertyComponent,
    DropDownCanvasComponent,

    FileUploadPropertyComponent,
    FileUploadCanvasComponent,

    CanvasTypeAheadComponent,
    TypeAheadPropertyComponent,

    LabelComponent,
    LabelPropertyComponent,

    NumberFieldDemoComponent,
    NumberFieldPropertyComponent,

    PasswordCanvasComponent,
    PasswordPropertyComponent,

    RadioGroupcanvasComponent,
    RadioGroupPropertyComponent,

    CanvasTagInputComponent,
    TagInputPropertyComponent,

    CanvasTextAreaInputComponent,
    TextAreaInputPropertyComponent,

    CanvasToggleComponent,
    TogglePropertyComponent,

    TimePickerCanvasComponent,
    TimePickerPropertyComponent,

    ButtonCanvasComponent,
    ButtonPropertyComponent,

    ButtonGroupComponent,
    ButtonGroupPropertyComponent,
    CanvasButtonGroupActionComponent,

    PaginatorCanvasComponent,
    PaginatorPropertyComponent,

    ProgressBarComponent,
    ProgressBarPropertyComponent,
    PaginatorPropertyComponent,
    CanvasCardComponent,
    CanvasCardBodyComponent,
    CanvasCardActionComponent,
    CardPropertyComponent,
    CanvasCardHeaderComponent,

    IconPropertyComponent,
    CanvasIconComponent,
    DataSourceComponent,
    /*stepbox*/
    CanvasStepBoxComponent,
    CanvasStepBoxBlockComponent,
    StepboxPropertyComponent,
    StepBoxBlockPropertyComponent,
    ImagePropertyComponent,
    CanvasImageComponent,
    ResponseMapperComponent,
    VideoPropertyComponent,
    CanvasVideoComponent,
    AmexioTreeViewComponentCanvas,
    CanvasFieldSetComponent,
    FieldSetPropertyComponent,
    CanvasPanelComponent,
    PanelPropertyComponent,
    FieldSetPropertyComponent,

    /*tab conatiner*/

    CanvasTabContainerComponent,
    TabContainerPropertyComponent,

    CanvasItemSelectorComponent,
    ItemSelectorPropertyComponent,
    /*datagrid*/
    CanvasDataGridComponent,
    DatagridPropertyComponent,
    CanvasDataGridColumnComponent,
    CanvasTreeComponent,
    TreePropertyComponent,
    CanvasListboxComponent,
    ListboxPropertyComponent,
    TabComponent,
    TabPill,
    TabPillPropertyComponent,
    VerticalTabComponent,
    VerticalTabPropertyComponent,
    CanvasVerticalTabComponent,
    VerticalRightTabComponent,
    CanvasVerticalRightTabComponent,
    VerticalRightTabPropertyComponent,
    AccordionComponent,
    AccordionTabComponent,
    CanvasAccordionContainerComponent,
    AccordionContainerPropertyComponent,
    AccordionTabPropertyComponent,
    ButtonDropDownCanvasComponent,
    CanvasButtonLinkComponent,
    ButtonDropDownPropertyComponent,
    CanvasBorderLayoutComponent,
    CanvasNorthBorderComponent,
    CanvasEastBorderComponent,
    CanvasCenterBorderComponent,
    CanvasWestComponentComponent,
    CanvasSouthComponentComponent,
    BorderPropertyComponent,
    CanvasDataPointComponent,
    DatapointPropertyComponent,
    DatapointWestPropertyComponent,
    CanvasDataPointWestComponentComponent,
    CanvasDataPointEastComponentComponent,
    DatapointEastPropertyComponent,
    CanvasDataPointCenterComponent,
    CanvasDataPointSouthComponent,
    CanvasDataPointNorthComponentComponent,
    EmptyBorderPropertyComponent,
    CanvasLocalDataPointsComponent,

    AreachartPropertyComponent,
    CanvasAreachartComponent,
    BarchartPropertyComponent,
    CanvasBarchartComponent,
    BubblechartPropertyComponent,
    CanvasBubblechartComponent,
    CandlestickchartPropertyComponent,
    CanvasCandlestickchartComponent,
    CandlestickwaterfallchartPropertyComponent,
    CanvasCandlestickwaterfallchartComponent,
    ChartProperties,
    ColumnchartPropertyComponent,
    CanvasColumnchartComponent,
    CombochartPropertyComponent,
    CanvasCombochartComponent,
    DonutchartPropertyComponent,
    CanvasDonutchartComponent,
    HistogramchartPropertyComponent,
    CanvasHistogramchartComponent,
    LinechartPropertyComponent,
    CanvasLinechartComponent,
    PiechartPropertyComponent,
    CanvasPiechartComponent,
    ScatterchartPropertyComponent,
    CanvasScatterchartComponent,
    TimelinechartPropertyComponent,
    CanvasTimelinechartComponent,
    CanvasGeochartComponent,
    GuagechartPropertyComponent,
    CanvasGaugechartComponent,
    GeochartPropertyComponent,
    TreemapchartPropertyComponent,
    CanvasTreemapchartComponent,
    ButtonFloatCanvasComponent,
    ButtonFloatPropertyComponent,
    ButtonFloatGroupCanvasComponent,
    ButtonFloatGroupPropertyComponent,
    CanvasBreaklineComponent,
    BreakLinePropertyComponent,

    /*icon search*/
    CanvasIconSearchComponent,

    /*box component*/
    BoxComponent,
    BoxPropertyComponent,
    // FORM
    CanvasFormComponent,
    CanvasFormBodyComponent,
    CanvasFormActionComponent,
    CanvasFormHeaderComponent,
    FormPropertyComponent,


    /*CONDITION UI*/

    ElseBlockBehaviour,
    ElseIfBlockBehaviour,
    ConditionBlockBehaviour,
    ConditionBindingComponent,
    ConditionTreeComponent,


    IfBlockBehaviour
  ],
  entryComponents: [
    BehaviourComponent,
    NavigateBlockBehaviour,
    ServiceBlockBehaviour,
    UpdateModelBlockBehaviour,
    NotificationBlockBehaviour,
    IfBlockBehaviour,

    CanvasComponent,
    CanvasTextInputComponent,
    TextInputPropertyComponent,
    CanvasRowComponent,
    RowPropertyComponent,
    CanvasColumnComponent,
    ColumnPropertyComponent,
    CanvasEmailComponent,
    EmailInputPropertyComponent,
    CanvasRatingComponent,
    RatingPropertyComponent,
    CheckBoxComponent,
    CheckBoxPropertyComponent,
    CheckBoxGroupCanvasComponent,
    CheckBoxGroupPropertyComponent,
    DateTimePickerCanvasComponent,
    DateTimePickerPropertyComponent,
    DropDownCanvasComponent,
    DropDownPropertyComponent,
    FileUploadPropertyComponent,
    FileUploadCanvasComponent,
    CanvasSliderComponent,
    CheckBoxGroupPropertyComponent,
    SliderPropertyComponent,
    CanvasSliderComponent,
    CanvasTypeAheadComponent,
    TypeAheadPropertyComponent,

    RootPaneComponent,

    LabelComponent,
    LabelPropertyComponent,

    NumberFieldDemoComponent,
    NumberFieldPropertyComponent,

    PasswordCanvasComponent,
    PasswordPropertyComponent,

    RadioGroupcanvasComponent,
    RadioGroupPropertyComponent,

    CanvasTagInputComponent,
    TagInputPropertyComponent,

    CanvasTextAreaInputComponent,
    TextAreaInputPropertyComponent,

    CanvasToggleComponent,
    TogglePropertyComponent,

    TimePickerCanvasComponent,
    TimePickerPropertyComponent,

    ButtonCanvasComponent,
    ButtonPropertyComponent,

    ButtonGroupComponent,
    ButtonGroupPropertyComponent,
    CanvasButtonGroupActionComponent,

    PaginatorCanvasComponent,
    PaginatorPropertyComponent,

    ProgressBarComponent,
    ProgressBarPropertyComponent,

    PaginatorPropertyComponent,

    CanvasCardComponent,
    CanvasCardBodyComponent,
    CanvasCardActionComponent,
    CardPropertyComponent,
    CanvasCardHeaderComponent,
    IconPropertyComponent,
    CanvasIconComponent,

    /*stepbox*/
    CanvasStepBoxComponent,
    CanvasStepBoxBlockComponent,
    StepboxPropertyComponent,
    StepBoxBlockPropertyComponent,
    ImagePropertyComponent,
    CanvasImageComponent,
    VideoPropertyComponent,
    CanvasVideoComponent,
    CanvasFieldSetComponent,
    FieldSetPropertyComponent,
    CanvasPanelComponent,
    PanelPropertyComponent,
    FieldSetPropertyComponent,

    /*tab conatiner*/

    CanvasTabContainerComponent,
    TabContainerPropertyComponent,

    CanvasItemSelectorComponent,
    ItemSelectorPropertyComponent,
    CanvasTreeComponent,
    TreePropertyComponent,

    /*datagrid*/
    CanvasDataGridComponent,
    DatagridPropertyComponent,
    CanvasDataGridColumnComponent,
    CanvasListboxComponent,
    ListboxPropertyComponent,

    TabPill,
    TabPillPropertyComponent,
    VerticalTabPropertyComponent,
    CanvasVerticalTabComponent,
    CanvasVerticalRightTabComponent,
    VerticalRightTabPropertyComponent,
    AccordionTabComponent,
    CanvasAccordionContainerComponent,
    AccordionContainerPropertyComponent,
    AccordionTabPropertyComponent,
    ButtonDropDownPropertyComponent,
    CanvasButtonLinkComponent,
    ButtonDropDownCanvasComponent,
    CanvasBorderLayoutComponent,
    CanvasNorthBorderComponent,
    CanvasEastBorderComponent,
    CanvasCenterBorderComponent,
    CanvasWestComponentComponent,
    CanvasSouthComponentComponent,
    BorderPropertyComponent,
    CanvasDataPointComponent,
    DatapointPropertyComponent,
    DatapointWestPropertyComponent,
    CanvasDataPointWestComponentComponent,
    CanvasDataPointEastComponentComponent,
    DatapointEastPropertyComponent,
    CanvasDataPointCenterComponent,
    CanvasDataPointSouthComponent,
    CanvasDataPointNorthComponentComponent,
    EmptyBorderPropertyComponent,

    AreachartPropertyComponent,
    CanvasAreachartComponent,
    BarchartPropertyComponent,
    CanvasBarchartComponent,
    BubblechartPropertyComponent,
    CanvasBubblechartComponent,
    CandlestickchartPropertyComponent,
    CanvasCandlestickchartComponent,
    CandlestickwaterfallchartPropertyComponent,
    CanvasCandlestickwaterfallchartComponent,
    ChartProperties,
    ColumnchartPropertyComponent,
    CanvasColumnchartComponent,
    CombochartPropertyComponent,
    CanvasCombochartComponent,
    DonutchartPropertyComponent,
    CanvasDonutchartComponent,
    HistogramchartPropertyComponent,
    CanvasHistogramchartComponent,
    LinechartPropertyComponent,
    CanvasLinechartComponent,
    PiechartPropertyComponent,
    CanvasPiechartComponent,
    ScatterchartPropertyComponent,
    CanvasScatterchartComponent,
    TimelinechartPropertyComponent,
    CanvasTimelinechartComponent,
    GeochartPropertyComponent,
    CanvasGeochartComponent,

    GuagechartPropertyComponent,
    CanvasGaugechartComponent,
    GeochartPropertyComponent,
    TreemapchartPropertyComponent,
    CanvasTreemapchartComponent,
    ButtonFloatCanvasComponent,
    ButtonFloatPropertyComponent,
    ButtonFloatGroupCanvasComponent,
    ButtonFloatGroupPropertyComponent,
    CanvasBreaklineComponent,
    BreakLinePropertyComponent,

    /*box component*/
    BoxComponent,
    BoxPropertyComponent,
    /* FORM */
    CanvasFormComponent,
    CanvasFormBodyComponent,
    CanvasFormActionComponent,
    CanvasFormHeaderComponent,
    FormPropertyComponent,


    /*CONDITION UI*/

    ElseBlockBehaviour,
    ElseIfBlockBehaviour,
    ConditionBlockBehaviour,
    ConditionBindingComponent,
    ConditionTreeComponent
  ],
  providers: [
    BoundedContextDefinitionService,
    EventHandlerService,
    RestCallService,
    EditorStateService,
    DragDropEventService,
    EventRelationshipService,
    NotificationService,
    SharedDataService,
    CookieService
  ]
})
export class DnaMsUiModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DnaMsUiModule,
      providers: [
        BoundedContextDefinitionService,
        EventHandlerService,
        RestCallService,
        EditorStateService,
        DragDropEventService,
        EventRelationshipService,
        NotificationService,
        SharedDataService,
        CookieService
      ]
    };
  }
}
