cordova.define("uphybrid-plugin-device.updevice", function(require, exports, module) {
var cordova = require('cordova');

var updevice = {
    deviceListChangeListener: undefined,
    deviceChangeListenerMap: {},
    subDevListChangeListenerMap: {},
    subDevChangeListenerMap: {},

    getDeviceConfigInfo: function (successCallback, failureCallback) {
        cordova.exec(successCallback, failureCallback, "UP_DEVICE", "getDeviceConfigInfo", []);
    },
    configDeviceBySoftAP: function (successCallback, failureCallback, wifiName, password) {
        cordova.exec(successCallback, failureCallback, "UP_DEVICE", "configDeviceBySoftAP", [wifiName, password]);
    },
    configDeviceBySmartLink: function (successCallback, failureCallback, wifiName, password) {
        cordova.exec(successCallback, failureCallback, "UP_DEVICE", "configDeviceBySmartLink", [wifiName, password]);
    },
    getDeviceList: function (successCallback, failureCallback) {
        cordova.exec(successCallback, failureCallback, "UP_DEVICE", "getDeviceList", []);
    },
    subscribeDeviceListChange: function (successCallback, failureCallback, deviceType, deviceListChangeListener) {
        this.deviceListChangeListener = deviceListChangeListener;
        cordova.exec(successCallback, failureCallback, "UP_DEVICE", "subscribeDeviceListChange", [deviceType]);
    },
    unsubscribeDeviceListChange: function (successCallback, failureCallback) {
        this.deviceListChangeListener = undefined;
        cordova.exec(successCallback, failureCallback, "UP_DEVICE", "unsubscribeDeviceListChange", []);
    },
    getDeviceInfo: function (successCallback, failureCallback, deviceId) {
        cordova.exec(successCallback, failureCallback, "UP_DEVICE", "getDeviceInfo", [deviceId]);
    },
    execDeviceOperation: function (successCallback, failureCallback, deviceId, commands, groupName) {
        cordova.exec(successCallback, failureCallback, "UP_DEVICE", "execDeviceOperation", [deviceId, commands, groupName]);
    },
    subscribeDeviceChange: function (successCallback, failureCallback, deviceId, deviceChangeListener) {
        this.deviceChangeListenerMap.deviceId = deviceChangeListener;
        cordova.exec(successCallback, failureCallback, "UP_DEVICE", "subscribeDeviceChange", [deviceId]);
    },
    unsubscribeDeviceChange: function (successCallback, failureCallback, deviceId) {
        this.deviceChangeListenerMap.deviceId = undefined;
        cordova.exec(successCallback, failureCallback, "UP_DEVICE", "unsubscribeDeviceChange", [deviceId]);
    },
    getSubDevList: function (successCallback, failureCallback, parentId) {
        cordova.exec(successCallback, failureCallback, "UP_DEVICE", "getSubDevList", [parentId]);
    },
    getSubDevInfo: function (successCallback, failureCallback, parentId, deviceId) {
        cordova.exec(successCallback, failureCallback, "UP_DEVICE", "getSubDevInfo", [parentId, deviceId]);
    },
    subscribeSubDevChange: function (successCallback, failureCallback, deviceId, subDevChangeListener, subDevListChangeListener) {
        this.subDevChangeListenerMap.deviceId = subDevChangeListener;
        this.subDevListChangeListenerMap.deviceId = subDevListChangeListener;
        cordova.exec(successCallback, failureCallback, "UP_DEVICE", "subscribeSubDevChange", [deviceId]);
    },
    unsubscribeSubDevChange: function (successCallback, failureCallback, deviceId) {
        this.subDevChangeListenerMap.deviceId = undefined;
        this.subDevListChangeListenerMap.deviceId = undefined;
        cordova.exec(successCallback, failureCallback, "UP_DEVICE", "unsubscribeSubDevChange", [deviceId]);
    },
    connectToGateway: function (successCallback, failureCallback, accessToken, remoteDeviceArray) {
        cordova.exec(successCallback, failureCallback, "UP_DEVICE", "connectToGateway", [accessToken, remoteDeviceArray]);
    },
    disconnectFromGateway: function (successCallback, failureCallback) {
        cordova.exec(successCallback, failureCallback, "UP_DEVICE", "disconnectFromGateway", []);
    }
};

window.publishDeviceListChange = function (deviceList) {
    console.log("publishDeviceListChange");
    if (updevice.deviceListChangeListener != undefined) {
        updevice.deviceListChangeListener(deviceList);
    } else {
        console.log("deviceListChangeListener is undefined");
    }
}

window.publishDeviceChange = function (deviceId, info) {
    console.log("publishDeviceChange");
    if (typeof (updevice.deviceChangeListenerMap.deviceId) != "undefined") {
        updevice.deviceChangeListenerMap.deviceId(deviceId, info);
    } else {
        console.log("deviceChangeListener for Device['" + deviceId + "'] is undefined");
    }
}

window.publishDeviceAlarm = function (deviceId, info, alarms) {
    console.log("publishDeviceAlarm");
    if (typeof (updevice.deviceChangeListenerMap.deviceId) != "undefined") {
        updevice.deviceChangeListenerMap.deviceId(deviceId, info, alarms);
    } else {
        console.log("deviceAlarmListener for Device['" + deviceId + "'] is undefined");
    }
}

window.publishSubDevChange = function (mac, subDev) {
    console.log("publishSubDevChange");
    if (updevice.subDevChangeListenerMap.deviceId != undefined) {
        updevice.subDevChangeListenerMap.deviceId(mac, subDev);
    } else {
        console.log("subDevChangeListener is undefined");
    }
}

window.publishSubDevAlarm = function (mac, subDev, alarms) {
    console.log("publishSubDevAlarm");
    if (updevice.subDevChangeListenerMap.deviceId != undefined) {
        updevice.subDevChangeListenerMap.deviceId(mac, subDev, alarms);
    } else {
        console.log("subDevChangeListener is undefined");
    }
}

window.publishSubDevListChange = function (mac, subDevList) {
    console.log("publishSubDevListChange");
    if (updevice.subDevListChangeListenerMap.deviceId != undefined) {
        updevice.subDevListChangeListenerMap.deviceId(mac, subDevList);
    } else {
        console.log("subDevChangeListener is undefined");
    }
}

module.exports = updevice;

});
