var errorApp = {
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function () {
        console.log('Received Event: deviceready');
        document.getElementById('btnReload').onclick = errorApp.reloadUrl;
//        document.getElementById('btnClose').onclick = errorApp.closeView;
    },
    closeView: function () {
        upcore.closeH5ContainerView();
    },
    reloadUrl: function () {
        upcore.reloadH5ContainerContent();
    }
};

errorApp.initialize();
