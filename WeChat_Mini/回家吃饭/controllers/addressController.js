var e = require("../models/models.js"), s = (require("../tools/tools.js"), require("../interfaces/addressITF.js")), r = {
    getAddressList: function(r) {
        return s.getAddressList(r).then(function(s) {
            if (0 != s.code) return Promise.resolve(s);
            var r = s.data.list;
            return r.forEach(function(s, d) {
                r[d] = {
                    addressMap: s.map_address,
                    addressTitle: s.address,
                    addressInfo: s.name + " " + s.phone,
                    addressMark: e.getAddressByType(s.type),
                    addressCoordinate: s.longitude + "," + s.latitude
                };
            }), s.data = r, Promise.resolve(s);
        }, e.failHandle);
    },
    saveAddress: function(r) {
        return s.saveAddress(r).then(function(e) {
            return Promise.resolve(e);
        }, e.failHandle);
    },
    getRecommendAddress: function(r) {
        return s.getRecommendAddress(r).then(function(e) {
            return Promise.resolve(e);
        }, e.failHandle);
    },
    cancleAddress: function(r) {
        return s.cancleAddress(r).then(function(e) {
            return Promise.resolve(e);
        }, e.failHandle);
    }
};

module.exports = r;