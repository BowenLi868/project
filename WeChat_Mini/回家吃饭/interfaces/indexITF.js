var t = require("./interface.js"), e = require("../app-config.js").host, n = {
    getIndexData: function(n) {
        var r = e.kitchenHost + "/host/index";
        return t.post(r, n);
    },
    getHeaderInfo: function(n) {
        var r = e.kitchenHost + "/Kitchen/headerInfo";
        return t.post(r, n);
    },
    getNearKitchenList: function(n) {
        var r = e.kitchenHost + "/Kitchen/kitchenList";
        return t.post(r, n);
    }
};

module.exports = n;