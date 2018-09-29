cordova.define("uplus-plugin-logicengine.logicengine", function(require, exports, module) {
var cordova = require('cordova');

var logicengine = {
    logicEngineListenerMap: {},

    getBaseInfo: function (successCallback, failureCallback, deviceId) {
        cordova.exec(successCallback, failureCallback, "LOGIC_ENGINE", "getBaseInfo", [deviceId]);
    },
    getInitialAttributeList: function (successCallback, failureCallback, deviceId) {
        cordova.exec(successCallback, failureCallback, "LOGIC_ENGINE", "getInitialAttributeList", [deviceId]);
    },
    getAttributeList: function (successCallback, failureCallback, deviceId) {
        cordova.exec(successCallback, failureCallback, "LOGIC_ENGINE", "getAttributeList", [deviceId]);
    },
    getAttributeByName: function (successCallback, failureCallback, deviceId, name) {
        cordova.exec(successCallback, failureCallback, "LOGIC_ENGINE", "getAttributeByName", [deviceId, name]);
    },
    getCautionList: function (successCallback, failureCallback, deviceId) {
        cordova.exec(successCallback, failureCallback, "LOGIC_ENGINE", "getCautionList", [deviceId]);
    },
    calculate: function (successCallback, failureCallback, deviceId, name, value, clear) {
        cordova.exec(successCallback, failureCallback, "LOGIC_ENGINE", "calculate", [deviceId, {
            "name": name,
            "value": value
        }, clear]);
    },
    calculateAll: function (successCallback, failureCallback, deviceId, commands, clear) {
        cordova.exec(successCallback, failureCallback, "LOGIC_ENGINE", "calculateAll", [deviceId, commands, clear]);
    },
    operate: function (successCallback, failureCallback, deviceId) {
        cordova.exec(successCallback, failureCallback, "LOGIC_ENGINE", "operate", [deviceId]);
    },
    attach: function (successCallback, failureCallback, deviceId, listener) {
        this.logicEngineListenerMap.deviceId = listener;
        cordova.exec(successCallback, failureCallback, "LOGIC_ENGINE", "attach", [deviceId]);
    },
    detach: function (successCallback, failureCallback, deviceId) {
        this.logicEngineListenerMap.deviceId = undefined;
        cordova.exec(successCallback, failureCallback, "LOGIC_ENGINE", "detach", [deviceId]);
    },
};

window.publishConnectionChange = function (deviceId, baseInfo) {
    console.log("publishConnectionChange");
    if (typeof (logicengine.logicEngineListenerMap.deviceId) != "undefined") {
        logicengine.logicEngineListenerMap.deviceId(deviceId, baseInfo);
    } else {
        console.log("logicEngineListener.onConnectionChange for Device['" + deviceId + "'] is undefined");
    }
}

window.publishAttributesChange = function (deviceId, baseInfo, attributes) {
    console.log("publishAttributesChange");
    if (typeof (logicengine.logicEngineListenerMap.deviceId) != "undefined") {
        logicengine.logicEngineListenerMap.deviceId(deviceId, baseInfo, attributes);
    } else {
        console.log("logicEngineListener.onAttributesChange for Device['" + deviceId + "'] is undefined");
    }
}

window.publishDeviceCaution = function (deviceId, baseInfo, attributes, cautions) {
    console.log("publishDeviceCaution");
    if (typeof (logicengine.logicEngineListenerMap.deviceId) != "undefined") {
        logicengine.logicEngineListenerMap.deviceId(deviceId, baseInfo, attributes, cautions);
    } else {
        console.log("logicEngineListener.onDeviceCaution for Device['" + deviceId + "'] is undefined");
    }
}

module.exports = logicengine;

});
