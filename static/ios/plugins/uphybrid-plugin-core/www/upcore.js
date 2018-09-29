cordova.define("uphybrid-plugin-core.upcore", function(require, exports, module) {
var cordova = require('cordova');
var up_core = {
    closeH5ContainerView: function () {
        cordova.exec(function () {
            console.log("H5容器关闭接口调用成功！");
        },function (err) {
            console.error("H5容器关闭接口调用失败！error:"+JSON.stringify(err));
        }, "UP_CORE", "closeH5ContainerView", []);
    },
    reloadH5ContainerContent:function () {
        cordova.exec(function () {
            console.log("页面刷新接口调用成功！");
        },function (err) {
            console.error("页面刷新接口调用失败！error:"+JSON.stringify(err));
        },"UP_CORE","reloadH5ContainerContent",[]);
    }
};
module.exports = up_core;

});
