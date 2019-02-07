var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var o = arguments[e];
        for (var i in o) Object.prototype.hasOwnProperty.call(o, i) && (t[i] = o[i]);
    }
    return t;
}, e = require("./interface.js"), o = require("../app-config.js").host, i = require("../app-config.js").mapConfig, n = {
    getLocationOnlineCities: function(t) {
        var i = o.kitchenHost + "/URegion/getOnlineCityList";
        return e.post(i, t);
    },
    getTextByLocation: function(n) {
        var a = o.locationHost + "/api/wxApp/getAmapLocationByGps";
        return n = t({}, n, i, {
            key: "665191cd743a43a9"
        }), e.post(a, n);
    },
    getAddressBySearch: function(n) {
        var a = o.locationHost + "/api/wxApp/listAmapLocationInfo";
        return n = t({}, n, i, {
            key: "5e3986646168e1ce",
            page: 1,
            size: 10
        }), e.post(a, n);
    },
    getNearBuildings: function(n) {
        var a = o.locationHost + "/api/wxApp/listAmapAroundLocation";
        return n = t({}, n, i, {
            key: "665191cd743a43a9",
            page: 1,
            size: 10
        }), e.post(a, n);
    }
};

module.exports = n;