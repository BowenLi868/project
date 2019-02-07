var t = require("../../../controllers/orderController.js");

Page({
    data: {
        ticketData: [],
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
        t.getTicketsList().then(function(t) {
            console.log("--可用饭票--", t), o.setData({
                ticketData: t.data.useList
            });
        }), t.getUsefulCouponList({}, !0).then(function(t) {
            o.setData({
                loaded: !0
            }), o.setData({
                couponData: t.data.useList
            }), console.log("--可用优惠券--", t);
        });
    },
    gotoOtdTicket: function() {
        wx.navigateTo({
            url: "/pages/coupon/ticket/ticket"
        });
    },
    gotoOtdCoupon: function() {
        wx.navigateTo({
            url: "/pages/coupon/coupon/coupon"
        });
    }
});