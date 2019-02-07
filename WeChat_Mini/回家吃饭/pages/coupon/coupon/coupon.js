var t = require("../../../controllers/orderController.js");

Page({
    data: {
        couponData: []
    },
    onLoad: function(t) {
        var o = this;
        getApp().getLogStatus().then(function() {
            o.initPage();
        });
    },
    initPage: function() {
        var o = this;
        t.otdCoupon().then(function(t) {
            o.setData({
                loaded: !0
            }), o.setData({
                couponData: t.data.unuseList
            }), console.log("--过期优惠券--", t);
        });
    }
});