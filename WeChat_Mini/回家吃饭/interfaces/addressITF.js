var e = require("./interface.js"), s = require("../app-config.js").host, r = {
    getAddressList: function(r) {
        var t = s.kitchenHost + "/UAddress/list";
        return e.post(t, r);
    },
    saveAddress: function(r) {
        var t = s.kitchenHost + (r.address_id ? "/UAddress/modify" : "/UAddress/add");
        return e.post(t, r);
    },
    getRecommendAddress: function(r) {
        var t = s.kitchenHost + "/UAddress/recommend";
        return e.post(t, r);
    },
    cancleAddress: function(r) {
        var t = s.kitchenHost + "/UAddress/delete";
        return e.post(t, r);
    }
};

module.exports = r;