var e = Object.assign || function(e) {
    for (var a = 1; a < arguments.length; a++) {
        var t = arguments[a];
        for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
    }
    return e;
}, a = require("../../../controllers/shareController.js"), t = (require("../../../controllers/locationController.js"), 
require("../../../tools/tools.js"));

require("../../../memory/memory.js");

Page({
    data: {
        pageStatus: "INIT",
        kitchenList: [],
        pageData: {},
        couponData: {},
        shareName: "",
        shareKey: ""
    },
    onLoad: function(e) {
        var a = e.q;
        a && (e.shareName = t.getQueryString("shareName", a), e.shareKey = t.getQueryString("shareKey", a));
        var r = wx.getStorageSync("phone");
        this.setData({
            pageData: {
                phone: r
            },
            shareName: e.shareName || "",
            shareKey: e.shareKey || ""
        }), this.initPage(), r && this.receive({}, r);
    },
    onShareAppMessage: function() {
        return {
            title: "给你红包，尝尝家里的饭菜",
            path: "/pages/share/packet/packet?shareName=" + this.data.shareName + "&shareKey=" + this.data.shareKey,
            imageUrl: ""
        };
    },
    reset: function() {
        this.setData({
            pageStatus: "INIT"
        });
    },
    receive: function(t, r) {
        var s = this, n = r || t.detail, o = {
            name: this.data.shareName,
            phone: n,
            shareKey: this.data.shareKey,
            op: "coupon"
        };
        a.getPacketCoupon(o).then(function(a) {
            if (0 == a.code) {
                var t = a.data || {}, r = [];
                1 == t.status ? r.push({
                    title: t.first_coupon.title,
                    money: t.first_coupon.money.replace("元", "")
                }) : r = (t.status, t.list), s.setData({
                    pageStatus: "GET",
                    couponData: r,
                    pageData: e({}, s.data.pageData, {
                        phone: n
                    })
                }), t.message && wx.showToast({
                    icon: "none",
                    title: t.message
                }), wx.setStorageSync("phone", n);
            } else wx.showModal({
                title: "温馨提示",
                content: a.msg,
                success: function(e) {
                    e.confirm && wx.reLaunch({
                        url: "/pages/index/index"
                    });
                }
            });
        });
    },
    gotoIndex: function(e) {
        wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    initPage: function(t) {
        var r = this, s = {
            name: this.data.shareName
        };
        return void a.getPacket(s).then(function(a) {
            console.log("-- 红包 --", a);
            var t = a.data || {}, s = (t.rule_describe || "").split(/\n/);
            s.forEach(function(e, a) {
                s[a] = e.replace(/^[0-9]+\./, "");
            }), r.setData({
                pageData: e({}, r.data.pageData, {
                    headImg: t.top_image_url,
                    rules: s
                })
            });
        });
    }
});