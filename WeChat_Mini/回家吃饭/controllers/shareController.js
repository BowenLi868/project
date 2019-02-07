var e = require("../models/models.js"), n = require("../interfaces/shareITF.js"), t = {
    getExclusive: function(t) {
        return n.getExclusive(t).then(function(e) {
            return Promise.resolve(e);
        }, e.failHandle);
    },
    getExclusiveCoupon: function(t) {
        return n.getExclusiveCoupon(t).then(function(e) {
            e.data = e.data || {};
            var n = [], t = e.data.coupon_list || {};
            return Object.keys(t).forEach(function(e) {
                n.push(t[e]);
            }), n.forEach(function(e, t) {
                var o = [];
                e.coupon_content && o.push("· " + e.coupon_content), e.coupon_date && o.push("· " + e.coupon_date), 
                n[t] = {
                    usable: !0,
                    number: e.coupon_money,
                    unit: e.unit || "元",
                    highline: e.coupon_title,
                    highText: e.coupon_sub_title,
                    warnArray: o,
                    ununableReason: []
                };
            }), e.data.couponList = n, Promise.resolve(e);
        }, e.failHandle);
    },
    getPacket: function(t) {
        return n.getPacket(t).then(function(e) {
            return Promise.resolve(e);
        }, e.failHandle);
    },
    getPacketCoupon: function(t) {
        return n.getPacketCoupon(t).then(function(e) {
            return Promise.resolve(e);
        }, e.failHandle);
    },
    getDandelionInviter: function(t) {
        return n.getDandelionInviter(t).then(function(e) {
            return Promise.resolve(e);
        }, e.failHandle);
    },
    getDandelionKitchen: function(t) {
        return n.getDandelionKitchen(t).then(function(e) {
            var n = e.data = e.data || {}, t = [];
            return Object.keys(n).forEach(function(e) {
                t.push(n[e]);
            }), e.data.kitchenList = t, Promise.resolve(e);
        }, e.failHandle);
    },
    getDandelionCoupon: function(t) {
        return n.getDandelionCoupon(t).then(function(e) {
            return Promise.resolve(e);
        }, e.failHandle);
    },
    getActivity: function(t) {
        return n.getActivity(t).then(function(e) {
            return Promise.resolve(e);
        }, e.failHandle);
    },
    getActivityCoupon: function(t) {
        return n.getActivityCoupon(t).then(function(e) {
            return Promise.resolve(e);
        }, e.failHandle);
    },
    getIndexFloatImg: function(t) {
        return n.getIndexFloatImg(t).then(function(e) {
            return Promise.resolve(e);
        }, e.failHandle);
    }
};

module.exports = t;