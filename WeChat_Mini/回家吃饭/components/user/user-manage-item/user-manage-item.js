var e = require("../../../controllers/orderController.js");

require("../../../memory/memory.js");

Component({
    properties: {
        manageType: {
            type: String,
            value: ""
        },
        itemData: {
            type: Object,
            value: {
                headSrc: "http://m.jiashuangkuaizi.com/static/images/index/c2_oweni.jpg",
                userName: "沙拉大咖",
                eatingTime: "2016/06/13 10:49:24",
                orderID: "",
                orderType: "配送完成",
                orderPay: "24.00",
                kitchenID: "",
                sendType: "1",
                currentStatus: "",
                sendWord: ""
            }
        }
    },
    data: {
        isFirstTap: !0
    },
    methods: {
        gotoOrderDetail: function(e) {
            if (this.data.isFirstTap) return this.setData({
                isFirstTap: !1
            }), void wx.navigateTo({
                url: "/pages/user-order/user-order?orderid=" + e.currentTarget.dataset.orderid
            });
        },
        gotoKitchenDetail: function(e) {
            if (this.data.isFirstTap) return this.setData({
                isFirstTap: !1
            }), void wx.navigateTo({
                url: "/pages/kitchen/kitchen?kitchenid=" + e.currentTarget.dataset.kitchenid
            });
        },
        gotoEvaluate: function(e) {
            console.log("跳转去评价页面"), wx.navigateTo({
                url: "/pages/comment/add/add?u_id=" + e.currentTarget.dataset.uid + "&orderid=" + e.currentTarget.dataset.orderid
            });
        },
        gotoLookEvaluate: function(e) {
            console.log("跳转查看评价页面"), wx.navigateTo({
                url: "/pages/comment/detail/detail?kitchenid=" + e.currentTarget.dataset.kitchenid + "&orderid=" + e.currentTarget.dataset.orderid
            });
        },
        gotoPay: function(r) {
            var t = {
                order_no: r.currentTarget.dataset.orderid,
                order_price: r.currentTarget.dataset.orderprice,
                pay_type: 1
            };
            e.pay(t).then(function(e) {
                if (console.log(e), 0 == e.code) {
                    var r = e.data;
                    wx.requestPayment({
                        timeStamp: r.timestamp,
                        nonceStr: r.nonce_str,
                        package: "prepay_id=" + r.prepay_id,
                        signType: "MD5",
                        paySign: r.sign,
                        success: function() {
                            wx.showToast({
                                image: "/images/alert.png",
                                title: "支付成功",
                                complete: function() {
                                    wx.navigateTo({
                                        url: "/pages/user-order/user-order?orderid=" + t.order_no
                                    });
                                }
                            });
                        },
                        fail: function(e) {
                            console.log(e), wx.navigateTo({
                                url: "/pages/user-order/user-order?orderid=" + t.order_no
                            });
                        }
                    });
                } else wx.showToast({
                    image: "/images/alert.png",
                    title: "支付失败",
                    success: function() {
                        wx.navigateTo({
                            url: "/pages/user-order/user-order?orderid=" + t.order_no
                        });
                    }
                });
            });
        }
    }
});