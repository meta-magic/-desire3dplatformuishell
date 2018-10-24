import { ButtonFloatPropertyComponent } from './../canvas-component/button-floating/buttonfloat.property.component';
import { GeochartPropertyComponent } from './../canvas-component/maps/geochart/geochart.property';
import { BarchartPropertyComponent } from './../canvas-component/charts/barchart/barchart.property';
import { ListboxPropertyComponent } from './../canvas-component/listbox/listbox.property';
import { TreePropertyComponent } from './../canvas-component/tree/tree.property';
import { FieldSetPropertyComponent } from './../canvas-component/fieldset/fieldset.property';
import { RowPropertyComponent } from '../canvas-component/row/row.property';
import { ColumnPropertyComponent } from '../canvas-component/column/column.property';
import { EmailInputPropertyComponent } from '../canvas-component/emailinput/email.property';
import { TextInputPropertyComponent } from '../canvas-component/textinput/textinput.property';
import { RatingPropertyComponent } from '../canvas-component/rating/rating.property';
import { CheckBoxPropertyComponent } from '../canvas-component/checkbox/checkbox.property';
import { CheckBoxGroupPropertyComponent } from '../canvas-component/checkbox-group/checkbox.group.property';
import { DropDownPropertyComponent } from '../canvas-component/dropdown/dropdown.property';
import { FileUploadPropertyComponent } from '../canvas-component/fileupload/fileupload.property';
import { SliderPropertyComponent } from '../canvas-component/slider/slider.property';
import { DateTimePickerPropertyComponent } from '../canvas-component/datetime-picker/datetime.picker.property';
import { TypeAheadPropertyComponent } from '../canvas-component/typeahead/typeahead.property';
import { PasswordPropertyComponent } from '../canvas-component/password-field/property.field.property';
import { RadioGroupPropertyComponent } from '../canvas-component/radio-group/radio.group.property';
import { NumberFieldPropertyComponent } from '../canvas-component/number-field/numberfield.property';
import { LabelPropertyComponent } from '../canvas-component/label/label.property';
import { TagInputPropertyComponent } from '../canvas-component/taginput/taginput.property';
import { TextAreaInputPropertyComponent } from '../canvas-component/textarea/textarea.property';
import { TogglePropertyComponent } from '../canvas-component/toggle/toggle.property';
import { TimePickerPropertyComponent } from '../canvas-component/timepicker/timepicker.property.component';
import { ButtonPropertyComponent } from '../canvas-component/button/button.property.component';
import { ButtonGroupPropertyComponent } from '../canvas-component/buttongroup/buttongroup.property';
import { PaginatorPropertyComponent } from '../canvas-component/paginator/paginator.property.component';
import { ProgressBarPropertyComponent } from '../canvas-component/progress-bar/progress.bar.property';
import { CardPropertyComponent } from '../canvas-component/card/card.property';
import { IconPropertyComponent } from '../canvas-component/icon/icon.property';
import { StepboxPropertyComponent } from '../canvas-component/stepbox/stepbox.property';
import { StepBoxBlockPropertyComponent } from '../canvas-component/stepbox/stepbox-block.property';
import { ImagePropertyComponent } from '../canvas-component/image/image.property';
import { VideoPropertyComponent } from '../canvas-component/video/video.property';
import { TabContainerPropertyComponent } from '../canvas-component/tab/tab.container.property';
import { PanelPropertyComponent } from '../canvas-component/panel/panel.property';
import { ItemSelectorPropertyComponent } from '../canvas-component/itemselector/itemselector.property';
import { DatagridPropertyComponent } from '../canvas-component/datagrid/datagrid.property';
import { TabPillPropertyComponent } from '../canvas-component/tab/tabpill.property.component';
import { VerticalTabPropertyComponent } from '../canvas-component/tab/verticaltab/vertical.tab.container.property';
import { VerticalRightTabPropertyComponent } from '../canvas-component/tab/right-vertical-tab/right.vertical.tab.container.property';
import { AccordionContainerPropertyComponent } from '../canvas-component/accordion/accordion.property.component';
import { AccordionTabPropertyComponent } from '../canvas-component/accordion/accordion.tab.property.component';
import { ButtonDropDownPropertyComponent } from '../canvas-component/buttondropdown/button.property.component';
import { BorderPropertyComponent } from '../canvas-component/borderlayout/border.property';
import { CanvasSouthComponentComponent } from '../canvas-component/borderlayout/cavnvas.border.south.component';
import { CanvasNorthBorderComponent } from '../canvas-component/borderlayout/canvas.border.north.component';
import { CanvasEastBorderComponent } from '../canvas-component/borderlayout/canvas.border.east.component';
import { CanvasCenterBorderComponent } from '../canvas-component/borderlayout/canvas.border.center.component';
import { CanvasWestComponentComponent } from '../canvas-component/borderlayout/canvas.border.west.component';
import { CanvasDataPointComponent } from '../canvas-component/datapoint/canvas.datapoint.component';
import { DatapointPropertyComponent } from '../canvas-component/datapoint/canvas.datapoint.property.component';
import { CanvasDataPointWestComponentComponent } from '../canvas-component/datapoint/canvas.datapoint.west.component';
import { DatapointWestPropertyComponent } from '../canvas-component/datapoint/canvas.datapoint.west.property';
import { CanvasDataPointEastComponentComponent } from '../canvas-component/datapoint/canvas.datapoint.east.component';
import { EmptyBorderPropertyComponent } from '../canvas-component/borderlayout/empty.property.pane';
import { AreachartPropertyComponent } from '../canvas-component/charts/areachart/areachart.property';
import { BubblechartPropertyComponent } from '../canvas-component/charts/bubblechart/bubblechart.property';
import { CandlestickchartPropertyComponent } from '../canvas-component/charts/candlestickchart/candlestickchart.property';
import { CandlestickwaterfallchartPropertyComponent } from '../canvas-component/charts/candlestickwaterfallchart/candlestickwaterfallchart.property';
import { ColumnchartPropertyComponent } from '../canvas-component/charts/columnchart/columnchart.property';
import { CombochartPropertyComponent } from '../canvas-component/charts/combochart/combochart.property';
import { DonutchartPropertyComponent } from '../canvas-component/charts/donutchart/donutchart.property';
import { HistogramchartPropertyComponent } from '../canvas-component/charts/histogramchart/histogramchart.property';
import { LinechartPropertyComponent } from '../canvas-component/charts/linechart/linechart.property';
import { PiechartPropertyComponent } from '../canvas-component/charts/piechart/piechart.property';
import { ScatterchartPropertyComponent } from '../canvas-component/charts/scatterchart/scatterchart.property';
import { TimelinechartPropertyComponent } from '../canvas-component/charts/timelinechart/timelinechart.property';
import { GuagechartPropertyComponent } from '../canvas-component/dashboards/gaugechart.property';
import { TreemapchartPropertyComponent } from '../canvas-component/maps/treemap/treemapchart.property';
import { BreakLinePropertyComponent } from '../canvas-component/breakline/breakline.property';
import { ButtonFloatGroupPropertyComponent } from '../canvas-component/button-floating-group/button.floating.group.property';
import { BoxPropertyComponent } from '../canvas-component/box/box.property.component';
import { FormPropertyComponent } from '../canvas-component/form/form.property';

export namespace PropertyMap {
  export const PROPERTY_MAP: any = {
    row: RowPropertyComponent,
    column: ColumnPropertyComponent,
    emailinput: EmailInputPropertyComponent,
    textinput: TextInputPropertyComponent,
    rating: RatingPropertyComponent,
    checkbox: CheckBoxPropertyComponent,
    checkboxgroup: CheckBoxGroupPropertyComponent,
    dropdown: DropDownPropertyComponent,
    fileupload: FileUploadPropertyComponent,
    slider: SliderPropertyComponent,
    datepicker: DateTimePickerPropertyComponent,
    typeahead: TypeAheadPropertyComponent,
    label: LabelPropertyComponent,
    numberinput: NumberFieldPropertyComponent,
    passwordinput: PasswordPropertyComponent,
    radiogroup: RadioGroupPropertyComponent,
    taginput: TagInputPropertyComponent,
    textareainput: TextAreaInputPropertyComponent,
    toggle: TogglePropertyComponent,
    timepicker: TimePickerPropertyComponent,
    button: ButtonPropertyComponent,
    buttongroup: ButtonGroupPropertyComponent,
    paginator: PaginatorPropertyComponent,
    buttongroupaction: ButtonGroupPropertyComponent,
    progress: ProgressBarPropertyComponent,
    icon: IconPropertyComponent,
    card: CardPropertyComponent,
    stepbox: StepboxPropertyComponent,
    stepboxblock: StepBoxBlockPropertyComponent,
    image: ImagePropertyComponent,
    video: VideoPropertyComponent,
    panel: PanelPropertyComponent,
    fieldset: FieldSetPropertyComponent,
    horizontaltabcontainer: TabContainerPropertyComponent,
    itemselector: ItemSelectorPropertyComponent,
    tree: TreePropertyComponent,
    datagrid: DatagridPropertyComponent,
    datagridcolumn: DatagridPropertyComponent,
    listbox: ListboxPropertyComponent,
    tabpill: TabPillPropertyComponent,
    verticaltab: VerticalTabPropertyComponent,
    rightvertical: VerticalRightTabPropertyComponent,
    accordion: AccordionContainerPropertyComponent,
    accordiontab: AccordionTabPropertyComponent,
    buttondropdown: ButtonDropDownPropertyComponent,
    border: BorderPropertyComponent,
    borderNorth: EmptyBorderPropertyComponent,
    borderEast: EmptyBorderPropertyComponent,
    borderCenter: EmptyBorderPropertyComponent,
    borderWest: EmptyBorderPropertyComponent,
    borderSouth: EmptyBorderPropertyComponent,
    datapoint: DatapointPropertyComponent,
    dataWest: DatapointWestPropertyComponent,
    buttonlink: ButtonDropDownPropertyComponent,
    dataEast: DatapointWestPropertyComponent,
    dataCenter: DatapointWestPropertyComponent,
    dataSouth: DatapointWestPropertyComponent,
    dataNorth: DatapointWestPropertyComponent,
    areachart: AreachartPropertyComponent,
    barchart: BarchartPropertyComponent,
    bubblechart: BubblechartPropertyComponent,
    candlestickchart: CandlestickchartPropertyComponent,
    candlestickwaterfallchart: CandlestickwaterfallchartPropertyComponent,
    columnchart: ColumnchartPropertyComponent,
    combochart: CombochartPropertyComponent,
    donutchart: DonutchartPropertyComponent,
    histogramchart: HistogramchartPropertyComponent,
    linechart: LinechartPropertyComponent,
    piechart: PiechartPropertyComponent,
    scatterchart: ScatterchartPropertyComponent,
    timelinechart: TimelinechartPropertyComponent,
    gaugechart: GuagechartPropertyComponent,
    geochart: GeochartPropertyComponent,
    treemapchart: TreemapchartPropertyComponent,
    buttonfloat: ButtonFloatPropertyComponent,
    buttonfloatgroup: ButtonFloatGroupPropertyComponent,
    br: BreakLinePropertyComponent,
    box: BoxPropertyComponent,
    form: FormPropertyComponent
  };
}
