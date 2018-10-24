"use strict";
exports.__esModule = true;
var buttonfloat_canvas_component_1 = require("./../canvas-component/button-floating/buttonfloat.canvas.component");
var fieldset_component_1 = require("./../canvas-component/fieldset/fieldset.component");
var textinput_component_1 = require("../canvas-component/textinput/textinput.component");
var row_component_1 = require("../canvas-component/row/row.component");
var column_comoponent_1 = require("../canvas-component/column/column.comoponent");
var emailinput_component_1 = require("../canvas-component/emailinput/emailinput.component");
var rating_component_1 = require("../canvas-component/rating/rating.component");
var checkbox_component_1 = require("../canvas-component/checkbox/checkbox.component");
var checkbox_group_component_1 = require("../canvas-component/checkbox-group/checkbox.group.component");
var slider_component_1 = require("../canvas-component/slider/slider.component");
var datetime_picker_component_1 = require("../canvas-component/datetime-picker/datetime.picker.component");
var dropdown_component_1 = require("../canvas-component/dropdown/dropdown.component");
var typeahead_component_1 = require("../canvas-component/typeahead/typeahead.component");
var fileupload_component_1 = require("../canvas-component/fileupload/fileupload.component");
var label_component_1 = require("../canvas-component/label/label.component");
var numberfield_component_1 = require("../canvas-component/number-field/numberfield.component");
var password_field_component_1 = require("../canvas-component/password-field/password.field.component");
var radio_group_component_1 = require("../canvas-component/radio-group/radio.group.component");
var taginput_component_1 = require("../canvas-component/taginput/taginput.component");
var textarea_component_1 = require("../canvas-component/textarea/textarea.component");
var toggle_component_1 = require("../canvas-component/toggle/toggle.component");
var timepicker_canvas_component_1 = require("../canvas-component/timepicker/timepicker.canvas.component");
var button_canvas_component_1 = require("../canvas-component/button/button.canvas.component");
var buttongroup_component_1 = require("../canvas-component/buttongroup/buttongroup.component");
var buttongroup_action_component_1 = require("../canvas-component/buttongroup/buttongroup.action.component");
var paginator_canvas_component_1 = require("../canvas-component/paginator/paginator.canvas.component");
var progress_bar_component_1 = require("../canvas-component/progress-bar/progress.bar.component");
var card_component_1 = require("../canvas-component/card/card.component");
var card_action_component_1 = require("../canvas-component/card/card.action.component");
var card_body_component_1 = require("../canvas-component/card/card.body.component");
var card_header_component_1 = require("../canvas-component/card/card.header.component");
var icon_component_1 = require("../canvas-component/icon/icon.component");
var stepbox_component_1 = require("../canvas-component/stepbox/stepbox.component");
var stepbox_block_component_1 = require("../canvas-component/stepbox/stepbox-block.component");
var image_component_1 = require("../canvas-component/image/image.component");
var video_component_1 = require("../canvas-component/video/video.component");
var tab_container_component_1 = require("../canvas-component/tab/tab.container.component");
var panel_component_1 = require("../canvas-component/panel/panel.component");
var itemselector_component_1 = require("../canvas-component/itemselector/itemselector.component");
var listbox_component_1 = require("../canvas-component/listbox/listbox.component");
var datagrid_component_1 = require("../canvas-component/datagrid/datagrid.component");
var datagrid_column_component_1 = require("../canvas-component/datagrid/datagrid.column.component");
var tab_pill_component_1 = require("../local-components/tab/basic/tab.pill.component");
var vertical_tab_container_component_1 = require("../canvas-component/tab/verticaltab/vertical.tab.container.component");
var right_vertical_tab_container_component_1 = require("../canvas-component/tab/right-vertical-tab/right.vertical.tab.container.component");
var accordion_component_1 = require("../canvas-component/accordion/accordion.component");
var accordion_pane_1 = require("../local-components/accordion/accordion.pane");
var button_canvas_component_2 = require("../canvas-component/buttondropdown/button.canvas.component");
var canvas_borderlayout_component_1 = require("../canvas-component/borderlayout/canvas.borderlayout.component");
var canvas_border_north_component_1 = require("../canvas-component/borderlayout/canvas.border.north.component");
var canvas_border_east_component_1 = require("../canvas-component/borderlayout/canvas.border.east.component");
var canvas_border_center_component_1 = require("../canvas-component/borderlayout/canvas.border.center.component");
var canvas_border_west_component_1 = require("../canvas-component/borderlayout/canvas.border.west.component");
var cavnvas_border_south_component_1 = require("../canvas-component/borderlayout/cavnvas.border.south.component");
var canvas_datapoint_component_1 = require("../canvas-component/datapoint/canvas.datapoint.component");
var canvas_datapoint_west_component_1 = require("../canvas-component/datapoint/canvas.datapoint.west.component");
var buttondropdown_link_component_1 = require("../canvas-component/buttondropdown/buttondropdown.link.component");
var canvas_datapoint_east_component_1 = require("../canvas-component/datapoint/canvas.datapoint.east.component");
var canvas_datapoint_center_component_1 = require("../canvas-component/datapoint/canvas.datapoint.center.component");
var canvas_datapoint_south_component_1 = require("../canvas-component/datapoint/canvas.datapoint.south.component");
var canvas_datapoint_north_component_1 = require("../canvas-component/datapoint/canvas.datapoint.north.component");
var areachart_component_1 = require("../canvas-component/charts/areachart/areachart.component");
var barchart_component_1 = require("../canvas-component/charts/barchart/barchart.component");
var candlestickchart_component_1 = require("../canvas-component/charts/candlestickchart/candlestickchart.component");
var candlestickwaterfallchart_component_1 = require("../canvas-component/charts/candlestickwaterfallchart/candlestickwaterfallchart.component");
var columnchart_component_1 = require("../canvas-component/charts/columnchart/columnchart.component");
var combochart_component_1 = require("../canvas-component/charts/combochart/combochart.component");
var donutchart_component_1 = require("../canvas-component/charts/donutchart/donutchart.component");
var histogramchart_component_1 = require("../canvas-component/charts/histogramchart/histogramchart.component");
var linechart_component_1 = require("../canvas-component/charts/linechart/linechart.component");
var piechart_component_1 = require("../canvas-component/charts/piechart/piechart.component");
var scatterchart_component_1 = require("../canvas-component/charts/scatterchart/scatterchart.component");
var timelinechart_component_1 = require("../canvas-component/charts/timelinechart/timelinechart.component");
var bubblechart_component_1 = require("../canvas-component/charts/bubblechart/bubblechart.component");
var gaugechart_component_1 = require("../canvas-component/dashboards/gaugechart.component");
var geochart_component_1 = require("../canvas-component/maps/geochart/geochart.component");
var treemapchart_component_1 = require("../canvas-component/maps/treemap/treemapchart.component");
var tree_component_1 = require("../canvas-component/tree/tree.component");
var button_floating_group_component_1 = require("../canvas-component/button-floating-group/button.floating.group.component");
var breakline_component_1 = require("../canvas-component/breakline/breakline.component");
var box_component_1 = require("../canvas-component/box/box.component");
var form_component_1 = require("../canvas-component/form/form.component");
var form_header_component_1 = require("../canvas-component/form/form.header.component");
var form_action_component_1 = require("../canvas-component/form/form.action.component");
var form_body_component_1 = require("../canvas-component/form/form.body.component");
var root_pane_component_1 = require("../canvas-component/root-pane/root-pane.component");
var WidgetMap;
(function (WidgetMap) {
    WidgetMap.COMPONENT_CLASS_MAP = {
        rootpane: root_pane_component_1.RootPaneComponent,
        textinput: textinput_component_1.CanvasTextInputComponent,
        row: row_component_1.CanvasRowComponent,
        column: column_comoponent_1.CanvasColumnComponent,
        emailinput: emailinput_component_1.CanvasEmailComponent,
        rating: rating_component_1.CanvasRatingComponent,
        checkbox: checkbox_component_1.CheckBoxComponent,
        checkboxgroup: checkbox_group_component_1.CheckBoxGroupCanvasComponent,
        slider: slider_component_1.CanvasSliderComponent,
        datepicker: datetime_picker_component_1.DateTimePickerCanvasComponent,
        dropdown: dropdown_component_1.DropDownCanvasComponent,
        typeahead: typeahead_component_1.CanvasTypeAheadComponent,
        fileupload: fileupload_component_1.FileUploadCanvasComponent,
        label: label_component_1.LabelComponent,
        numberinput: numberfield_component_1.NumberFieldDemoComponent,
        passwordinput: password_field_component_1.PasswordCanvasComponent,
        radiogroup: radio_group_component_1.RadioGroupcanvasComponent,
        taginput: taginput_component_1.CanvasTagInputComponent,
        textareainput: textarea_component_1.CanvasTextAreaInputComponent,
        toggle: toggle_component_1.CanvasToggleComponent,
        timepicker: timepicker_canvas_component_1.TimePickerCanvasComponent,
        button: button_canvas_component_1.ButtonCanvasComponent,
        buttongroup: buttongroup_component_1.ButtonGroupComponent,
        buttongroupaction: buttongroup_action_component_1.CanvasButtonGroupActionComponent,
        paginator: paginator_canvas_component_1.PaginatorCanvasComponent,
        progress: progress_bar_component_1.ProgressBarComponent,
        card: card_component_1.CanvasCardComponent,
        cardaction: card_action_component_1.CanvasCardActionComponent,
        cardbody: card_body_component_1.CanvasCardBodyComponent,
        cardheader: card_header_component_1.CanvasCardHeaderComponent,
        //FORM
        form: form_component_1.CanvasFormComponent,
        formaction: form_action_component_1.CanvasFormActionComponent,
        formbody: form_body_component_1.CanvasFormBodyComponent,
        formheader: form_header_component_1.CanvasFormHeaderComponent,
        icon: icon_component_1.CanvasIconComponent,
        stepbox: stepbox_component_1.CanvasStepBoxComponent,
        stepboxblock: stepbox_block_component_1.CanvasStepBoxBlockComponent,
        image: image_component_1.CanvasImageComponent,
        video: video_component_1.CanvasVideoComponent,
        fieldset: fieldset_component_1.CanvasFieldSetComponent,
        panel: panel_component_1.CanvasPanelComponent,
        horizontaltabcontainer: tab_container_component_1.CanvasTabContainerComponent,
        itemselector: itemselector_component_1.CanvasItemSelectorComponent,
        tree: tree_component_1.CanvasTreeComponent,
        listbox: listbox_component_1.CanvasListboxComponent,
        datagrid: datagrid_component_1.CanvasDataGridComponent,
        datagridcolumn: datagrid_column_component_1.CanvasDataGridColumnComponent,
        tabpill: tab_pill_component_1.TabPill,
        verticaltab: vertical_tab_container_component_1.CanvasVerticalTabComponent,
        rightvertical: right_vertical_tab_container_component_1.CanvasVerticalRightTabComponent,
        accordion: accordion_component_1.CanvasAccordionContainerComponent,
        accordiontab: accordion_pane_1.AccordionTabComponent,
        buttondropdown: button_canvas_component_2.ButtonDropDownCanvasComponent,
        buttonlink: buttondropdown_link_component_1.CanvasButtonLinkComponent,
        border: canvas_borderlayout_component_1.CanvasBorderLayoutComponent,
        borderNorth: canvas_border_north_component_1.CanvasNorthBorderComponent,
        borderEast: canvas_border_east_component_1.CanvasEastBorderComponent,
        borderCenter: canvas_border_center_component_1.CanvasCenterBorderComponent,
        borderWest: canvas_border_west_component_1.CanvasWestComponentComponent,
        borderSouth: cavnvas_border_south_component_1.CanvasSouthComponentComponent,
        datapoint: canvas_datapoint_component_1.CanvasDataPointComponent,
        dataWest: canvas_datapoint_west_component_1.CanvasDataPointWestComponentComponent,
        dataEast: canvas_datapoint_east_component_1.CanvasDataPointEastComponentComponent,
        dataCenter: canvas_datapoint_center_component_1.CanvasDataPointCenterComponent,
        dataSouth: canvas_datapoint_south_component_1.CanvasDataPointSouthComponent,
        dataNorth: canvas_datapoint_north_component_1.CanvasDataPointNorthComponentComponent,
        areachart: areachart_component_1.CanvasAreachartComponent,
        barchart: barchart_component_1.CanvasBarchartComponent,
        bubblechart: bubblechart_component_1.CanvasBubblechartComponent,
        candlestickchart: candlestickchart_component_1.CanvasCandlestickchartComponent,
        candlestickwaterfallchart: candlestickwaterfallchart_component_1.CanvasCandlestickwaterfallchartComponent,
        columnchart: columnchart_component_1.CanvasColumnchartComponent,
        combochart: combochart_component_1.CanvasCombochartComponent,
        donutchart: donutchart_component_1.CanvasDonutchartComponent,
        histogramchart: histogramchart_component_1.CanvasHistogramchartComponent,
        linechart: linechart_component_1.CanvasLinechartComponent,
        piechart: piechart_component_1.CanvasPiechartComponent,
        scatterchart: scatterchart_component_1.CanvasScatterchartComponent,
        timelinechart: timelinechart_component_1.CanvasTimelinechartComponent,
        gaugechart: gaugechart_component_1.CanvasGaugechartComponent,
        geochart: geochart_component_1.CanvasGeochartComponent,
        treemapchart: treemapchart_component_1.CanvasTreemapchartComponent,
        buttonfloat: buttonfloat_canvas_component_1.ButtonFloatCanvasComponent,
        buttonfloatgroup: button_floating_group_component_1.ButtonFloatGroupCanvasComponent,
        br: breakline_component_1.CanvasBreaklineComponent,
        box: box_component_1.BoxComponent
    };
    WidgetMap.SPL_COMPONENTS = {
        tabcontainer: 'tabcontainer',
        stepbox: 'stepbox',
        datagrid: 'datagrid',
        buttongroup: 'buttongroup',
        buttondropdown: 'buttondropdown',
        horizontaltabcontainer: 'horizontaltabcontainer',
        verticaltab: 'verticaltab',
        rightvertical: 'rightvertical',
        accordion: 'accordion'
    };
})(WidgetMap = exports.WidgetMap || (exports.WidgetMap = {}));
