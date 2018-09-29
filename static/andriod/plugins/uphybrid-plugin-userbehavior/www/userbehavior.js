cordova.define("uphybrid-plugin-userbehavior.UserBehavior", function(require, exports, module) {

var exec = require('cordova/exec'),
    cordova = require('cordova'),
    channel = require('cordova/channel'),
    utils = require('cordova/utils');

function UserBehavior() {
}

UserBehavior.prototype.init = function() {
    var $AI={};
    $AI.mouseX = 0;
    $AI.mouseY = 0;
    $AI.offX = 0;
    $AI.offY = 0;
    document.addEventListener("mousedown",function(e){
            e = e||event;
            var _elem=e.target||e.srcElement;
            if(_elem.tagName.toLowerCase()=="a"){
                $AI.mouseX = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
                $AI.mouseY = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
                cordova.exec(null, null, "UserBehavior", "onALabelClick", [$AI.mouseX, $AI.mouseY]);
            }
    },false);
};

var me = new UserBehavior();

channel.createSticky('onUpUserBehaviorReady');
channel.waitForInitialization('onUpUserBehaviorReady');

channel.onCordovaReady.subscribe(function() {
    me.init();
    channel.onUpUserBehaviorReady.fire();
});

module.exports = me;

});
