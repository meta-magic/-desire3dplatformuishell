"use strict";
exports.__esModule = true;
var serviceblock_component_1 = require("../event-relationship/relationship-component/serviceblock.component");
var updatemodelBlock_component_1 = require("../event-relationship/relationship-component/updatemodelBlock.component");
var notificationblock_component_1 = require("../event-relationship/relationship-component/notificationblock.component");
var navigateblock_component_1 = require("../event-relationship/relationship-component/navigateblock.component");
/**
 * Created by dattaram on 25/6/18.
 */
var RelationshipBlockMap;
(function (RelationshipBlockMap) {
    RelationshipBlockMap.Block_MAP = {
        service: serviceblock_component_1.ServiceBlockBehaviour,
        updatemodel: updatemodelBlock_component_1.UpdateModelBlockBehaviour,
        navigate: navigateblock_component_1.NavigateBlockBehaviour,
        notify: notificationblock_component_1.NotificationBlockBehaviour
    };
    RelationshipBlockMap.Component_Restrict = {
        button: true,
        buttongroup: true,
        buttondropdown: true,
        buttonfloat: true,
        buttonfloatgroup: true,
        accordion: true,
        column: true,
        fieldset: true,
        paginator: true,
        progress: true,
        form: true,
        stepbox: true,
        horizontaltabcontainer: true,
        verticaltab: true,
        rightvertical: true
    };
})(RelationshipBlockMap = exports.RelationshipBlockMap || (exports.RelationshipBlockMap = {}));
var MethodTypeMap;
(function (MethodTypeMap) {
    MethodTypeMap.METHOD_TYPE_MAP = {
        0: '',
        1: 'GET',
        2: 'POST',
        3: 'PUT',
        4: 'DELETE'
    };
})(MethodTypeMap = exports.MethodTypeMap || (exports.MethodTypeMap = {}));
