var e = require("../models/models.js"), t = require("../interfaces/locationITF.js"), n = {
    getLocationOnlineCities: function(n) {
        return t.getLocationOnlineCities(n).then(function(e) {
            return Promise.resolve(e);
        }, e.failHandle);
    },
    getLocation: function() {
        return new Promise(function(e, t) {
            wx.getLocation({
                type: "gcj02",
                success: function(t) {
                    var n = t.longitude + "," + t.latitude;
                    e(n);
                },
                fail: function() {
                    t();
                }
            });
        }).then(function(e) {
            return console.log("then--", e), n.getTextByLocation({
                location: e
            });
        });
    },
    getTextByLocation: function(n) {
        return t.getTextByLocation(n).then(function(e) {
            if (console.log("then--results--", e), 200 == e.code) {
                var t = e.data.regeocode, o = t.addressComponent.building.name.length ? t.addressComponent.building.name : t.formatted_address, i = t.addressComponent.adcode;
                return i = i.substring(0, 4) + "00", e.data = {
                    cityCode: i,
                    locationText: o,
                    location: n.location
                }, console.log("then--results--resolve--", e), Promise.resolve(e);
            }
            return Promise.resolve(e);
        }, e.failHandle);
    },
    getAddressBySearch: function(n) {
        return t.getAddressBySearch(n).then(function(e) {
            if (200 == e.code) {
                var t = e.data.pois || [];
                return t.forEach(function(e, n) {
                    t[n] = {
                        title: e.name,
                        address: e.address,
                        location: e.location,
                        item: e
                    };
                }), e.data = t, Promise.resolve(e);
            }
            return Promise.resolve(e);
        }, e.failHandle);
    },
    getNearBuildings: function(n) {
        return t.getNearBuildings(n).then(function(e) {
            if (200 == e.code) {
                var t = e.data.pois.slice(0, 10);
                return t.forEach(function(e, n) {
                    t[n] = {
                        title: e.name,
                        address: e.address,
                        location: e.location,
                        item: e
                    };
                }), e.data = t, Promise.resolve(e);
            }
            return Promise.resolve(e);
        }, e.failHandle);
    }
};

module.exports = n;