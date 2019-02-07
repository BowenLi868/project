var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (t[i] = a[i]);
    }
    return t;
}, e = require("../../controllers/indexController.js"), a = require("../../controllers/locationController.js"), i = require("../../controllers/shareController.js"), n = require("../../memory/memory.js"), o = require("../../models/models.js");

Page({
    data: {
        isAreaOpened: !0,
        locationText: "",
        headerInfo: {},
        nearKitchenList: [],
        iskitchenTotal: !1,
        exceptionType: "",
        kitchenArgs: {
            coordinate: "",
            page: 1,
            size: 5
        }
    },
    onLoad: function() {
        var t = this;
        wx.showShareMenu({
            withShareTicket: !0
        }), n.removeData("locationInfo"), getApp().getLogStatus().then(function() {
            t.initPage();
        });
    },
    onShow: function() {
        var e = this;
        this.setData({
            isGoingToKitchen: !1
        }), setTimeout(function() {
            e.getHeadInfo();
        }, 1e3);
        var a = n.getData("locationInfo");
        if (a) {
            if (this.renderShare(), a.locationText == this.data.locationText) return;
            this.setData({
                locationText: a.locationText,
                kitchenArgs: t({}, this.data.kitchenArgs, {
                    page: 1,
                    coordinate: a.location
                })
            }), this.initData();
        }
    },
    onPullDownRefresh: function() {
        var a = this;
        this.setData({
            kitchenArgs: t({}, this.data.kitchenArgs, {
                page: 1
            })
        }), wx.showLoading({
            title: "正在加载数据"
        }), e.getNearKitchenList(this.data.kitchenArgs).then(function(e) {
            wx.hideLoading(), 0 == e.code ? a.setData({
                iskitchenTotal: e.data.list.length < a.data.kitchenArgs.size,
                nearKitchenList: e.data.list || [],
                kitchenArgs: t({}, a.data.kitchenArgs, {
                    page: a.data.kitchenArgs.page + 1
                })
            }) : wx.showToast({
                image: "/images/alert.png",
                title: e.msg
            });
        }), wx.stopPullDownRefresh();
    },
    onReachBottom: function(a) {
        var i = this;
        this.data.exceptionType || this.data.iskitchenTotal || (wx.showLoading({
            title: "正在加载数据"
        }), e.getNearKitchenList(this.data.kitchenArgs).then(function(e) {
            wx.hideLoading(), 0 == e.code ? i.setData({
                iskitchenTotal: e.data.list.length < i.data.kitchenArgs.size,
                nearKitchenList: i.data.nearKitchenList.concat(e.data.list),
                kitchenArgs: t({}, i.data.kitchenArgs, {
                    page: i.data.kitchenArgs.page + 1
                })
            }) : wx.showToast({
                image: "/images/alert.png",
                title: e.msg
            });
        }));
    },
    onShareAppMessage: function() {
        return {
            title: "回家吃饭:家庭美食分享平台",
            path: "/pages/index/index",
            imageUrl: "http://image.jiashuangkuaizi.com/image/wxapp/hjcf/xcxfx.jpg"
        };
    },
    gotoCenter: function() {
        (n.getData("userInfo") ? n.getData("userInfo").utoken : "") ? wx.navigateTo({
            url: "/pages/user/user"
        }) : wx.navigateTo({
            url: "/pages/login/login"
        });
    },
    initPage: function() {
        var e = this, i = this, o = new Promise(function(t, e) {
            wx.getNetworkType({
                success: function(a) {
                    "none" == a.networkType ? (i.setData({
                        exceptionType: "wifiless"
                    }), e()) : t();
                }
            });
        }), s = a.getLocation().then(function(a) {
            console.log("then--locationPromise--", a), 200 == a.code ? (e.setData({
                kitchenArgs: t({}, i.data.kitchenArgs, {
                    coordinate: a.data.location
                }),
                locationText: a.data.locationText
            }), n.setData("locationInfo", a.data)) : e.setData({
                loaded: !0,
                locationText: "抱歉暂时无法定位,请点击定位"
            });
        }, function(t) {
            console.log("then--locationPromise--fail--", t), e.setData({
                loaded: !0,
                locationText: "抱歉暂时无法定位,请点击定位"
            });
        });
        o.then(function() {
            return s;
        }).then(function() {
            i.initData(), i.renderShare();
        });
    },
    renderShare: function() {
        var t = this, e = n.getData("locationInfo").cityCode, a = n.getData("shareHistory") || [];
        if (console.log("--shareHistory--", a), !(a.indexOf(e + "") > -1)) {
            a.push(e + ""), n.setData("shareHistory", a);
            var s = n.getData("locationInfo").location;
            i.getIndexFloatImg({
                page_key: "homepage",
                _cityid: n.getData("locationInfo").cityCode,
                coordinate: s
            }).then(function(e) {
                var a = e.data.list;
                if (a && a.length) {
                    var i = a[0] || {}, s = !0;
                    n.getData("hasShare") && (s = !1), n.setData("hasShare", !0), t.setData({
                        hasShare: s,
                        shareSrc: i.image_url,
                        sharePage: o.getSharePageByUrl(i.jump_url)
                    });
                }
            });
        }
    },
    shareLinkCallback: function() {
        this.setData({
            hasShare: !1
        });
    },
    initData: function() {
        var a = this;
        this.data.kitchenArgs.page > 1 && wx.showLoading({
            title: "正在加载数据",
            mask: !0
        }), e.getHeaderInfo().then(function(t) {
            return 0 == t.code && a.setData({
                headerInfo: t.data
            }), a.data.isAreaOpened ? e.getNearKitchenList(a.data.kitchenArgs) : (wx.hideLoading(), 
            Promise.reject("未开通城市"));
        }).then(function(e) {
            wx.hideLoading(), wx.stopPullDownRefresh(), 0 == e.code && 0 != e.data.list.length ? (a.setData({
                exceptionType: ""
            }), a.setData({
                iskitchenTotal: e.data.list.length < a.data.kitchenArgs.size,
                nearKitchenList: e.data.list,
                kitchenArgs: t({}, a.data.kitchenArgs, {
                    page: a.data.kitchenArgs.page + 1
                }),
                loaded: !0
            })) : a.setData({
                exceptionType: "nokitchen"
            });
        });
    },
    getHeadInfo: function() {
        var t = this;
        e.getHeaderInfo().then(function(e) {
            0 == e.code && t.setData({
                headerInfo: e.data
            });
        });
    },
    gotoKitchen: function(t) {
        this.data.isGoingToKitchen || (this.setData({
            isGoingToKitchen: !0
        }), wx.navigateTo({
            url: "/pages/kitchen/kitchen?kitchenid=" + t.detail.kitchenID
        }));
    }
});