var e = require("../../controllers/userController.js"), t = require("../../controllers/orderController.js"), a = require("../../controllers/shareController.js"), r = require("../../memory/memory.js");

require("../../models/models.js");

Page({
    data: {
        manageType: "status",
        orderID: "",
        utoken: "",
        remainTime: "",
        dataList: [],
        timeList: [],
        detailList: "",
        kitchenPhone: "",
        hurryTip: "",
        hurryTipNum: "",
        cookName: "",
        bgMsgText: "",
        payRed: !1,
        hurryRed: !1,
        cancelOrder: !1,
        backOrder: !1,
        hurry: !1,
        eatedRed: !1,
        refunded: !1,
        goComment: !1,
        callCook: !1,
        statusToPayFee: "",
        imageLoading: !0,
        timeIntervalId: 0,
        timeIntervalCookId: 0,
        isFirstTap: !0,
        isFirstButtonTap: !0,
        remainCookTime: "",
        isShowShareBtn: !1,
        isShowRedGet: !1
    },
    onLoad: function(e) {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                var a = (e.model || "").indexOf("iPhone X") > -1;
                console.log("系统信息：", e), t.setData({
                    isIPhoneX: !!a
                });
            }
        }), console.log(e), this.setData({
            orderID: e.orderid,
            isShowShareBtn: e.setOrder
        }), getApp().getLogStatus().then(function() {
            t.getCurrentOrderStatus(), t.getCurrentOrderDetail(), e.setOrder && t.renderShare();
        });
    },
    onShow: function() {
        this.setData({
            isFirstButtonTap: !0
        }), this.getCurrentOrderStatus(), this.getCurrentOrderDetail();
    },
    onUnload: function() {
        this.data.timeIntervalId > 0 && (clearTimeout(this.data.timeIntervalId), this.data.timeIntervalId = 0, 
        console.log("onUnload - clearTimeout", this.data.timeIntervalId, this.data)), this.data.timeIntervalCookId > 0 && (clearTimeout(this.data.timeIntervalCookId), 
        this.data.timeIntervalCookId = 0);
    },
    onPullDownRefresh: function() {
        "status" == this.data.manageType ? this.getCurrentOrderStatus() : this.getCurrentOrderDetail();
    },
    onShareAppMessage: function(e) {
        var t = this;
        if ("button" == e.from) return {
            title: this.data.shareTitle,
            path: this.data.sharePage,
            imageUrl: this.data.shareSrc,
            success: function() {
                t.setData({
                    isShowShareBtn: !1
                });
            }
        };
    },
    hideShare: function() {
        this.setData({
            isShowShareBtn: !1,
            isShowRedGet: !1
        });
    },
    renderShare: function() {
        var e = this, t = r.getData("locationInfo").location;
        a.getIndexFloatImg({
            order_no: this.data.orderID,
            page_key: "paysuccess",
            _cityid: r.getData("locationInfo").cityCode,
            coordinate: t
        }).then(function(t) {
            var a = t.data.list;
            if (a && a.length) {
                var r = a[0] || {};
                e.setData({
                    isShowShareBtn: !0,
                    redImageUrl: r.image_url,
                    shareSrc: r.share_image_url,
                    shareTitle: r.title,
                    sharePage: decodeURIComponent(r.wxapp_path)
                });
            }
        });
    },
    switchManage: function(e) {
        this.setData({
            manageType: e.currentTarget.dataset.type
        }), "status" == this.data.manageType ? this.getCurrentOrderStatus() : this.getCurrentOrderDetail();
    },
    getCurrentOrderStatus: function() {
        var t = this;
        r.checkUtoken(), wx.showLoading({
            title: "加载中",
            mask: !0
        });
        this.data.orderID;
        var a = {
            type: this.data.manageType,
            utoken: r.getData("userInfo").utoken,
            order_no: this.data.orderID
        };
        e.getCurrentOrderStatus(a).then(function(e) {
            if (console.log("当前订单状态：", e.data), wx.hideLoading(), wx.stopPullDownRefresh(), 
            0 == e.code) {
                var a = e.data, r = a.order_status, o = a.is_comment, n = e.data.time_list;
                if (t.setData({
                    timeList: n,
                    kitchenPhone: e.data.kitchen.kitchen_phone,
                    hurryTip: "家厨联系方式为" + e.data.kitchen.kitchen_phone + ",  如需催单请联系家厨",
                    hurryTipNum: e.data.kitchen.kitchen_phone,
                    cookName: e.data.kitchen.cook_name,
                    dataList: a,
                    statusToPayFee: a.to_pay_fee,
                    remainTime: "剩余时间" + Math.floor(n[0].remaining / 60) + "分" + (n[0].remaining % 60 / 100).toFixed(2).slice(-2) + "秒",
                    imageLoading: !1
                }), 101 == r) {
                    var i = t, d = n[0].remaining;
                    console.log(n[0]), 0 == d ? i.setData({
                        remainCookTime: n[0].bg_msg
                    }) : i.setData({
                        remainCookTime: n[0].bg_msg + ",剩余时间" + Math.floor(d / 60) + "分" + (d % 60 / 100).toFixed(2).slice(-2) + "秒"
                    }), i.data.timeIntervalCookId > 0 && (clearTimeout(i.data.timeIntervalCookId), i.data.timeIntervalCookId = 0, 
                    console.log("clearTimeout", i.data.timeIntervalCookId)), i.data.timeIntervalCookId = setInterval(function() {
                        var e = Math.floor((d - 1) / 60) + "分" + ((d - 1) % 60 / 100).toFixed(2).slice(-2) + "秒";
                        d--, i.setData({
                            remainCookTime: n[0].bg_msg + ",剩余时间" + e
                        }), d < 0 && (clearTimeout(i.data.timeIntervalCookId), i.data.timeIntervalCookId = 0, 
                        i.setData({
                            remainCookTime: n[0].bg_msg
                        }));
                    }, 1e3);
                }
                if (0 == r) {
                    var i = t, s = n[0].remaining;
                    i.data.timeIntervalId > 0 && (clearTimeout(i.data.timeIntervalId), i.data.timeIntervalId = 0, 
                    console.log("clearTimeout", i.data.timeIntervalId)), i.data.timeIntervalId = setInterval(function() {
                        var e = Math.floor((s - 1) / 60) + "分" + ((s - 1) % 60 / 100).toFixed(2).slice(-2) + "秒";
                        s--, i.setData({
                            remainTime: "剩余时间" + e
                        }), s < 0 && (clearTimeout(i.data.timeIntervalId), i.data.timeIntervalId = 0, i.setData({
                            remainTime: "剩余时间0分00秒"
                        }));
                    }, 1e3);
                }
                -2 != r && -1 != r || t.setData({
                    remainTime: "剩余时间0分00秒"
                });
                for (var c = 0; c < n.length; c++) 400 == n[c].status && t.setData({
                    hurryTip: e.data.prompt_msg,
                    hurryTipNum: n[c].dm_phone
                });
                0 == r && t.setData({
                    refunded: !1,
                    backOrder: !1,
                    hurryRed: !1,
                    hurry: !1,
                    eatedRed: !1,
                    cancelOrder: !0,
                    payRed: !0,
                    goComment: !1,
                    callCook: !1
                }), 101 == r && (console.log(r), t.setData({
                    hurryRed: !0,
                    backOrder: !1,
                    cancelOrder: !0,
                    hurry: !1,
                    eatedRed: !1,
                    refunded: !1,
                    payRed: !1,
                    goComment: !1,
                    callCook: !1
                })), 300 != r && 404 != r && 405 != r || (console.log(r), t.setData({
                    hurryRed: !0,
                    backOrder: !1,
                    cancelOrder: !1,
                    hurry: !1,
                    eatedRed: !1,
                    refunded: !1,
                    payRed: !1,
                    goComment: !1,
                    callCook: !1
                })), 400 != r && 401 != r && 402 != r && 403 != r || t.setData({
                    hurry: !0,
                    eatedRed: !0,
                    hurryRed: !1,
                    backOrder: !1,
                    cancelOrder: !1,
                    refunded: !1,
                    payRed: !1,
                    goComment: !1,
                    callCook: !1
                }), 302 == r && t.setData({
                    hurry: !1,
                    eatedRed: !0,
                    hurryRed: !1,
                    backOrder: !1,
                    cancelOrder: !1,
                    refunded: !1,
                    payRed: !1,
                    goComment: !1,
                    callCook: !1
                }), 390 == r && t.setData({
                    hurry: !0,
                    eatedRed: !1,
                    hurryRed: !1,
                    backOrder: !1,
                    cancelOrder: !1,
                    refunded: !1,
                    payRed: !1,
                    goComment: !1,
                    callCook: !1
                }), (500 == r || 602 == r || -2 == r || -1 == r && 0 != o) && (console.log(n[0].status), 
                t.setData({
                    refunded: !0,
                    hurryRed: !1,
                    cancelOrder: !1,
                    backOrder: !1,
                    hurry: !1,
                    eatedRed: !1,
                    payRed: !1,
                    goComment: !1,
                    callCook: !1
                })), 600 != r && 601 != r || t.setData({
                    refunded: !1,
                    hurryRed: !1,
                    cancelOrder: !1,
                    backOrder: !1,
                    hurry: !1,
                    eatedRed: !1,
                    payRed: !1,
                    goComment: !1,
                    callCook: !0
                }), 500 == r && 0 == o && t.setData({
                    refunded: !0,
                    hurryRed: !1,
                    cancelOrder: !1,
                    backOrder: !1,
                    hurry: !1,
                    eatedRed: !1,
                    payRed: !1,
                    goComment: !0,
                    callCook: !1
                });
            }
        });
    },
    getCurrentOrderDetail: function() {
        var t = this;
        wx.showLoading({
            title: "加载中",
            mask: !0
        });
        this.data.orderID;
        var a = {
            type: this.data.manageType,
            utoken: r.getData("userInfo").utoken,
            order_no: this.data.orderID
        };
        e.getCurrentOrderDetail(a).then(function(e) {
            console.log("当前订单详情：", e.data), console.log("当前订单详情：", e.data.order_status), wx.hideLoading(), 
            wx.stopPullDownRefresh(), 0 == e.code && (t.setData({
                detailList: e.data
            }), 20 == e.data.order_status && t.setData({
                manageType: "detail"
            }));
        });
    },
    gotoKitchenDetail: function(e) {
        if (this.data.isFirstButtonTap) this.setData({
            isFirstButtonTap: !1
        }); else {
            var t = getCurrentPages();
            "pages/kitchen/kitchen" === t[t.length - 2].is ? wx.navigateBack({
                delta: 1
            }) : wx.redirectTo({
                url: "/pages/kitchen/kitchen?kitchenid=" + e.currentTarget.dataset.kitchenid
            });
        }
    },
    statusActionHurry: function() {
        var e = this;
        wx.showModal({
            title: "温馨提示",
            content: e.data.hurryTip,
            cancelColor: "#4A90E2",
            confirmColor: "#4A90E2",
            success: function(t) {
                t.confirm ? wx.makePhoneCall({
                    phoneNumber: e.data.hurryTipNum
                }) : t.cancel && console.log("用户点击取消");
            }
        });
    },
    gotoCallCook: function() {
        var e = this;
        wx.showModal({
            title: "温馨提示",
            content: "是否联系" + e.data.cookName + e.data.hurryTipNum,
            cancelColor: "#4A90E2",
            confirmColor: "#4A90E2",
            success: function(t) {
                t.confirm ? wx.makePhoneCall({
                    phoneNumber: e.data.hurryTipNum
                }) : t.cancel && console.log("用户点击取消");
            }
        });
    },
    statusActionCancel: function() {
        var e = this;
        wx.showModal({
            content: "确定要取消订单",
            cancelColor: "#4A90E2",
            confirmColor: "#4A90E2",
            success: function(t) {
                if (t.confirm) {
                    e.getCancelOrderData();
                    setTimeout(function() {
                        e.getCurrentOrderStatus();
                    }, 500);
                    clearTimeout(e.data.timeIntervalId), e.setData({
                        remainTime: "剩余时间0分00秒"
                    });
                } else t.cancel && console.log("用户点击取消");
            }
        });
    },
    getCancelOrderData: function() {
        var t = {
            order_no: this.data.orderID
        };
        e.getCancelOrder(t).then(function(e) {
            0 == e.code && console.log("取消订单：", e);
        });
    },
    getStatusActionEated: function() {
        var t = this, a = {
            utoken: r.getData("userInfo").utoken,
            order_no: this.data.orderID
        };
        e.getStatusEated(a).then(function(e) {
            0 == e.code && (t.getCurrentOrderStatus(), t.getCurrentOrderDetail());
        });
    },
    statusActionEated: function() {
        var e = this;
        wx.showModal({
            title: "",
            content: "确认已就餐？",
            cancelColor: "#4A90E2",
            confirmColor: "#4A90E2",
            success: function(t) {
                t.confirm ? e.getStatusActionEated() : t.cancel && console.log("用户点击取消");
            }
        });
    },
    gotoComment: function(e) {
        console.log("--去评价--", e);
        var t = e.currentTarget.dataset;
        wx.navigateTo({
            url: "/pages/comment/add/add?orderid=" + t.orderid + "&u_id=" + t.uid
        });
    },
    getCommentList: function() {
        var t = {
            utoken: r.getData("userInfo").utoken,
            order_no: this.data.orderID
        };
        e.getCommentList(t).then(function(e) {
            0 == e.code && console.log("去评论：", e);
        });
    },
    statusActionBack: function() {
        console.log("我要退单");
        var t = {
            utoken: r.getData("userInfo").utoken,
            order_no: this.data.orderID
        };
        e.getBackOrder(t).then(function(e) {
            0 == e.code && console.log("我要退单1", e);
        }), this.getBackOrderTwo();
    },
    getBackOrderTwo: function() {
        e.getBackOrderTwo().then(function(e) {
            0 == e.code && console.log("我要退单2", e);
        });
    },
    gotoPay: function(e) {
        var a = this;
        if (this.data.isFirstButtonTap) {
            this.setData({
                isFirstButtonTap: !1
            });
            var r = {
                order_no: this.data.orderID,
                order_price: this.data.statusToPayFee,
                pay_type: 1
            };
            t.pay(r).then(function(e) {
                if (console.log(e), 0 == e.code) {
                    var t = e.data;
                    wx.requestPayment({
                        timeStamp: t.timestamp,
                        nonceStr: t.nonce_str,
                        package: "prepay_id=" + t.prepay_id,
                        signType: "MD5",
                        paySign: t.sign,
                        success: function() {
                            wx.showToast({
                                image: "/images/alert.png",
                                title: "支付成功",
                                complete: function() {
                                    a.getCurrentOrderStatus();
                                }
                            });
                        },
                        fail: function(e) {
                            console.log(e), a.getCurrentOrderStatus();
                        }
                    });
                } else wx.showToast({
                    image: "/images/alert.png",
                    title: "支付失败",
                    success: function() {
                        console.log("支付失败");
                    }
                });
            });
        }
    }
});