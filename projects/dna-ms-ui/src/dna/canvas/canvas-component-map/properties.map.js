"use strict";
exports.__esModule = true;
var buttonfloat_property_component_1 = require("./../canvas-component/button-floating/buttonfloat.property.component");
var geochart_property_1 = require("./../canvas-component/maps/geochart/geochart.property");
var barchart_property_1 = require("./../canvas-component/charts/barchart/barchart.property");
var listbox_property_1 = require("./../canvas-component/listbox/listbox.property");
var tree_property_1 = require("./../canvas-component/tree/tree.property");
var fieldset_property_1 = require("./../canvas-component/fieldset/fieldset.property");
var row_property_1 = require("../canvas-component/row/row.property");
var column_property_1 = require("../canvas-component/column/column.property");
var email_property_1 = require("../canvas-component/emailinput/email.property");
var textinput_property_1 = require("../canvas-component/textinput/textinput.property");
var rating_property_1 = require("../canvas-component/rating/rating.property");
var checkbox_property_1 = require("../canvas-component/checkbox/checkbox.property");
var checkbox_group_property_1 = require("../canvas-component/checkbox-group/checkbox.group.property");
var dropdown_property_1 = require("../canvas-component/dropdown/dropdown.property");
var fileupload_property_1 = require("../canvas-component/fileupload/fileupload.property");
var slider_property_1 = require("../canvas-component/slider/slider.property");
var datetime_picker_property_1 = require("../canvas-component/datetime-picker/datetime.picker.property");
var typeahead_property_1 = require("../canvas-component/typeahead/typeahead.property");
var property_field_property_1 = require("../canvas-component/password-field/property.field.property");
var radio_group_property_1 = require("../canvas-component/radio-group/radio.group.property");
var numberfield_property_1 = require("../canvas-component/number-field/numberfield.property");
var label_property_1 = require("../canvas-component/label/label.property");
var taginput_property_1 = require("../canvas-component/taginput/taginput.property");
var textarea_property_1 = require("../canvas-component/textarea/textarea.property");
var toggle_property_1 = require("../canvas-component/toggle/toggle.property");
var timepicker_property_component_1 = require("../canvas-component/timepicker/timepicker.property.component");
var button_property_component_1 = require("../canvas-component/button/button.property.component");
var buttongroup_property_1 = require("../canvas-component/buttongroup/buttongroup.property");
var paginator_property_component_1 = require("../canvas-component/paginator/paginator.property.component");
var progress_bar_property_1 = require("../canvas-component/progress-bar/progress.bar.property");
var card_property_1 = require("../canvas-component/card/card.property");
var icon_property_1 = require("../canvas-component/icon/icon.property");
var stepbox_property_1 = require("../canvas-component/stepbox/stepbox.property");
var stepbox_block_property_1 = require("../canvas-component/stepbox/stepbox-block.property");
var image_property_1 = require("../canvas-component/image/image.property");
var video_property_1 = require("../canvas-component/video/video.property");
var tab_container_property_1 = require("../canvas-component/tab/tab.container.property");
var panel_property_1 = require("../canvas-component/panel/panel.property");
var itemselector_property_1 = require("../canvas-component/itemselector/itemselector.property");
var datagrid_property_1 = require("../canvas-component/datagrid/datagrid.property");
var tabpill_property_component_1 = require("../canvas-component/tab/tabpill.property.component");
var vertical_tab_container_property_1 = require("../canvas-component/tab/verticaltab/vertical.tab.container.property");
var right_vertical_tab_container_property_1 = require("../canvas-component/tab/right-vertical-tab/right.vertical.tab.container.property");
var accordion_property_component_1 = require("../canvas-component/accordion/accordion.property.component");
var accordion_tab_property_component_1 = require("../canvas-component/accordion/accordion.tab.property.component");
var button_property_component_2 = require("../canvas-component/buttondropdown/button.property.component");
var border_property_1 = require("../canvas-component/borderlayout/border.property");
var canvas_datapoint_property_component_1 = require("../canvas-component/datapoint/canvas.datapoint.property.component");
var canvas_datapoint_west_property_1 = require("../canvas-component/datapoint/canvas.datapoint.west.property");
var empty_property_pane_1 = require("../canvas-component/borderlayout/empty.property.pane");
var areachart_property_1 = require("../canvas-component/charts/areachart/areachart.property");
var bubblechart_property_1 = require("../canvas-component/charts/bubblechart/bubblechart.property");
var candlestickchart_property_1 = require("../canvas-component/charts/candlestickchart/candlestickchart.property");
var candlestickwaterfallchart_property_1 = require("../canvas-component/charts/candlestickwaterfallchart/candlestickwaterfallchart.property");
var columnchart_property_1 = require("../canvas-component/charts/columnchart/columnchart.property");
var combochart_property_1 = require("../canvas-component/charts/combochart/combochart.property");
var donutchart_property_1 = require("../canvas-component/charts/donutchart/donutchart.property");
var histogramchart_property_1 = require("../canvas-component/charts/histogramchart/histogramchart.property");
var linechart_property_1 = require("../canvas-component/charts/linechart/linechart.property");
var piechart_property_1 = require("../canvas-component/charts/piechart/piechart.property");
var scatterchart_property_1 = require("../canvas-component/charts/scatterchart/scatterchart.property");
var timelinechart_property_1 = require("../canvas-component/charts/timelinechart/timelinechart.property");
var gaugechart_property_1 = require("../canvas-component/dashboards/gaugechart.property");
var treemapchart_property_1 = require("../canvas-component/maps/treemap/treemapchart.property");
var breakline_property_1 = require("../canvas-component/breakline/breakline.property");
var button_floating_group_property_1 = require("../canvas-component/button-floating-group/button.floating.group.property");
var box_property_component_1 = require("../canvas-component/box/box.property.component");
var form_property_1 = require("../canvas-component/form/form.property");
var PropertyMap;
(function (PropertyMap) {
    PropertyMap.PROPERTY_MAP = {
        row: row_property_1.RowPropertyComponent,
        column: column_property_1.ColumnPropertyComponent,
        emailinput: email_property_1.EmailInputPropertyComponent,
        textinput: textinput_property_1.TextInputPropertyComponent,
        rating: rating_property_1.RatingPropertyComponent,
        checkbox: checkbox_property_1.CheckBoxPropertyComponent,
        checkboxgroup: checkbox_group_property_1.CheckBoxGroupPropertyComponent,
        dropdown: dropdown_property_1.DropDownPropertyComponent,
        fileupload: fileupload_property_1.FileUploadPropertyComponent,
        slider: slider_property_1.SliderPropertyComponent,
        datepicker: datetime_picker_property_1.DateTimePickerPropertyComponent,
        typeahead: typeahead_property_1.TypeAheadPropertyComponent,
        label: label_property_1.LabelPropertyComponent,
        numberinput: numberfield_property_1.NumberFieldPropertyComponent,
        passwordinput: property_field_property_1.PasswordPropertyComponent,
        radiogroup: radio_group_property_1.RadioGroupPropertyComponent,
        taginput: taginput_property_1.TagInputPropertyComponent,
        textareainput: textarea_property_1.TextAreaInputPropertyComponent,
        toggle: toggle_property_1.TogglePropertyComponent,
        timepicker: timepicker_property_component_1.TimePickerPropertyComponent,
        button: button_property_component_1.ButtonPropertyComponent,
        buttongroup: buttongroup_property_1.ButtonGroupPropertyComponent,
        paginator: paginator_property_component_1.PaginatorPropertyComponent,
        buttongroupaction: buttongroup_property_1.ButtonGroupPropertyComponent,
        progress: progress_bar_property_1.ProgressBarPropertyComponent,
        icon: icon_property_1.IconPropertyComponent,
        card: card_property_1.CardPropertyComponent,
        stepbox: stepbox_property_1.StepboxPropertyComponent,
        stepboxblock: stepbox_block_property_1.StepBoxBlockPropertyComponent,
        image: image_property_1.ImagePropertyComponent,
        video: video_property_1.VideoPropertyComponent,
        panel: panel_property_1.PanelPropertyComponent,
        fieldset: fieldset_property_1.FieldSetPropertyComponent,
        horizontaltabcontainer: tab_container_property_1.TabContainerPropertyComponent,
        itemselector: itemselector_property_1.ItemSelectorPropertyComponent,
        tree: tree_property_1.TreePropertyComponent,
        datagrid: datagrid_property_1.DatagridPropertyComponent,
        datagridcolumn: datagrid_property_1.DatagridPropertyComponent,
        listbox: listbox_property_1.ListboxPropertyComponent,
        tabpill: tabpill_property_component_1.TabPillPropertyComponent,
        verticaltab: vertical_tab_container_property_1.VerticalTabPropertyComponent,
        rightvertical: right_vertical_tab_container_property_1.VerticalRightTabPropertyComponent,
        accordion: accordion_property_component_1.AccordionContainerPropertyComponent,
        accordiontab: accordion_tab_property_component_1.AccordionTabPropertyComponent,
        buttondropdown: button_property_component_2.ButtonDropDownPropertyComponent,
        border: border_property_1.BorderPropertyComponent,
        borderNorth: empty_property_pane_1.EmptyBorderPropertyComponent,
        borderEast: empty_property_pane_1.EmptyBorderPropertyComponent,
        borderCenter: empty_property_pane_1.EmptyBorderPropertyComponent,
        borderWest: empty_property_pane_1.EmptyBorderPropertyComponent,
        borderSouth: empty_property_pane_1.EmptyBorderPropertyComponent,
        datapoint: canvas_datapoint_property_component_1.DatapointPropertyComponent,
        dataWest: canvas_datapoint_west_property_1.DatapointWestPropertyComponent,
        buttonlink: button_property_component_2.ButtonDropDownPropertyComponent,
        dataEast: canvas_datapoint_west_property_1.DatapointWestPropertyComponent,
        dataCenter: canvas_datapoint_west_property_1.DatapointWestPropertyComponent,
        dataSouth: canvas_datapoint_west_property_1.DatapointWestPropertyComponent,
        dataNorth: canvas_datapoint_west_property_1.DatapointWestPropertyComponent,
        areachart: areachart_property_1.AreachartPropertyComponent,
        barchart: barchart_property_1.BarchartPropertyComponent,
        bubblechart: bubblechart_property_1.BubblechartPropertyComponent,
        candlestickchart: candlestickchart_property_1.CandlestickchartPropertyComponent,
        candlestickwaterfallchart: candlestickwaterfallchart_property_1.CandlestickwaterfallchartPropertyComponent,
        columnchart: columnchart_property_1.ColumnchartPropertyComponent,
        combochart: combochart_property_1.CombochartPropertyComponent,
        donutchart: donutchart_property_1.DonutchartPropertyComponent,
        histogramchart: histogramchart_property_1.HistogramchartPropertyComponent,
        linechart: linechart_property_1.LinechartPropertyComponent,
        piechart: piechart_property_1.PiechartPropertyComponent,
        scatterchart: scatterchart_property_1.ScatterchartPropertyComponent,
        timelinechart: timelinechart_property_1.TimelinechartPropertyComponent,
        gaugechart: gaugechart_property_1.GuagechartPropertyComponent,
        geochart: geochart_property_1.GeochartPropertyComponent,
        treemapchart: treemapchart_property_1.TreemapchartPropertyComponent,
        buttonfloat: buttonfloat_property_component_1.ButtonFloatPropertyComponent,
        buttonfloatgroup: button_floating_group_property_1.ButtonFloatGroupPropertyComponent,
        br: breakline_property_1.BreakLinePropertyComponent,
        box: box_property_component_1.BoxPropertyComponent,
        form: form_property_1.FormPropertyComponent
    };
})(PropertyMap = exports.PropertyMap || (exports.PropertyMap = {}));
