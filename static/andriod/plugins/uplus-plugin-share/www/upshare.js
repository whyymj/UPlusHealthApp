cordova.define("uplus-plugin-share.upshare", function(require, exports, module) {
var cordova = require('cordova');
var up_share = {
    showShareView: function (successCallback, failureCallback, shareData) {
        cordova.exec(successCallback, failureCallback, "UP_Share", "showShareView", [shareData]);
    }
};
module.exports = up_share;

});
