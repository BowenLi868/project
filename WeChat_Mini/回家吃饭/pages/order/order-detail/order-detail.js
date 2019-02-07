var e = require("../../../controllers/orderController.js"), t = (require("../../../controllers/locationController.js"), 
require("../../../controllers/addressController.js")), a = require("../../../models/models.js"), s = require("../../../tools/tools.js"), r = require("../../../memory/memory.js");

Page({
    data: {
        isFirstLoad: !0,
        isShowTime: !1,
        isUseExtra: !1,
        eatingType: 0,
        timeData: {},
        orderInfo: {},
        orderData: {},
        orderAddress: {},
        orderTime: {},
        orderMessage: "",
        orderCoupon: {},
        orderTicket: {},
        preCheckData: {
            kitchen: {
                is_distr: 1,
                is_door: 1,
                is_refectory: 1
            }
        },
        isIPhoneX: !1
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
        }), this.setData({
            orderInfo: r.getData("orderInfo") || {},
            orderData: r.getData("orderData") || {}
        }), this.initPage();
    },
    onShow: function() {
        if (!this.data.isFirstLoad) {
            var e = r.getData("orderAddress") || this.data.orderAddress, t = r.getData("orderMessage") || this.data.orderMessage, a = r.getData("orderCoupon") || this.data.orderCoupon, s = r.getData("orderTicket") || this.data.orderTicket;
            e = 0 == this.data.eatingType ? e : {
                address: this.data.orderData.address,
                linkman: this.data.orderData.name,
                phone: this.data.orderData.phone
            }, this.setData({
                orderAddress: e,
                orderMessage: t,
                orderCoupon: a,
                orderTicket: s
            }), this.preCheck();
        }
    },
    onUnload: function() {
        this.clearOrderMemory();
    },
    initPage: function() {
        var e = this, o = r.getData("locationInfo"), i = {
            coordinate: o ? o.location : "",
            kitchen_id: this.data.orderData.kitchen_id
        };
        t.getRecommendAddress(i).then(function(t) {
            if (0 == t.code) {
                var o = t.data;
                if (s.isKeyEmptyObject(o)) e.preCheck(); else {
                    var i = {
                        addressID: o.address_id,
                        typeName: a.getAddressByType(o.type),
                        user: o.name + " " + o.phone,
                        address: o.address,
                        isRecommend: !0,
                        linkman: o.name,
                        phone: o.phone
                    };
                    e.setData({
                        orderAddress: i
                    }), r.setData("orderAddress", i), e.choseTime("fromAddress");
                }
                console.log("推荐地址: ", t.data);
            } else e.preCheck();
        });
    },
    switchWay: function(e) {
        this.checkUtoken() && (this.setData({
            eatingType: e.detail.way
        }), 0 != e.detail.way ? this.setData({
            orderAddress: {
                address: this.data.orderData.address,
                linkman: this.data.orderData.name,
                phone: this.data.orderData.phone
            }
        }) : this.setData({
            orderAddress: r.getData("orderAddress") || {}
        }), this.preCheck(), console.log("就餐方式：", e.detail.way));
    },
    choseAddress: function() {
        this.checkUtoken() && 0 == this.data.eatingType && this.data.preCheckData.kitchen.is_distr && wx.navigateTo({
            url: "/pages/order/order-address/order-address?kitchenID=" + this.data.orderData.kitchen_id
        });
    },
    choseTime: function(t) {
        var a = this;
        if (this.checkUtoken()) {
            var s = {
                dish_list: this.data.orderData.dish_list,
                date_type: this.data.orderData.date_type,
                kitchen_id: this.data.orderData.kitchen_id,
                type: this.data.eatingType
            };
            0 == s.type && (s.address_id = this.data.orderAddress.addressID), 0 != s.type || this.data.orderAddress.addressID ? (s.type = 0 == s.type ? 1 : s.type, 
            e.getTimeList(s).then(function(e) {
                0 == e.code ? (console.log("就餐时间列表:", e), a.setData({
                    timeData: e.data,
                    isShowTime: "fromAddress" !== t
                }), "fromAddress" === t && (1 != a.data.orderData.date_type && a.setData({
                    orderTime: {
                        day: e.data.day,
                        time: e.data.timeArray[0].time,
                        text: e.data.timeArray[0].title
                    }
                }), a.preCheck())) : wx.showToast({
                    image: "/images/alert.png",
                    title: e.msg
                });
            })) : wx.showToast({
                image: "/images/alert.png",
                title: "请选择送餐地址"
            });
        }
    },
    cancleTime: function() {
        this.setData({
            isShowTime: !1
        });
    },
    saveTime: function(e) {
        var t = e.detail;
        this.setData({
            orderTime: t,
            isShowTime: !1
        }), this.preCheck(), console.log("timeInfo:", t);
    },
    choseMessage: function() {
        this.checkUtoken() && wx.navigateTo({
            url: "/pages/order/order-message/order-message"
        });
    },
    choseCoupon: function() {
        if (this.checkUtoken() && (0 != this.data.eatingType || this.data.orderAddress.address && this.data.orderTime.time) && (0 == this.data.eatingType || this.data.orderTime.time)) {
            var e = this.data.orderData.date_type, t = this.data.orderData.kitchen_id;
            wx.navigateTo({
                url: "/pages/order/order-coupon/order-coupon?kitchen_id=" + t + "&date_type=" + e
            });
        }
    },
    choseTicket: function() {
        this.checkUtoken() && this.data.preCheckData.ticket.ticket_usable && wx.navigateTo({
            url: "/pages/order/order-ticket/order-ticket?kitchen_id=" + this.data.orderData.kitchen_id
        });
    },
    switchUseExtra: function() {
        var e = this, t = function() {
            e.setData({
                isUseExtra: !e.data.isUseExtra
            });
        };
        t(), this.preCheck(!1, t);
    },
    preCheck: function(t, a) {
        var s = this;
        if (this.checkUtoken()) {
            var o = this.data, i = {
                dish_list: o.orderData.dish_list,
                staple_list: o.orderData.staple_list,
                kitchen_id: o.orderData.kitchen_id,
                date_type: o.orderData.date_type,
                send_time: o.orderTime.time || "",
                send_type: o.eatingType,
                address_id: o.orderAddress.addressID || "",
                coupon_id: o.orderCoupon.couponID || "",
                ticket_id: o.orderTicket.ticketID || "",
                is_use_balance: +o.isUseExtra
            };
            return 0 == i.send_type && i.address_id && (i.send_type = 1), this.data.isFirstLoad ? this.setData({
                isFirstLoad: !1
            }) : wx.showLoading({
                mask: !0,
                title: "处理中..."
            }), e.getPreCheckInfo(i).then(function(e) {
                if (wx.hideLoading(), s.setData({
                    loaded: !0
                }), 0 == e.code) {
                    if (e.msg) {
                        var t = function() {
                            var t = s.data.orderData;
                            t.staple_list = [], t.dish_list = [], e.data.food_list.forEach(function(e) {
                                0 != e.food_id && (1 == e.food_id ? t.staple_list.push({
                                    price: e.food_price,
                                    id: e.food_id,
                                    count: e.food_num
                                }) : t.dish_list.push({
                                    price: e.food_price,
                                    id: e.food_id,
                                    count: e.food_num,
                                    has_staple: e.has_staple,
                                    special_dish: e.special_dish,
                                    box_fee: e.box_fee
                                }));
                            }), t.staple_list = JSON.stringify(t.staple_list), t.dish_list = JSON.stringify(t.dish_list), 
                            s.setData({
                                orderData: t
                            });
                        };
                        if (s.data.fromInThis) return s.data.paySuccess || wx.showModal({
                            title: "温馨提示",
                            content: e.msg,
                            success: function() {
                                t();
                            }
                        }), Promise.reject(e);
                        t();
                    }
                    if (s.setData({
                        fromInThis: !0
                    }), s.data.payAction || s.setData({
                        orderTime: {
                            day: 0 == s.data.orderData.date_type ? "今日" : "明日",
                            time: e.data.send_time.send_time,
                            text: e.data.send_time.title
                        }
                    }), s.setData({
                        preCheckData: e.data
                    }), !e.data.coupon.coupon_usable) {
                        r.setData("orderCoupon", {});
                    }
                    return e.data.kitchen.is_distr || 0 != s.data.eatingType || s.setData({
                        orderAddress: {},
                        orderTime: {}
                    }), console.log("订单检查:", e.data), i.total_fee = e.data.total_fee, i.send_time = e.data.send_time.send_time, 
                    r.setData("preCheckArgs", i), Promise.resolve(e);
                }
                return e.data.dialog && e.data.dialog.bottom_toast && !s.data.paySuccess ? wx.showModal({
                    title: "温馨提示",
                    content: e.data.dialog.top_toast,
                    success: function() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }
                }) : wx.showToast({
                    image: "/images/alert.png",
                    title: e.msg || "订单校验失败",
                    success: function() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }
                }), "function" == typeof a && a(), Promise.reject(e);
            });
        }
    },
    pay: function() {
        var t = this;
        this.data.payAction || (this.setData({
            payAction: !0
        }), this.checkUtoken() && this.preCheck().then(function() {
            var a = t.data, s = a.preCheckData, o = {
                dish_list: a.orderData.dish_list,
                staple_list: a.orderData.staple_list,
                kitchen_id: a.orderData.kitchen_id,
                date_type: a.orderData.date_type,
                send_time: a.orderTime.time || "",
                send_type: a.eatingType,
                address_id: a.orderAddress.addressID || "",
                coupon_id: a.orderCoupon.couponID || "",
                ticket_id: a.orderTicket.ticketID || "",
                is_use_balance: +a.isUseExtra,
                box_fee: s.box_fee,
                service_fee: s.service_fee,
                distr_fee: s.distr_fee,
                coupon_fee: s.coupon.coupon_fee,
                ticket_fee: s.ticket.ticket_fee,
                total_fee: s.total_fee,
                balance_fee: s.balance_fee,
                tp_fee: s.to_pay_fee,
                linkman: a.orderAddress.linkman,
                phone: a.orderAddress.phone,
                message: a.orderMessage,
                from: 3,
                policy_ids: s.policy_ids
            };
            if (console.group(Date() + "  支付数据："), console.log(o), console.groupEnd("--end"), 
            t.setData({
                payAction: !1
            }), 0 != o.send_type || o.address_id) if (0 != o.send_type || t.data.preCheckData.kitchen.is_distr) if (o.send_time) {
                0 == o.send_type && o.address_id && (o.send_type = 1);
                var i = "";
                t.setData({
                    payAction: !0
                });
                e.setOrder(o).then(function(e) {
                    if (0 == e.code) {
                        console.log("下单结果: ", e.data);
                        var a = "shopCart" + o.kitchen_id, s = r.getData(a);
                        if (s[0 == o.date_type ? "today" : "tomorrow"] = {}, r.setData(a, s), i = e.data.order_no, 
                        0 != o.tp_fee) {
                            var d = {
                                order_no: i,
                                order_price: o.tp_fee,
                                pay_type: 1
                            };
                            return Promise.resolve(d);
                        }
                        t.clearOrderMemory(), wx.showToast({
                            image: "/images/alert.png",
                            title: "下单成功",
                            success: function() {
                                wx.redirectTo({
                                    url: "/pages/user-order/user-order?orderid=" + i
                                });
                            }
                        });
                    } else t.data.paySuccess || wx.showModal({
                        title: "温馨提示",
                        content: e.msg,
                        success: function(e) {
                            t.preCheck();
                        }
                    });
                    return Promise.reject();
                }).then(function(a) {
                    e.pay(a).then(function(e) {
                        if (0 == e.code) {
                            console.log("获取支付参数：", e);
                            var a = e.data;
                            wx.requestPayment({
                                timeStamp: a.timestamp,
                                nonceStr: a.nonce_str,
                                package: "prepay_id=" + a.prepay_id,
                                signType: "MD5",
                                paySign: a.sign,
                                success: function() {
                                    t.setData({
                                        paySuccess: !0
                                    }), t.clearOrderMemory(), wx.showToast({
                                        image: "/images/alert.png",
                                        title: "支付成功",
                                        complete: function() {
                                            wx.redirectTo({
                                                url: "/pages/user-order/user-order?orderid=" + i + "&setOrder=true",
                                                success: function() {
                                                    t.setData({
                                                        payAction: !1
                                                    });
                                                }
                                            });
                                        }
                                    });
                                },
                                fail: function(e) {
                                    wx.redirectTo({
                                        url: "/pages/user-order/user-order?orderid=" + i,
                                        success: function() {
                                            t.setData({
                                                payAction: !1
                                            });
                                        }
                                    });
                                }
                            });
                        } else wx.showToast({
                            image: "/images/alert.png",
                            title: "支付失败",
                            success: function() {
                                wx.redirectTo({
                                    url: "/pages/user-order/user-order?orderid=" + i
                                });
                            }
                        });
                    }, function() {
                        t.setData({
                            payAction: !1
                        });
                    });
                }, function() {
                    t.setData({
                        payAction: !1
                    });
                });
            } else wx.showToast({
                image: "/images/alert.png",
                title: "请选择就餐时间"
            }); else wx.showToast({
                image: "/images/alert.png",
                title: "请选择送餐地址"
            }); else wx.showToast({
                image: "/images/alert.png",
                title: "请选择送餐地址"
            });
        }, function() {
            t.setData({
                payAction: !1
            });
        }));
    },
    clearOrderMemory: function() {
        r.removeData("orderAddress"), r.removeData("orderMessage"), r.removeData("orderMessageData"), 
        r.removeData("orderCoupon"), r.removeData("orderTicket");
    },
    checkUtoken: function() {
        return !!r.getData("userInfo").utoken || (wx.showModal({
            title: "提示",
            content: "身份认证失败，请重新登录",
            success: function() {
                wx.navigateTo({
                    url: "/pages/login/login"
                });
            }
        }), !1);
    }
});