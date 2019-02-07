var t = require("../../../controllers/shareController.js"), e = require("../../../controllers/locationController.js"), n = require("../../../memory/memory.js"), a = require("../../../tools/tools.js");

Page({
    data: {
        pageStatus: "INIT",
        kitchenList: [],
        inviteCode: "",
        inviter: {},
        couponInfo: "咕咕鸡送你的专属福利，快来领取吧",
        rules: [ "输入手机号即可领取回家吃饭新人专享30元优惠。下载回家吃饭APP，即可使用。", "在您完成首单消费的24小时内，分享给您此链接的好友也会获得10元回家吃饭优惠券。", "同一手机号、同一手机设备、同一支付账号均视为同一用户，新用户仅限使用一次本活动优惠礼包。", "若您过期未使用该优惠，也未下过单，则还可以领取此好友或其他好友分享给您的优惠券礼包。", "活动解释权归回家吃饭APP所有。" ]
    },
    onLoad: function(t) {
        var e = t.q;
        e && (t.inviteCode = a.getQueryString("inviteCode", e));
        var n = wx.getStorageSync("phone");
        this.setData({
            phone: n,
            inviteCode: t.inviteCode || ""
        }), this.initPage(), n && this.receive({}, n);
    },
    onShareAppMessage: function() {
        return {
            title: "送你30元礼券，尝尝家里的饭菜",
            path: "/pages/share/dandelion/dandelion?inviteCode=" + this.data.inviteCode,
            imageUrl: ""
        };
    },
    receive: function(e, n) {
        var a = this, i = e.detail || n, o = {
            invite_code: this.data.inviteCode,
            invite_phone: i
        };
        t.getDandelionCoupon(o).then(function(t) {
            if (4 != t.data.status && 5 != t.data.status) return 1 == t.data.status ? t.msg = "您已领取过新人专享优惠" : 2 == t.data.status ? t.msg = "您已使用过回家吃饭新人优惠" : 3 == t.data.status ? t.msg = "您的账号异常，暂时不能领取优惠券" : 6 == t.data.status && (t.msg = "您已领取过回家吃饭其它新人礼包"), 
            void wx.showModal({
                title: "温馨提示",
                content: t.msg,
                cancelText: "更换号码",
                success: function(t) {
                    t.confirm ? wx.reLaunch({
                        url: "/pages/index/index"
                    }) : a.setData({
                        pageStatus: "INIT",
                        phone: ""
                    });
                }
            });
            var e = t.data || {};
            a.setData({
                pageStatus: "GET",
                phone: i,
                couponInfo: e.validityTime ? "有效期: " + e.validityTime : ""
            }), wx.setStorageSync("phone", i);
        });
    },
    gotoIndex: function(t) {
        wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    gotoKitchen: function(t) {
        wx.reLaunch({
            url: "/pages/index/index",
            success: function() {
                wx.navigateTo({
                    url: "/pages/kitchen/kitchen?kitchenid=" + t.currentTarget.dataset.item.id
                });
            }
        });
    },
    initPage: function(a) {
        var i = this, o = {
            userMark: this.data.inviteCode
        };
        t.getDandelionInviter(o).then(function(t) {
            0 == t.code ? i.setData({
                inviter: t.data,
                couponInfo: t.data.nickname + "送你的专属福利，快来领取吧"
            }) : wx.showModal({
                title: "温馨提示",
                content: t.msg,
                success: function(t) {
                    t.confirm && wx.reLaunch({
                        url: "/pages/index/index"
                    });
                }
            });
        });
        var s = function() {
            var e = n.getData("locationInfo") || {};
            e = (e.location || ",").split(","), o.lng = e[0], o.lat = e[1], t.getDandelionKitchen(o).then(function(t) {
                if (0 == t.code) {
                    var e = t.data || {};
                    i.setData({
                        kitchenList: e.kitchenList
                    });
                } else wx.showModal({
                    title: "温馨提示",
                    content: t.msg,
                    success: function(t) {
                        t.confirm && wx.reLaunch({
                            url: "/pages/index/index"
                        });
                    }
                });
            });
        };
        (n.getData("locationInfo") || {}).location ? s() : e.getLocation().then(function(t) {
            200 == t.code && n.setData("locationInfo", {
                locationText: t.data.locationText,
                location: t.data.location
            }), s();
        }, function() {
            s();
        });
    }
});