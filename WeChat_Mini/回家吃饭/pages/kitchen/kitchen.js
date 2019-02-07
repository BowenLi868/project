var t = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
}, a = require("../../controllers/kitchenController.js"), e = require("../../controllers/orderController.js"), i = require("../../controllers/locationController.js"), o = require("../../tools/tools.js"), n = require("../../memory/memory.js");

Page({
    data: {
        isFirstLoad: !0,
        isTicketAvailable: !0,
        ticketsList: [],
        currentMain: "today",
        isShowTicketDetail: !1,
        kitchenID: "",
        kitchenInfo: {},
        kitchenTags: [],
        todayList: [],
        tomorrowList: [],
        commentList: [],
        todayScroll: "",
        todayScrollActive: "0",
        tomorrowScroll: "",
        tomorrowScrollActive: "0",
        startBookPrice: 0,
        shopCartInfo: {},
        collectData: {},
        commentNum: "",
        commentPage: 1,
        commentTotalPage: 1,
        contentMoveAble: !1,
        isIPhoneX: !1
    },
    onLoad: function(t) {
        var a = this;
        if (t.q) {
            var e = decodeURIComponent(t.q);
            t.kitchenid = o.getQueryString("kitchenid", e) || t.kitchenid, console.log("--二维码获取厨房id--", e);
        }
        wx.showShareMenu({
            withShareTicket: !0
        }), wx.getSystemInfo({
            success: function(t) {
                var e = (t.model || "").indexOf("iPhone X") > -1;
                console.log("系统信息：", t), a.setData({
                    isIPhoneX: !!e
                });
            }
        }), this.setData({
            kitchenID: t.kitchenid,
            shopCartInfo: n.getData("shopCart" + t.kitchenid) || {},
            cartData: {}
        }), this.initPage();
    },
    onShow: function() {
        this.data.isFirstLoad ? this.setData({
            isFirstLoad: !1
        }) : (this.setData({
            isShowCartList: !1,
            shopCartInfo: n.getData("shopCart" + this.data.kitchenID) || {},
            cartData: {}
        }), this.initData());
    },
    onPageScroll: function(t) {
        var a = this;
        wx.createSelectorQuery().select("#kitchen-info-container").boundingClientRect(function(t) {
            var e = !1;
            t.top < 20 && (e = !0), a.setData({
                contentMoveAble: e
            });
        }).exec();
    },
    onShareAppMessage: function() {
        return {
            title: this.data.kitchenInfo.kitchen_name,
            path: "/pages/kitchen/kitchen?kitchenid=" + this.data.kitchenInfo.kitchen_id,
            imageUrl: ""
        };
    },
    scrollViewEvent: function(t) {
        var a = t.detail.scrollTop, e = this.data.currentMain, i = this.data[e + "HeightList"];
        if (i) {
            var o = Object.keys(i);
            o.sort(function(t, a) {
                return t = +t.replace(e, ""), a = +a.replace(e, ""), t - a;
            });
            for (var n = 0; n < o.length; n++) if ((a -= i[o[n]]) < -10) {
                var s = {};
                s[e + "ScrollActive"] = n, console.log("菜品滚动事件触发", n), this.data.isClickDishUnit || this.setData(s);
                break;
            }
        }
    },
    renderDishHeightList: function(t) {
        var a = this.data[t + "List"].dish_list, e = wx.createSelectorQuery(), i = {};
        a.forEach(function(a, o) {
            e.select("#" + t + o).fields({
                size: !0,
                scrollOffset: !0,
                properties: [ "scrollY" ]
            }, function(a) {
                a && (i[t + o] = a.height);
            }).exec();
        });
        var o = {};
        o[t + "HeightList"] = i, this.setData(o);
    },
    switchTitle: function(t) {
        this.setData({
            currentMain: t.currentTarget.dataset.type
        }), this.initData();
    },
    switchTicketDetail: function(t) {
        this.setData({
            isShowTicketDetail: !this.data.isShowTicketDetail
        });
    },
    viewTomorrow: function(t) {
        "today" == this.data.currentMain && this.setData({
            currentMain: "tomorrow"
        });
    },
    initPage: function() {
        var t = this;
        n.getData("locationInfo") ? this.initData() : i.getLocation().then(function(a) {
            200 == a.code && n.setData("locationInfo", {
                locationText: a.data.locationText,
                location: a.data.location
            }), t.initData();
        }, function() {
            t.initData();
        });
    },
    initData: function(t) {
        var e = this, i = this.data.kitchenID, o = n.getData("locationInfo") || {};
        o = o.location;
        this.data.contentMoveAble;
        var s = a.getKitchenInfo({
            kitchen_id: i,
            coordinate: o
        }).then(function(t) {
            if (console.log("厨房信息：", t.data), 0 == t.code) {
                var a = {
                    isCollect: 1 == t.data.is_collected,
                    collectNum: t.data.collect_cnt
                };
                e.setData({
                    kitchenInfo: t.data,
                    collectData: a
                });
            }
        }), r = a.getKitchenAuthList({
            kitchen_id: i
        }).then(function(t) {
            console.log("认证信息：", t.data), 0 == t.code && e.setData({
                kitchenTags: t.data
            });
        }), c = a.getKitchenDishList({
            kitchen_id: i,
            date_type: 0
        }).then(function(t) {
            console.log("今日菜品列表：", t.data), 0 == t.code && e.setData({
                startBookPrice: t.data.dispatch_threshold,
                todayList: t.data
            }, function() {
                "today" == e.data.currentMain && e.renderDishHeightList("today");
            }), e.renderShopCart("today");
        }), d = a.getKitchenDishList({
            kitchen_id: i,
            date_type: 1
        }).then(function(t) {
            console.log("明日菜品列表：", t.data), 0 == t.code && e.setData({
                startBookPrice: t.data.dispatch_threshold,
                tomorrowList: t.data
            }, function() {
                "tomorrow" == e.data.currentMain && e.renderDishHeightList("tomorrow");
            }), e.renderShopCart("tomorrow");
        }), h = a.getKitchenCommentList({
            kitchen_id: i
        }).then(function(t) {
            console.log("评论列表：", t.data.list), 0 == t.code && e.setData({
                commentPage: 2,
                commentTotalPage: t.data.totalPage,
                commentList: t.data.list,
                commentNum: t.data.total > 99 ? "99+" : t.data.total
            });
        }), l = {
            kitchen_id: this.data.kitchenID
        }, u = a.getTicketsList(l).then(function(t) {
            0 == t.code && e.setData({
                ticketsList: t.data.list || []
            }), console.log("厨房饭票列表", t);
        });
        Promise.all([ s, r, c, d, h, u ]).then(function() {
            e.setData({
                isClickDishUnit: !0
            }), setTimeout(function() {
                e.setData({
                    isClickDishUnit: !1
                });
            }, 1e3), setTimeout(function() {
                e.setData({
                    loaded: !0
                });
            }, 1e3);
        });
    },
    renderShopCart: function(t) {
        this.refreshShopCart(t);
        var a = t || this.data.currentMain, e = this.data.shopCartInfo[a] || {}, i = {
            mainFoodName: "米饭",
            mainFoodPrice: 0,
            mainFoodNum: (e.cartData || {}).mainFoodNum || 0,
            shopNumber: 0,
            insure: this.data.kitchenInfo.insure ? this.data.kitchenInfo.insure_msg : "",
            price: 0,
            startBookPrice: this.data.startBookPrice,
            notice: this.data[a + "List"].cart_notice,
            boxFee: 0,
            btnText: "",
            discount: 0
        }, o = Object.keys(e), s = o.indexOf("cartData");
        o.splice(s, 1), o.sort(function(t, a) {
            return t = e[t], a = e[a], t = t.price - t.special_price, a = a.price - a.special_price, 
            -t + a;
        });
        var r = 0;
        o.length && (e[o[0]].max_discount_dish_preorder, r = e[o[0]].max_discount_dish_preorder), 
        o.forEach(function(t) {
            var a = e[t];
            a.totalPrice = a.orderNum * a.price;
            var o = a.special_dish ? a.price - a.special_price : 0;
            if (o && r) {
                var n = r;
                r > a.orderNum ? (n = a.orderNum, r -= a.orderNum) : r = 0, a.totalDiscount = o * n, 
                a.discountText = a.orderNum > 1 ? "含" + (a.orderNum - 1) + "份原价美食" : "", a.totalPrice = +(a.totalPrice - o * n).toFixed(2), 
                i.discount += +a.totalDiscount;
            }
            i.mainFoodName = a.staple_name, i.mainFoodPrice = a.staple_price, i.shopNumber += a.orderNum, 
            i.boxFee += a.orderNum * a.box_fee, i.price += +a.totalPrice;
        }), i.shopNumber += i.mainFoodNum, i.price += i.mainFoodNum * i.mainFoodPrice, i.price += i.boxFee, 
        i.price = +i.price.toFixed(2), i.discount && (i.discount = +i.discount.toFixed(2)), 
        i.boxFee && (i.boxFee = +i.boxFee.toFixed(2));
        var c = +(i.startBookPrice - i.price).toFixed(2);
        i.btnText = i.startBookPrice <= i.price ? "确认菜品" : "差" + c + "元起订", 1 == Object.keys(e).length && (i.mainFoodNum = 0, 
        i.shopNumber = 0, this.setData({
            isShowCartList: !1
        })), e.cartData = i, this.data.shopCartInfo[a] = e, this.setData({
            shopCartInfo: this.data.shopCartInfo
        });
        var d = this.data[a + "List"].dish_list || [];
        d.forEach(function(t, a) {
            t.list.forEach(function(t, i) {
                e[t.dish_id] ? d[a].list[i].orderNum = e[t.dish_id].orderNum : d[a].list[i].orderNum = 0;
            });
        });
        var h = {};
        h[a + "List"] = this.data[a + "List"], this.setData(h), console.log("购物车信息: ", e), 
        n.setData("shopCart" + this.data.kitchenID, this.data.shopCartInfo);
    },
    refreshShopCart: function(a) {
        var e = a || this.data.currentMain, i = this.data.shopCartInfo[e] || {}, n = i.cartData || {}, s = n.mainFoodNum || 0, r = this.data[e + "List"];
        r.is_open && ("today" != e || r.tod_in_business) ? "tomorrow" != e || r.tmr_in_business || (i = {}) : i = {};
        var c = [];
        (r.dish_list || []).forEach(function(t) {
            c = c.concat(t.list);
        }), Object.keys(i).forEach(function(t) {
            if ("cartData" !== t) {
                var a = o.getItem("dish_id", i[t].dish_id, c), e = i[t].orderNum;
                if (console.log("shopCartInfo[key].orderNum", e), !a || !a.leftStock) return a.staple_num && (s -= e * a.staple_num), 
                void delete i[t];
                i[t] = a, i[t].orderNum = e > a.leftStock ? a.leftStock : e, e > a.leftStock && a.staple_num && (s -= (e - a.leftStock) * a.staple_num), 
                a.stock_notice && (a.staple_num && (s -= e * a.staple_num), delete i[t]);
            }
        }), r.dish_list.forEach(function(t, a) {
            t.list.forEach(function(t, e) {
                var o = t.dish_id;
                i[o] ? (r.dish_list[a].list[e].stock = t.leftStock - i[o].orderNum, r.dish_list[a].list[e].orderNum = i[o].orderNum) : r.dish_list[a].list[e].stock = t.leftStock;
            });
        });
        var d = {};
        d[e + "List"] = r, n.mainFoodNum = s > 0 ? s : 0, i.cartData = n, this.data.shopCartInfo[e] = i, 
        this.setData(t({}, d, {
            shopCartInfo: this.data.shopCartInfo
        }));
    },
    orderNumberCallback: function(t) {
        var a = t.detail, e = this.data.currentMain, i = a, o = this.data.shopCartInfo[e] || {}, n = o[i.dish_id], s = i.orderNum - (n ? n.orderNum : 0);
        if (i.staple_num) {
            var r = i.staple_num * s, c = this.data.shopCartInfo[e].cartData || {};
            c.mainFoodNum = c.mainFoodNum || 0, c.mainFoodNum += r, c.mainFoodNum = c.mainFoodNum > 0 ? c.mainFoodNum : 0, 
            this.data.shopCartInfo[e].cartData = c;
        }
        0 == i.orderNum && n ? delete o[i.dish_id] : o[i.dish_id] = i, console.log("order.orderNum", i.orderNum), 
        this.data.shopCartInfo[e] = o, this.setData({
            shopCartInfo: this.data.shopCartInfo
        }), this.renderShopCart();
    },
    riceCallback: function(t) {
        var a = t.detail.orderNum, e = this.data.shopCartInfo;
        e[this.data.currentMain].cartData.mainFoodNum = a, this.setData({
            shopCartInfo: e
        }), this.renderShopCart();
    },
    locationToDish: function(t) {
        var a = this, e = this.data.contentMoveAble;
        this.setData({
            contentMoveAble: !0,
            isClickDishUnit: !0
        }), setTimeout(function() {
            a.setData({
                isClickDishUnit: !1
            });
        }, 1e3);
        var i = this.data.currentMain + t.currentTarget.dataset.item.index, o = {};
        o[this.data.currentMain + "Scroll"] = i, o[this.data.currentMain + "ScrollActive"] = t.currentTarget.dataset.item.index, 
        this.setData(o, function() {
            a.setData({
                contentMoveAble: e
            });
        });
    },
    shopClearCallBack: function() {
        var t = this.data.shopCartInfo;
        t[this.data.currentMain] = {}, this.setData({
            shopCartInfo: t
        }), this.renderShopCart();
    },
    switchCollect: function(t) {
        var e = this;
        if (this.checkUtoken()) {
            var i = t.detail, o = {
                kitchen_id: this.data.kitchenID,
                type: i.isCollect ? "remove" : "add"
            };
            a.switchCollect(o).then(function(t) {
                0 == t.code && e.setData({
                    collectData: {
                        isCollect: !i.isCollect,
                        collectNum: t.data.collect_cnt || (i.isCollect ? --i.collectNum : ++i.collectNum)
                    }
                });
            });
        }
    },
    choseTicket: function(t) {
        var e = this;
        if (this.checkUtoken()) {
            var i = t.detail;
            if (!i.has && !i.over && i.usable) {
                var o = {
                    kitchen_id: this.data.kitchenID,
                    ticket_id: i.ticketID
                };
                a.getTicketForSelf(o).then(function(t) {
                    if (0 == t.code) {
                        var a = e.data.ticketsList;
                        a.forEach(function(t, e) {
                            t.ticketID == i.ticketID && (a[e].has = !0, a[e].type = "has");
                        }), e.setData({
                            ticketsList: a
                        }), wx.showToast({
                            image: "/images/alert.png",
                            title: "领取成功"
                        });
                    } else wx.showToast({
                        image: "/images/alert.png",
                        title: "领取失败"
                    });
                });
            }
        }
    },
    loadCommentData: function() {
        var t = this;
        if (!(this.data.commentPage > this.data.commentTotalPage)) {
            var e = {
                page: this.data.commentPage,
                kitchen_id: this.data.kitchenID
            };
            a.getKitchenCommentList(e).then(function(a) {
                console.log("评论列表：", a.data.list), 0 == a.code && t.setData({
                    commentPage: t.data.commentPage + 1,
                    commentTotalPage: a.data.totalPage,
                    commentList: t.data.commentList.concat(a.data.list),
                    commentNum: a.data.total > 99 ? "99+" : a.data.total
                });
            });
        }
    },
    orderDish: function(t) {
        var a = this;
        if (this.checkUtoken()) {
            var i = this.data.shopCartInfo[this.data.currentMain], o = [];
            Object.keys(i).forEach(function(t) {
                if ("cartData" != t) {
                    var a = i[t];
                    a.special_dish ? (o.push({
                        price: a.special_price,
                        has_staple: 0 == a.staple_num ? 0 : 1,
                        id: a.dish_id,
                        count: 1,
                        special_dish: 1,
                        box_fee: a.box_fee
                    }), a.orderNum - 1 > 0 && o.push({
                        price: a.price,
                        has_staple: 0 == a.staple_num ? 0 : 1,
                        id: a.dish_id,
                        count: a.orderNum - 1,
                        special_dish: 0,
                        box_fee: a.box_fee
                    })) : o.push({
                        price: a.price,
                        has_staple: 0 == a.staple_num ? 0 : 1,
                        id: a.dish_id,
                        count: a.orderNum,
                        special_dish: 0,
                        box_fee: a.box_fee
                    });
                }
            });
            var s = [];
            0 != i.cartData.mainFoodNum && (s = [ {
                price: i.cartData.mainFoodPrice,
                id: 1,
                count: i.cartData.mainFoodNum
            } ]);
            var r = {
                kitchen_id: this.data.kitchenID,
                date_type: "today" == this.data.currentMain ? 0 : 1,
                dish_list: JSON.stringify(o),
                staple_list: JSON.stringify(s)
            };
            wx.showLoading({
                mask: !0,
                title: "订单处理中..."
            }), e.setOrderForSure(r).then(function(t) {
                if (wx.hideLoading(), 0 == t.code) {
                    var e = function() {
                        var t = [];
                        r.total = 0, Object.keys(i).forEach(function(a) {
                            var e = i[a];
                            if ("cartData" !== a) {
                                var o = e.price - e.staple_price * e.staple_num;
                                t.push({
                                    name: e.dish_name,
                                    numberText: o + "元X" + e.orderNum,
                                    totalText: o * e.orderNum + "元",
                                    total: o * e.orderNum
                                }), r.total += o * e.orderNum;
                            }
                        });
                        var e = i.cartData;
                        e.mainFoodNum && (t.push({
                            name: e.mainFoodName,
                            numberText: e.mainFoodPrice + "元X" + e.mainFoodNum,
                            totalText: e.mainFoodPrice * e.mainFoodNum + "元",
                            total: e.mainFoodPrice * e.mainFoodNum
                        }), r.total += e.mainFoodPrice * e.mainFoodNum), r.name = a.data.kitchenInfo.cook_name, 
                        r.phone = a.data.kitchenInfo.phone, r.address = a.data.kitchenInfo.address, r.insure = a.data.kitchenInfo.insure ? a.data.kitchenInfo.insure_msg : "", 
                        n.setData("orderInfo", t), n.setData("orderData", r), wx.navigateTo({
                            url: "/pages/order/order-detail/order-detail"
                        });
                    };
                    if (t.msg) return void wx.showModal({
                        title: "提示",
                        content: t.msg,
                        success: function(t) {
                            t.confirm ? e() : a.initData();
                        }
                    });
                    e();
                } else t.data.dialog && t.data.dialog.bottom_toast ? wx.showModal({
                    title: "温馨提示",
                    content: t.data.dialog.top_toast,
                    success: function(t) {
                        a.initData();
                    }
                }) : wx.showModal({
                    title: "温馨提示",
                    content: t.msg || "预定失败",
                    success: function() {
                        a.initData();
                    }
                }), t.data.refresh && a.initData();
            });
        }
    },
    checkUtoken: function() {
        return !!n.getData("userInfo").utoken || (wx.showModal({
            title: "提示",
            content: "身份认证失败，请重新登录",
            success: function() {
                wx.navigateTo({
                    url: "/pages/login/login"
                });
            }
        }), !1);
    },
    gotoMain: function(t) {
        wx.reLaunch({
            url: "/pages/index/index"
        });
    }
});