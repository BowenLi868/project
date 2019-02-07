var a = Object.assign || function(a) {
    for (var t = 1; t < arguments.length; t++) {
        var e = arguments[t];
        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (a[n] = e[n]);
    }
    return a;
}, t = require("../../../controllers/shareController.js"), e = require("../../../tools/tools.js"), n = require("../../../memory/memory.js");

Page({
    data: {
        pageStatus: "INIT",
        pageData: {},
        activityData: {},
        couponData: {},
        shareName: ""
    },
    onLoad: function(a) {
        var t = a.q;
        t && (a.shareName = e.getQueryString("shareName", t)), this.setData({
            pageData: {
                phone: n.getData("userInfo").phone
            },
            shareName: a.shareName || ""
        }), this.initPage();
    },
    onShareAppMessage: function() {
        return {
            title: this.data.activityData.share_title || "回家吃饭:家庭美食分享平台",
            path: "/pages/share/activity/activity?shareName=" + this.data.shareName,
            imageUrl: ""
        };
    },
    receive: function(e) {
        var n = this, i = e.detail, o = {
            activityKeywords: this.data.shareName,
            phone: i,
            op: "coupon"
        };
        t.getActivityCoupon(o).then(function(t) {
            var e = t.code;
            if (1 == e || 2 == e) {
                t.data;
                n.setData({
                    pageStatus: "GET",
                    pageData: a({}, n.data.pageData, {
                        phone: i
                    })
                });
            } else wx.showModal({
                title: "温馨提示",
                content: t.msg,
                success: function(a) {
                    a.confirm && wx.reLaunch({
                        url: "/pages/index/index"
                    });
                }
            });
        });
    },
    gotoIndex: function(a) {
        wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    initPage: function(e) {
        var n = this, i = {
            name: this.data.shareName
        };
        t.getActivity(i).then(function(t) {
            var e = t.data || {}, i = (e.rule_describe || "").split(/\n/);
            i.forEach(function(a, t) {
                i[t] = a.replace(/^[0-9]+\./, "");
            });
            var o = [];
            e.coupon_content && o.push("· " + e.coupon_content);
            var r = {
                usable: !0,
                number: e.coupon_money,
                unit: "元",
                highline: e.coupon_title,
                highText: e.coupon_sub_title,
                warnArray: o,
                ununableReason: []
            };
            wx.setNavigationBarTitle({
                title: e.page_title || "回家吃饭"
            }), n.setData({
                couponData: r,
                activityData: e,
                pageData: a({}, n.data.pageData, {
                    headImg: e.app_top_image,
                    rules: i
                })
            });
        });
    }
});