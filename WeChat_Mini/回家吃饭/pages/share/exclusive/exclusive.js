var e = Object.assign || function(e) {
    for (var a = 1; a < arguments.length; a++) {
        var t = arguments[a];
        for (var s in t) Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
    }
    return e;
}, a = require("../../../controllers/shareController.js"), t = require("../../../tools/tools.js"), s = require("../../../memory/memory.js");

Page({
    data: {
        isShowRules: !1,
        pageStatus: "INIT",
        pageData: {},
        couponData: {},
        shareName: ""
    },
    onLoad: function(e) {
        var a = e.q;
        a && (e.shareName = t.getQueryString("shareName", a)), this.setData({
            shareName: e.shareName || ""
        }), this.initPage();
    },
    onShareAppMessage: function() {
        return {
            title: "回家吃饭新人专享礼券",
            path: "/pages/share/exclusive/exclusive?shareName=" + this.data.shareName,
            imageUrl: ""
        };
    },
    switchRule: function() {
        this.setData({
            isShowRules: !this.data.isShowRules
        });
    },
    receive: function(t) {
        var o = this, n = s.getData("userInfo").phone;
        if (n) {
            var i = {
                activityKeywords: this.data.shareName,
                phone: n,
                op: "coupon"
            };
            a.getExclusiveCoupon(i).then(function(a) {
                console.log("-- 新人专享领取 --", a);
                var t = "", s = a.code;
                if (4 == s ? t = "领取失败" : 30 == s ? t = "您已领取,去就餐" : 1e3 == s && (t = "您不是新用户,无法领取此券"), 
                t) wx.showModal({
                    title: "温馨提示",
                    content: t,
                    showCancel: !1,
                    success: function(e) {
                        e.confirm && wx.reLaunch({
                            url: "/pages/index/index"
                        });
                    }
                }); else {
                    var i = a.data || {};
                    o.setData({
                        pageStatus: "GET",
                        couponData: i.couponList,
                        pageData: e({}, o.data.pageData, {
                            phone: n,
                            headImg: i.app_top_image
                        })
                    });
                }
            });
        } else wx.showModal({
            title: "温馨提示",
            content: "您尚未登陆，请登陆后领取",
            showCancel: !1,
            success: function(e) {
                e.confirm && wx.navigateTo({
                    url: "/pages/login/login"
                });
            }
        });
    },
    gotoIndex: function(e) {
        wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    initPage: function(e) {
        var t = this, s = {
            name: this.data.shareName
        };
        a.getExclusive(s).then(function(e) {
            console.log("-- 新人专享 --", e);
            var a = e.data || {}, s = {
                headImg: a.app_top_image,
                rules: (a.rule_describe || "").split(/\n/)
            };
            t.setData({
                pageData: s
            });
        });
    }
});