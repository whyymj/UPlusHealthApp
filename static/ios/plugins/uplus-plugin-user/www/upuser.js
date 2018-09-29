cordova.define("uplus-plugin-user.upuser", function(require, exports, module) {
var cordova = require('cordova');

var up_user = {
    getUserInfo: function (successCallback, failureCallback) {
        cordova.exec(successCallback, failureCallback, "UP_USER", "getUserInfo", []);
    },
    getSignCode: function (successCallback, failureCallback, data, timestamp) {
        if (arguments.length == 3) {
            cordova.exec(successCallback, failureCallback, "UP_USER", "getSignCode", [data]);
        } else if (arguments.length == 4) {
            cordova.exec(successCallback, failureCallback, "UP_USER", "getSignCode", [{
                "data": data,
                "timestamp": timestamp
            }]);
        } else {
            console.log("getSignCode: arguments.length ERROR!");
        }
    },

    //通用签名算法接口 SHA256
    /* data 为JSON object对象，其包含如下属性：
     * url --- 请求接口的URL地址。
     * paramStr --- 请求的参数字符串。
     * timestamp --- 请求发起的时间戳。
     */
    getSign: function (successCallback, failureCallback, data) {
        cordova.exec(successCallback, failureCallback, "UP_USER", "getSign", [data]);
    }
};

module.exports = up_user;

});
